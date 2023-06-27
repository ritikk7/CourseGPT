const {
  countTokens,
  createCourseGptCompletion,
  createCourseGptEmbedding,
} = require('./openAI');
const crypto = require('crypto');
const { EmbeddingCache } = require("../models/embedding");

const BATCH_SIZE = process.env.BATCH_SIZE || 1000;
const CHUNK_SIZE = process.env.CHUNK_SIZE || 500;

function splitStringToChunks(rawData, delimiter = '.') {
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

  return chunks;
}

// File and directory processing functions
async function splitStringToSections(rawData) {
  const resultSections = [];
  const fileChunks = splitStringToChunks(rawData);
  for (const chunk of fileChunks) {
    const chatGptTitle = await generateTitleForSection(chunk);
    resultSections.push([chatGptTitle, chunk]);
  }
  return resultSections;
}

async function splitSectionsAndAddToCourseStrings(
  rawData,
  courseStrings = []
) {
  const sectionsList = await splitStringToSections(rawData);
  for (const section of sectionsList) {
    courseStrings.push(section.join('\n\n'));
  }

  console.log(
    `${sectionsList.length} sections split into ${courseStrings.length} strings.`
  );
  return courseStrings;
}

async function generateTitleForSection(sectionContent) {
  const keywords = await extractKeywords(sectionContent);

  let content = '';
  if (keywords.length > 0) {
    content = `Consider the course and the keywords [${keywords.join(
      ', '
    )}] from the section content provided. Reflect deeply and create a concise, relevant title that is optimized for an embedding-based search: \n"${sectionContent}"`;
  } else {
    content = `Considering the course and the section content provided, create a concise, relevant title that is optimized for an embedding-based search: \n"${sectionContent}"`;
  }

  const rawTitle = await createCourseGptCompletion(
    true,
    [{ role: 'user', content: content }],
    0.5
  );
  return rawTitle.trim().replace(/["']/g, '');
}

async function extractKeywords(sectionContent) {
  try {
    const content = `Review the following text deeply. What are the key topics, entities, keywords, or themes it covers? Please list them as comma-separated values:\n"${sectionContent}"`;

    const rawKeywords = await createCourseGptCompletion(
      true,
      [{ role: 'user', content: content }],
      0.5
    );

    if (rawKeywords.includes(',')) {
      return rawKeywords.split(',').map(keyword => keyword.trim());
    } else {
      return rawKeywords.split(' ').map(keyword => keyword.trim());
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function createEmbeddingForNewData(userId, course, content) {
  let courseStrings = await splitSectionsAndAddToCourseStrings(content);

  const embeddings = [];
  for (
    let batchStart = 0;
    batchStart < courseStrings.length;
    batchStart += BATCH_SIZE
  ) {
    const batchEnd = batchStart + BATCH_SIZE;
    const batch = courseStrings.slice(batchStart, batchEnd);
    const response = await createCourseGptEmbedding(batch);

    const batchEmbeddings = response.map(e => e.embedding);
    embeddings.push(...batchEmbeddings);
  }

  const submissionId = crypto.randomUUID();

  for (let i = 0; i < courseStrings.length; i++) {
    const embedding = {
      course: course._id,
      text: courseStrings[i],
      embedding: embeddings[i].map(Number),
      submissionId: submissionId,
      submittedBy: userId
    };

    await EmbeddingCache.create(embedding);
  }
}



module.exports = {
  createEmbeddingForNewData
};
