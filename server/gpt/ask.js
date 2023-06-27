const {
  getRelatedness,
  countTokens,
  createCourseGptCompletion,
  createCourseGptEmbedding,
} = require('./openAI');
const School = require('../models/school');
const Chat = require('../models/chat');
const { EmbeddingCache } = require('../models/embedding');

async function queryMessage(query, course, tokenBudget) {
  course.school = await School.findById(course.school);
  const introduction = `I need to answer a question about the course ${course.courseCode}. If the necessary information is not provided, my response will be "I could not find an answer." Here is the question and the relevant course information: `;
  const question = `\nQuestion: ${query}\n\nCourse Information:`;
  let message = introduction;

  const strings = await stringsRankedByRelatedness(query, course);
  if (strings.length === 0) {
    return null;
  }

  for (const string of strings) {
    const nextArticle = `\n\n${string}`;
    if (countTokens(message + nextArticle + question) > tokenBudget) {
      break;
    }
    message += nextArticle;
  }

  return message + question;
}

async function ask(query, chatId, tokenBudget = 4096 - 500) {
  const chat = await Chat.findById(chatId)
    .populate('messages')
    .populate('course');
  if (!chat) throw new Error('Invalid chat ID');
  const course = chat.course;
  if (!course) throw new Error('Invalid course ID');

  const message = await queryMessage(query, course, tokenBudget);
  if (!message)
    return 'Sorry, we do not support this course yet. Please try again later.';

  const newMessage = {
    role: 'user',
    content: message,
  };

  const messages = [newMessage];

  return await createCourseGptCompletion(false, messages);
}

async function stringsRankedByRelatedness(query, course, topN = 100) {
  const queryEmbeddingResponse = await createCourseGptEmbedding(query);
  const queryEmbedding = queryEmbeddingResponse[0].embedding;

  let embeddings;
  try {
    console.log(`Reading embeddings for course ${course.courseCode}`);
    embeddings = await EmbeddingCache.getAllByCourse(course._id);
  } catch (error) {
    console.error(`Failed to read embeddings: ${error}`);
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
      console.error(error);
    }
  });

  relatednessData.sort((a, b) => b.embedding - a.embedding);

  return relatednessData.slice(0, topN).map(record => record.text);
}

module.exports = { ask };
