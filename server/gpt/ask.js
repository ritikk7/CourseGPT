const {
  getRelatedness,
  createCourseGptEmbedding,
  removeSpacesAndLowercase,
  countTokens,
  createCourseGptCompletion,
} = require('./openAI');
const School = require('../models/school');
const Chat = require('../models/chat');
const path = require('path');
const fs = require('fs');
const { DataFrame } = require('dataframe-js');

async function queryMessage(query, course, tokenBudget) {
  course.school = await School.findById(course.school);
  const introduction = `Use the below information on the course ${course.courseCode} to answer the subsequent question. If the answer cannot be found in the provided information, write "I could not find an answer."`;
  const question = `\n\nQuestion: ${query}`;
  let message = introduction;

  const strings = await stringsRankedByRelatedness(query, course);
  if (strings.length === 0) {
    return null;
  }

  for (const string of strings) {
    const nextArticle = `\n\nCourse Information:\n"""\n${string}\n"""`;
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

async function readEmbeddingsCSV(absolutePath) {
  return await DataFrame.fromCSV(absolutePath);
}

async function readEmbeddingsFromDirectory(schoolCode, courseCode) {
  const directoryPath = path.resolve(
    __dirname,
    'embeddings/',
    schoolCode,
    courseCode
  );
  const files = fs.readdirSync(directoryPath);
  const dataFrames = await Promise.all(
    files.map(file => readEmbeddingsCSV(`${directoryPath}/${file}`))
  );
  const firstDf = dataFrames[0];
  return dataFrames.reduce((df1, df2) => df1.union(df2), firstDf);
}

async function stringsRankedByRelatedness(query, course, topN = 100) {
  const betterSchoolCode = removeSpacesAndLowercase(course.school.name);
  const betterCourseCode = removeSpacesAndLowercase(course.courseCode);
  const queryEmbeddingResponse = await createCourseGptEmbedding(query);
  const queryEmbedding = queryEmbeddingResponse[0].embedding;
  let df;
  try {
    console.log(
      `Reading embeddings for ${betterSchoolCode}/${betterCourseCode}`
    );
    df = await readEmbeddingsFromDirectory(betterSchoolCode, betterCourseCode);
  } catch (error) {
    console.error(`Failed to read embeddings: ${error}`);
    return [];
  }

  let relatednessDataframe = df.map(row => {
    try {
      const embedding = JSON.parse(row.get('embedding'));
      const relatedness = getRelatedness(queryEmbedding, embedding);
      return row.set('embedding', relatedness);
    } catch (error) {
      console.error(error);
    }
  });

  let sortedRelatednessDataframe = relatednessDataframe
    .sortBy('embedding', true)
    .slice(0, topN);

  return sortedRelatednessDataframe.toArray('text');
}

module.exports = { ask };
