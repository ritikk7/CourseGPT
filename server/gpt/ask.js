const {
  getRelatedness,
  countTokens,
  createCourseGptCompletion,
  createCourseGptEmbedding,
} = require('./openAI');
const Chat = require('../models/chat');
const { EmbeddingCache } = require('../util/EmbeddingCache');
const { Logger } = require('../util/Logger');

async function buildQueryMessage(query, course, tokenBudget) {
  Logger.logEnter();

  const maxEmbeddingsToInclude = 5; // adjust this to lower value if responses end up being bad again
  const relatednessThreshold = 0.75;
  const strings = await getAscendingOrderRelatednessStrings(
    query,
    course,
    relatednessThreshold,
    maxEmbeddingsToInclude
  );

  if (strings.length === 0) {
    Logger.warn('getAscendingOrderRelatednessStrings array is empty');
    return null;
  }

  let message = buildMessageHelper(strings, query, tokenBudget);

  Logger.logExit();
  return message;
}

function buildMessageHelper(strings, query, tokenBudget) {
  Logger.logEnter();
  let includedInfoCount = 0;
  let includedInfo = [];
  let question = `Question: ${query}\n\n`;
  let tokensInMessageSoFar =
    countTokens(question) +
    countTokens(generatePreamble(strings, 0, query)) +
    countTokens(generatePostamble(strings, 0));

  for (let i = strings.length - 1; i > 0; i--) {
    const nextEmbeddingString = `Information ${strings.length - (strings.length - i)}:\n[${
      strings[i]
    }]\nPlease consider this information when answering the question.\n`;
    const nextTokenCount = countTokens(nextEmbeddingString);
    if (tokensInMessageSoFar + nextTokenCount > tokenBudget) {
      break;
    }
    includedInfoCount++;
    includedInfo.unshift(nextEmbeddingString);
    tokensInMessageSoFar += nextTokenCount;
  }

  const message =
    generatePreamble(strings, includedInfoCount, query) +
    includedInfo.join('') +
    generatePostamble(strings, includedInfoCount, question);

  Logger.logExit();
  return message;
}


function generatePreamble(strings, numInfo, query) {
  return `As an AI, you're given ${numInfo} pieces of information below related to the question "${query}". Each piece of information, enclosed in square brackets, is important for understanding the context and answering the question. If necessary information is not available, you will state that I could not find an answer. Read all of them before you answer. Here are the pieces of information provided:\n\n`;
}

function generatePostamble(strings, numInfo, query) {
  return `As an AI, you're given ${numInfo} pieces of information above related to the question below. Each piece of information, enclosed in square brackets, is important for understanding the context and answering the question. If necessary information is not available, you will state that I could not find an answer. The pieces of information are above. Read all of them again before you answer. The question is below.\n\n"${query}"`;
}

async function ask(query, chatId, tokenBudget = process.env.TOKEN_LIMIT - 200) {
  Logger.logEnter();
  const chat = await Chat.findById(chatId).populate('course');
  if (!chat) throw new Error('Invalid chat ID');
  const course = chat.course;
  if (!course) throw new Error('Invalid course ID');


  const message = await buildQueryMessage(query, course, tokenBudget);
  if (!message) {
    Logger.warn('buildQueryMessage is null');
    return 'Sorry, we could not answer your question based on the information available. Please try again later.';
  }
  Logger.logExit();
  return await createCourseGptCompletion(
    [
      {
        role: 'system',
        content: `You're now chatting with an AI influenced by the information you will provide me.`,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    0.5
  );
}

async function getAscendingOrderRelatednessStrings(
  query,
  course,
  relatednessThreshold = 0.7,
  maxEmbeddings = 5
) {
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

  let relatednessData = embeddings
    .map(embeddingRecord => {
      try {
        const embedding = embeddingRecord.embedding;
        const relatedness = getRelatedness(queryEmbedding, embedding);
        return {
          text: embeddingRecord.text,
          relatedness: relatedness,
          embedding: embedding,
        };
      } catch (error) {
        Logger.error('Error in calculating relatedness');
        return null;
      }
    })
    .filter(
      embeddingRecord =>
        embeddingRecord !== null &&
        embeddingRecord.relatedness >= relatednessThreshold
    )
    .sort((a, b) => a.relatedness - b.relatedness);

  relatednessData = relatednessData
    .slice(Math.max(relatednessData.length - maxEmbeddings - 1, 0))
    .map(record => record.text);
  Logger.logExit();
  return relatednessData;
}

module.exports = { ask };
