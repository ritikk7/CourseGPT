require('dotenv').config();
const { encode } = require('gpt-3-encoder');
const fs = require('fs');
const path = require('path');
const { openAI } = require('./ask');

const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL;
const BATCH_SIZE = process.env.BATCH_SIZE || 1000;
const MAX_TOKENS = 500;

// String manipulation and utility functions
function countTokens(text) {
  return encode(text).length;
}

function removeSpacesAndLowercase(str) {
  return str.replace(/\s/g, '').toLowerCase();
}

function splitStringToChunks(text, maxTokens, delimiter = '.') {
  text = text.replace(/["']/g, '');
  const sentences = text.split(delimiter);
  let chunks = [];
  let chunk = '';

  for (const sentence of sentences) {
    if (countTokens(chunk + sentence + delimiter) > maxTokens) {
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
async function splitFileToSections(filepath) {
  const filename = path.basename(filepath).slice(0, -4);
  const fileContent = fs.readFileSync(filepath, 'utf8');
  const resultSections = [];
  const fileChunks = splitStringToChunks(fileContent, MAX_TOKENS);
  for (const chunk of fileChunks) {
    const chatGptTitle = await generateTitleForSection(chunk);
    resultSections.push([chatGptTitle, chunk]);
  }
  console.log(`Found ${resultSections.length} sections in ${filename}.txt`);
  return resultSections;
}

async function splitSectionsAndAddToCourseStrings(
  filePath,
  courseStrings = []
) {
  const sectionsList = await splitFileToSections(filePath);
  for (const section of sectionsList) {
    courseStrings.push(section.join('\n\n'));
  }

  console.log(
    `${sectionsList.length} sections split into ${courseStrings.length} strings.`
  );
  return courseStrings;
}

async function generateTitleForSection(sectionContent) {
  const NUM_ATTEMPTS = 2;

  for (let i = 0; i < NUM_ATTEMPTS; i++) {
    try {
      await sleep(3000); // client-side request throttling
      const keywords = await extractKeywords(sectionContent);
      await sleep(3000); // client-side request throttling
      let content = '';
      if (keywords.length > 0) {
        content = `Consider the course and the keywords [${keywords.join(', ')}] from the section content provided. Reflect deeply and create a concise, relevant title that is optimized for an embedding-based search: \n"${sectionContent}"`;
      } else {
        content = `Considering the course and the section content provided, create a concise, relevant title that is optimized for an embedding-based search: \n"${sectionContent}"`;
      }

      const response = await openAI.createChatCompletion({
        model: process.env.OPENAI_GPT_MODEL,
        messages: [{ role: 'user', content: content }],
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.9,
      });

      const rawTitle = response.data.choices[0].message.content;
      const sanitizedTitle = rawTitle.trim().replace(/["']/g, '');
      return sanitizedTitle;
    } catch (err) {
      console.error(err);
      await sleep(10000);  // client-side request throttling
    }
  }
  return 'Default Title';
}

async function extractKeywords(sectionContent) {
  try {
    const content = `Review the following text deeply. What are the key topics, entities, keywords, or themes it covers? Please list them as comma-separated values:\n"${sectionContent}"`;

    const response = await openAI.createChatCompletion({
      model: process.env.OPENAI_GPT_MODEL,
      messages: [{ role: 'user', content: content }],
      temperature: 0.5,
      max_tokens: 60,
      top_p: 0.9,
    });

    const rawKeywords = response.data.choices[0].message.content;

    let keywords = [];
    if (rawKeywords.includes(',')) {
      keywords = rawKeywords.split(',').map(keyword => keyword.trim());
    } else {
      keywords = rawKeywords.split(' ').map(keyword => keyword.trim());
    }

    return keywords;

  } catch (err) {
    console.error(err);
    return [];
  }
}




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function addContentToCourseTrainingData(course, content) {
  const randomFilename = Math.floor(Math.random() * 10000);
  const betterSchoolCode = removeSpacesAndLowercase(course.school.name);
  const betterCourseCode = removeSpacesAndLowercase(course.courseCode);
  const outputDir = path.join(
    __dirname,
    'rawdata',
    `${betterSchoolCode}`,
    `${betterCourseCode}`
  );

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, `${betterCourseCode}_${randomFilename}-data.txt`);
  console.log(filePath);

  fs.writeFileSync(filePath, content);
}

async function createEmbeddingForFile(inputFile, betterCourseCode, outputDir) {
  const filenameWithoutExtension = path.basename(
    inputFile,
    path.extname(inputFile)
  );
  const sanitizedFilename = filenameWithoutExtension
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();
  const outputFile = path.join(
    outputDir,
    `${betterCourseCode}_${sanitizedFilename}withEmbeddings.csv`
  );
  if (fs.existsSync(outputFile)) {
    console.log(
      `Output file "${outputFile}" already exists. Skipping embedding creation.`
    );
    return 0;
  }

  let courseStrings = await splitSectionsAndAddToCourseStrings(inputFile);

  const embeddings = [];
  for (
    let batchStart = 0;
    batchStart < courseStrings.length;
    batchStart += BATCH_SIZE
  ) {
    const batchEnd = batchStart + BATCH_SIZE;
    const batch = courseStrings.slice(batchStart, batchEnd);
    const response = await openAI.createEmbedding({
      model: EMBEDDING_MODEL,
      input: batch,
    });

    const batchEmbeddings = response.data.data.map(e => e.embedding);
    embeddings.push(...batchEmbeddings);
  }

  const csvData = courseStrings.map((text, index) => [
    `"${text}"`,
    `"${JSON.stringify(embeddings[index])}"`,
  ]);

  let csvContent = 'text,embedding\n';
  csvContent += csvData.map(row => row.join(',')).join('\n');

  fs.writeFileSync(outputFile, csvContent, 'utf8');
  console.log(`Created embeddings for ${outputFile}`);
  return 1;
}

async function createEmbeddingsForAllFiles(course) {
  const betterSchoolCode = removeSpacesAndLowercase(course.school.name);
  const betterCourseCode = removeSpacesAndLowercase(course.courseCode);
  const outputDir = path.join(
    __dirname,
    'embeddings',
    `${betterSchoolCode}`,
    `${betterCourseCode}`
  );
  const inputDir = path.join(
    __dirname,
    'rawdata',
    `${betterSchoolCode}`,
    `${betterCourseCode}`
  );

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const inputFiles = fs
    .readdirSync(inputDir)
    .map(file => path.join(inputDir, file));

  let numCreated = 0;
  for (const inputFile of inputFiles) {
    numCreated += await createEmbeddingForFile(
      inputFile,
      betterCourseCode,
      outputDir
    );
  }
  console.log(
    `Created embeddings for ${numCreated} out of the total ${inputFiles.length} data files`
  );
}

module.exports = {
  createEmbeddingsForAllFiles,
  addContentToCourseTrainingData,
};
