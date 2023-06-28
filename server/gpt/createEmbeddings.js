const {
  countTokens,
  createCourseGptCompletion,
  createCourseGptEmbedding,
} = require('./openAI');
const crypto = require('crypto');
const { EmbeddingCache } = require('../util/EmbeddingCache');
const { Logger } = require('../util/Logger');
const stopwords = require('stopword');
const natural = require('natural');
const stemmer = natural.PorterStemmer;

const BATCH_SIZE = process.env.BATCH_SIZE || 1000;
const CHUNK_SIZE = process.env.CHUNK_SIZE || 500;
let currCourse = null;

function splitStringToChunks(rawData, delimiter = '.') {
  Logger.logEnter();
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

async function normalizeAndCleanText(rawText) {
  Logger.logEnter();
  // According to Chat GPTs suggestion we should optimize the text for embeddings by:
  // - Converting all the text to lowercase
  // - Removing all special characters
  // - Removing all numbers
  // - Removing extra white spaces
  // - Removing stop words
  // - Applying stemming to reduce each word to its root form
  let cleanedText = rawText.toLowerCase();
  cleanedText = cleanedText.replace(/[^a-zA-Z0-9\s]/g, '');
  cleanedText = cleanedText.replace(/\d+/g, '');
  cleanedText = cleanedText.replace(/\s\s+/g, ' ');
  const words = cleanedText.split(' ');
  const cleanedWords = stopwords.removeStopwords(words);
  const stemmedWords = cleanedWords.map(word => stemmer.stem(word));
  cleanedText = stemmedWords.join(' ');
  Logger.logExit();
  return cleanedText.trim();
}

async function generateSectionTitle(sectionContent) {
  Logger.logEnter();
  const cleanedSectionContent = await normalizeAndCleanText(sectionContent);
  const keywords = await extractKeywords(cleanedSectionContent);

  let content = '';
  if (keywords.length > 0) {
    content = `Given the keywords [${keywords.join(
      ', '
    )}] from the cleaned section content of course ${
      currCourse.courseCode
    }, think carefully and generate a short, relevant title optimized for embedding-based search.\n\nHere is the section content:\n"${cleanedSectionContent}"`;
  } else {
    content = `Given the cleaned section content of course ${currCourse.courseCode}, think carefully and create a short, relevant title optimized for embedding-based search.\n\nHere is the section content:\n"${cleanedSectionContent}"`;
  }
  let generatedTitle = await createCourseGptCompletion(
    [{ role: 'system', content: content }],
    0.5
  );
  generatedTitle = generatedTitle.replace(/['"]+/g, '');

  Logger.logExit();
  return generatedTitle;
}

async function extractKeywords(sectionContent) {
  Logger.logEnter();
  try {
    const content = `From the following course section content, identify and list the key topics, entities, keywords, or themes it covers. Please list them as comma-separated values:\n"${sectionContent}"`;

    const rawKeywords = await createCourseGptCompletion([
      { role: 'system', content: content },
    ]);

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
  const titles = await Promise.all(
    fileChunks.map(chunk => generateSectionTitle(chunk))
  );
  for (let i = 0; i < fileChunks.length; i++) {
    resultSections.push([titles[i], fileChunks[i]]);
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
  await Promise.all(
    courseStrings.map(async (_, i) => {
      const embedding = {
        course: course._id,
        text: courseStrings[i],
        embedding: embeddings[i].map(Number),
        submissionId: submissionId,
        submittedBy: submitterId,
      };
      await EmbeddingCache.create(embedding);
    })
  );
  Logger.logExit();
}

async function createEmbeddingForNewData(submitterId, course, content) {
  Logger.logEnter();
  currCourse = course;
  let trainingStrings = await processDataIntoTrainingStrings(content);
  const embeddings = await createCourseEmbeddings(trainingStrings);
  await storeEmbeddingsInMongoAndCache(
    submitterId,
    course,
    trainingStrings,
    embeddings
  );
  Logger.logExit();
  Logger.happyLog('Finished creating embedding for new data');
}

module.exports = {
  createEmbeddingForNewData,
};
