const {
  countTokens,
  createCourseGptCompletion,
  createCourseGptEmbedding,
} = require('./openAI');
const crypto = require('crypto');
const { Logger } = require('../util/Logger');
const { EmbeddingCache } = require('../util/EmbeddingCache');

const BATCH_SIZE = process.env.BATCH_SIZE || 1000;
const CHUNK_SIZE = process.env.CHUNK_SIZE || 500;

function splitStringToChunks(rawData, delimiter = '.') {
  Logger.logEnter();
  rawData = rawData.replace(/["']/g, '');
  const sentences = rawData.split(delimiter);
  let chunks = [];
  let chunk = '';

  for (const sentence of sentences) {
    if (countTokens(chunk + sentence + delimiter) > CHUNK_SIZE) {
      if (chunk) {
        chunks.push(chunk);
      }
      chunk = sentence + delimiter;
    } else {
      chunk += sentence + delimiter;
    }
  }

  if (chunk) {
    chunks.push(chunk);
  }

  Logger.logExit();
  return chunks;
}

async function getCompletionWithoutQuotes(
  enableThrottling,
  userPrompt,
  temperature
) {
  Logger.logEnter();
  const rawOutput = await createCourseGptCompletion(
    enableThrottling,
    [{ role: 'user', content: userPrompt }],
    temperature
  );
  Logger.logExit();
  return rawOutput.trim().replace(/["']/g, '');
}

async function generateSectionTitle(sectionContent) {
  Logger.logEnter();
  const keywords = await extractKeywords(sectionContent);

  let content = '';
  if (keywords.length > 0) {
    content = `Consider the course and the keywords [${keywords.join(
      ', '
    )}] from the section content provided. Reflect deeply and create a concise, relevant title that is optimized for an embedding-based search: \n"${sectionContent}"`;
  } else {
    content = `Considering the course and the section content provided, create a concise, relevant title that is optimized for an embedding-based search: \n"${sectionContent}"`;
  }

  Logger.logExit('generateSectionTitle');
  return getCompletionWithoutQuotes(true, content, 0.5);
}

async function extractKeywords(sectionContent) {
  Logger.logEnter();
  try {
    const content = `Review the following text deeply. What are the key topics, entities, keywords, or themes it covers? Please list them as comma-separated values:\n"${sectionContent}"`;

    const rawKeywords = await getCompletionWithoutQuotes(true, content, 0.5);

    if (rawKeywords.includes(',')) {
      return rawKeywords.split(',').map(keyword => keyword.trim());
    } else {
      return rawKeywords.split(' ').map(keyword => keyword.trim());
    }
  } catch (err) {
    Logger.error('Error extracting keywords: ' + err);
    return [];
  }
}

async function splitRawDataIntoSections(rawData) {
  Logger.logEnter();
  const resultSections = [];
  const fileChunks = splitStringToChunks(rawData);
  for (const chunk of fileChunks) {
    const sectionTitle = await generateSectionTitle(chunk);
    resultSections.push([sectionTitle, chunk]);
  }
  Logger.logExit();
  return resultSections;
}

async function processDataIntoTrainingStrings(rawData, courseStrings = []) {
  Logger.logEnter();
  const sectionsList = await splitRawDataIntoSections(rawData);
  for (const section of sectionsList) {
    courseStrings.push(section.join('\n\n'));
  }
  Logger.logExit();
  return courseStrings;
}

async function createCourseEmbeddings(trainingStrings) {
  Logger.logEnter();
  const embeddings = [];
  for (
    let batchStart = 0;
    batchStart < trainingStrings.length;
    batchStart += BATCH_SIZE
  ) {
    const batchEnd = batchStart + BATCH_SIZE;
    const batch = trainingStrings.slice(batchStart, batchEnd);
    const response = await createCourseGptEmbedding(batch);
    const batchEmbeddings = response.map(e => e.embedding);
    embeddings.push(...batchEmbeddings);
  }
  Logger.logExit();
  return embeddings;
}

async function storeEmbeddingsInMongoAndCache(
  submitterId,
  course,
  courseStrings,
  embeddings
) {
  Logger.logEnter();
  const submissionId = crypto.randomUUID();
  for (let i = 0; i < courseStrings.length; i++) {
    const embedding = {
      course: course._id,
      text: courseStrings[i],
      embedding: embeddings[i].map(Number),
      submissionId: submissionId,
      submittedBy: submitterId,
    };
    await EmbeddingCache.create(embedding);
  }
  Logger.logExit();
}

async function createEmbeddingForNewData(submitterId, course, content) {
  Logger.logEnter();
  let trainingStrings = await processDataIntoTrainingStrings(content);
  const embeddings = await createCourseEmbeddings(trainingStrings);
  await storeEmbeddingsInMongoAndCache(
    submitterId,
    course,
    trainingStrings,
    embeddings
  );
  Logger.logExit();
}

module.exports = {
  createEmbeddingForNewData,
};
