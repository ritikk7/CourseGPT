const { Configuration, OpenAIApi } = require('openai');
const Chat = require('../models/chat');
const { stringsRankedByRelatedness } = require('./embeddingBasedSearch');
const { encode } = require('gpt-3-encoder');

const openAI = getOpenAIInstance();
function getOpenAIInstance() {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
  });

  return new OpenAIApi(configuration);
}

function countTokens(text) {
  return encode(text).length;
}

async function queryMessage(query, course, openai, tokenBudget) {
  const introduction = `Use the below information on the course ${course.courseCode} to answer the subsequent question. If the answer cannot be found in the provided information, write "I could not find an answer."`;
  const question = `\n\nQuestion: ${query}`;
  let message = introduction;

  const strings = await stringsRankedByRelatedness(
    process.env.EMBEDDING_MODEL,
    query,
    course,
    openai
  );

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
  if (course.courseCode != 'CPSC 455')
    return 'We do not support this course yet.';

  const openai = getOpenAIInstance();

  const message = await queryMessage(query, course, openai, tokenBudget);

  const recentChatMessages = await getMaximumMessageHistoryWithinTokenBudget(
    message,
    chat,
    tokenBudget
  );

  const newMessage = {
    role: 'user',
    content: message,
  };

  const messages = [...recentChatMessages, newMessage];

  const response = await openai.createChatCompletion({
    model: process.env.OPENAI_GPT_MODEL,
    messages: messages,
    temperature: 0.5,
  });

  return response.data.choices[0].message.content;
}

async function getMaximumMessageHistoryWithinTokenBudget(
  newMessage,
  chat,
  tokenBudget
) {
  return [];
  // TODO IDEA -- unsure of the value, as just simply including the most possible embeddings could be a better idea
  // TODO . Could get chat gpt to summarize the chat history, and try to include it in the prompt if there is enough token room
  //const messages = chat.messages.sort({ createdAt: -1 });
}

module.exports = { ask, openAI };
