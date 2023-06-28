const {
  getRelatedness,
  countTokens,
  createCourseGptCompletion,
  createCourseGptEmbedding,
} = require('./openAI');
const School = require('../models/school');
const Chat = require('../models/chat');
const { EmbeddingCache } = require('../util/EmbeddingCache');
const { Logger } = require('../util/Logger');

async function queryMessage(query, course, tokenBudget) {
  Logger.logEnter();
  const MAX_EMBEDDINGS_TO_INCLUDE = 10;
  course.school = await School.findById(course.school);

  const strings = await stringsRankedByRelatedness(query, course);
  if (strings.length === 0) {
    Logger.warn('stringsRankedByRelatedness array is empty');
    return null;
  }

  let message = `Think carefully and read all of the course ${course.courseCode} information provided below. I need to answer a question about the course ${course.courseCode} information provided below. If the necessary information is not provided, my response will be "I could not find an answer." Here is the question and the relevant course information: \n\n Question: ${query} \n\n`;

  let tempContextStrings = [];
  let tokensInMessageSoFar = countTokens(message);

  for (let i = 0; i < MAX_EMBEDDINGS_TO_INCLUDE && i < strings.length; i++) {
    const nextEmbeddingString = `${course.courseCode} Information:\n${strings[i]}\n`;
    tokensInMessageSoFar += countTokens(nextEmbeddingString);
    if (tokensInMessageSoFar > tokenBudget) {
      break;
    }
    tempContextStrings.push(nextEmbeddingString);
  }

  tempContextStrings.reverse();// I found providing the most relevant information (related embedding) at the bottom provided better results
  tempContextStrings.forEach(item => {
    message += item;
  });

  Logger.debug(message);

  Logger.logExit();
  return message;
}


async function ask(
  query,
  chatId,
  tokenBudget = process.env.TOKEN_LIMIT - 500
) {
  Logger.logEnter();
  const chat = await Chat.findById(chatId).populate('course');
  if (!chat) throw new Error('Invalid chat ID');
  const course = chat.course;
  if (!course) throw new Error('Invalid course ID');

  const message = await queryMessage(query, course, tokenBudget);
  if (!message) {
    Logger.warn('queryMessage is null');
    return 'Sorry, we do not support this course yet. Please try again later.';
  }

  Logger.logExit();
  return await createCourseGptCompletion([
    {
      role: 'user',
      content: message,
    },
  ]);
}

async function stringsRankedByRelatedness(query, course) {
  Logger.logEnter();
  const queryEmbeddingResponse = await createCourseGptEmbedding(query);
  const queryEmbedding = queryEmbeddingResponse[0].embedding;

  let embeddings;
  try {
    embeddings = await EmbeddingCache.getAllByCourse(course._id);
  } catch (error) {
    Logger.error(`Error in retrieving embeddings for ${course.courseCode}`);
    return [];
  }

  const relatednessData = embeddings.map(embeddingRecord => {
    try {
      const embedding = embeddingRecord.embedding;
      const relatedness = getRelatedness(queryEmbedding, embedding);
      return {
        text: embeddingRecord.text,
        embedding: relatedness,
      };
    } catch (error) {
      Logger.error('Error in calculating relatedness');
    }
  });

  relatednessData.sort((a, b) => b.embedding - a.embedding);

  Logger.logExit();
  return relatednessData.map(record => record.text);
}

module.exports = { ask };
