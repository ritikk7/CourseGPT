require('dotenv').config();
const { encode, decode } = require('gpt-3-encoder');
const fs = require('fs');
const path = require('path');
const { openAI } = require('./ask');

const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL;
const BATCH_SIZE = process.env.BATCH_SIZE || 1000;
const MAX_TOKENS = process.env.MAX_TOKENS || 1600;

let courseStrings = [];

// String manipulation and utility functions
function countTokens(text) {
  return encode(text).length;
}

function removeSpacesAndLowercase(str) {
  return str.replace(/\s/g, '').toLowerCase();
}

function splitStringToChunks(text, maxTokens, delimiter = '.') {
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

function truncateString(string, maxTokens, printWarning = true) {
  const encodedString = encode(string);
  const truncatedString = decode(encodedString.slice(0, maxTokens));

  if (printWarning && encodedString.length > maxTokens) {
    console.log(
      `Warning: Truncated string from ${encodedString.length} tokens to ${maxTokens} tokens.`
    );
  }

  return truncatedString;
}

function halveByDelimiter(string, delimiter = '\n') {
  const chunks = string.split(delimiter);
  if (chunks.length === 1) {
    return [string, ''];
  } else if (chunks.length === 2) {
    return chunks;
  } else {
    const totalTokens = countTokens(string);
    const halfway = Math.floor(totalTokens / 2);
    let bestDiff = halfway;
    let i = 0;

    for (; i < chunks.length; i++) {
      const left = chunks.slice(0, i + 1).join(delimiter);
      const leftTokens = countTokens(left);
      const diff = Math.abs(halfway - leftTokens);

      if (diff >= bestDiff) {
        break;
      } else {
        bestDiff = diff;
      }
    }

    const left = chunks.slice(0, i).join(delimiter);
    const right = chunks.slice(i).join(delimiter);
    return [left, right];
  }
}

function splitSectionsToChunks(
  section,
  maxTokens = MAX_TOKENS,
  maxRecursion = 10
) {
  const sectionString = section.join('\n\n');
  const numTokensInString = countTokens(sectionString);

  if (numTokensInString <= maxTokens) {
    return [sectionString];
  } else if (maxRecursion === 0) {
    return [truncateString(sectionString, maxTokens)];
  } else {
    for (const delimiter of ['\n\n', '\n', '. ']) {
      const [left, right] = halveByDelimiter(section[1], delimiter);

      if (!(left === '' || right === '')) {
        const results = [];
        const leftSection = [section[0], left];
        const rightSection = [section[0], right];
        const leftStrings = splitSectionsToChunks(
          leftSection,
          maxTokens,
          maxRecursion - 1
        );
        const rightStrings = splitSectionsToChunks(
          rightSection,
          maxTokens,
          maxRecursion - 1
        );
        results.push(...leftStrings, ...rightStrings);
        return results;
      }
    }

    return [truncateString(sectionString, maxTokens)];
  }
}
// File and directory processing functions
async function splitFileToSections(filename, fileContent, delimiter) {
  const sectionTitlePrefix = filename + delimiter;
  const sections = fileContent.split(sectionTitlePrefix);
  const resultSections = [];

  if (sections.length === 1) {
    // raw file, without sections.
    const fileChunks = splitStringToChunks(fileContent, 300);
    for (const chunk of fileChunks) {
      const chatGptTitle = await generateTitleForSection(chunk);
      resultSections.push([chatGptTitle, chunk]);
    }
  } else {
    for (let i = 1; i < sections.length; i++) {
      const [sectionHeading, ...sectionTextArray] = sections[i].split('\n');
      const sectionText = sectionTextArray.join('\n');
      const sectionTitle = sectionTitlePrefix + sectionHeading;
      resultSections.push([sectionTitle, sectionText]);
    }
  }

  console.log(`Found ${resultSections.length} sections in ${filename}.txt`);
  return resultSections;
}

async function splitFilesToSections(dirPath, delimiter) {
  const allSections = [];
  const files = fs.readdirSync(dirPath);

  for (const filename of files) {
    const fileContent = fs.readFileSync(`${dirPath}/${filename}`, 'utf8');
    const sections = await splitFileToSections(
      filename.slice(0, -4),
      fileContent,
      delimiter
    );
    allSections.push(...sections);
  }

  return allSections;
}

async function splitSectionsAndAddToCourseStrings(
  dirPath,
  delimiter,
  maxTokens = MAX_TOKENS
) {
  let sectionsList = await splitFilesToSections(dirPath, delimiter);
  for (const section of sectionsList) {
    courseStrings.push(...splitSectionsToChunks(section, maxTokens));
  }

  console.log(
    `${sectionsList.length} sections split into ${courseStrings.length} strings.`
  );
}

async function generateTitleForSection(sectionContent) {
  try {
    const content = `Please provide a concise and descriptive title for the given text. Make sure not to use any quotation marks in your response:\n"${sectionContent}"`;
    const response = await openAI.createChatCompletion({
      model: process.env.OPENAI_GPT_MODEL,
      messages: [{ role: 'user', content: content }],
      temperature: 0.5,
    });

    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.error(err);
  }
}

async function addContentToCourseTrainingData(course, content) {
  const randomFilename = Math.floor(Math.random() * 10000);
  const betterCourseCode = removeSpacesAndLowercase(course.courseCode);
  const filePath = path.join(
    __dirname,
    '..',
    'gpt',
    'rawdata',
    `${betterCourseCode}`,
    `${randomFilename}-data.txt`
  );

  fs.writeFileSync(filePath, content);
}

async function createEmbeddings(course, delimiter = ' - ') {
  const betterCourseCode = removeSpacesAndLowercase(course.courseCode);
  const inputDir = path.join(
    __dirname,
    '..',
    'gpt',
    'rawdata',
    `${betterCourseCode}`
  );
  const outputFile = path.join(
    __dirname,
    '..',
    'gpt',
    'embeddings',
    `${betterCourseCode}withEmbeddings.csv`
  );
  await splitSectionsAndAddToCourseStrings(inputDir, delimiter);
  const embeddings = [];

  for (
    let batchStart = 0;
    batchStart < courseStrings.length;
    batchStart += BATCH_SIZE
  ) {
    const batchEnd = batchStart + BATCH_SIZE;
    const batch = courseStrings.slice(batchStart, batchEnd);
    console.log(`Batch ${batchStart} to ${batchEnd - 1}`);
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

  return { text: courseStrings, embedding: embeddings };
}

module.exports = {
  createEmbeddings,
  countTokens,
  addContentToCourseTrainingData,
};
