const {
  getRelatedness,
  countTokens,
  createCourseGptCompletion,
  createCourseGptEmbedding,
} = require('./openAI');
const Chat = require('../models/chat');
const { EmbeddingCache } = require('../util/EmbeddingCache');
const { Logger } = require('../util/Logger');

async function queryMessage(query, course, tokenBudget) {
  Logger.logEnter();

  const MAX_EMBEDDINGS_TO_INCLUDE = 100;
  const strings = await stringsRankedByRelatedness(query, course);

  if (strings.length === 0) {
    Logger.warn('stringsRankedByRelatedness array is empty');
    return null;
  }

  let message = `Think carefully and read all of the course ${course.courseCode} information provided below. I need a detailed answer a question about the course ${course.courseCode}. If the necessary information is not provided, respond with "I could not find an answer." Here is the question and the relevant course information: \n\n Question: ${query} \n\n`;
  let tokensInMessageSoFar = countTokens(message);

  for (let i = 0; i < MAX_EMBEDDINGS_TO_INCLUDE && i < strings.length; i++) {
    const nextEmbeddingString = `${course.courseCode} Information:\n${strings[i]}\n`;
    tokensInMessageSoFar += countTokens(nextEmbeddingString);

    if (tokensInMessageSoFar > tokenBudget) {
      break;
    }

    message += nextEmbeddingString;
  }

  Logger.logExit();
  return message;
}

async function ask(query, chatId, tokenBudget = process.env.TOKEN_LIMIT - 500) {
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
