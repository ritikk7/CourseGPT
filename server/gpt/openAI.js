const { Configuration, OpenAIApi } = require('openai');
const { encode } = require('gpt-3-encoder');
const similarity = require('compute-cosine-similarity');
const { Logger } = require('../util/Logger');

const openAI = new OpenAIApi(
  new Configuration({
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
  })
);

async function createCourseGptCompletion(
  messages,
  temperature = 0.5,
  retryMin = 0,
  retryMax = 5,
  gptModel = process.env.OPENAI_GPT_MODEL
) {
  Logger.logEnter();
  const NUM_ATTEMPTS = 3;
  for (let i = 0; i < NUM_ATTEMPTS; i++) {
    try {
      validateInput(messages, temperature);
      const response = await openAI.createChatCompletion({
        model: gptModel,
        messages: messages,
        temperature: temperature,
      });
      Logger.logExit();
      return response.data.choices[0].message.content;
    } catch (err) {
      await sleepWithRandomDelay(retryMin, retryMax); // wait to retry
      Logger.warn(
        `Failed createCourseGptCompletion on attempt #${i}/${NUM_ATTEMPTS}. Retrying! ` +
          err
      );
    }
  }
  Logger.error(
    `Failed createCourseGptCompletion after ${NUM_ATTEMPTS} failed attempts`
  );
  return 'Sorry, something went wrong.';
}

async function createCourseGptEmbedding(input) {
  Logger.logEnter();
  const response = await openAI.createEmbedding({
    model: process.env.EMBEDDING_MODEL,
    input: input,
  });
  Logger.logExit();
  return response.data.data;
}

// Helper Functions

async function generateChatTitle(userInput, gptResponse) {
  Logger.logEnter();
  const prompt = `${userInput}\n${gptResponse}\n3-5 Word Title: `;
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: prompt },
  ];

  let title = await createCourseGptCompletion(messages);
  title = title.split(' ').slice(0, 5).join(' ');
  title = title.replace(/["']/g, '');
  Logger.logExit();
  return title;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleepWithRandomDelay(minSeconds, maxSeconds) {
  const minDelay = minSeconds * 1000;
  const maxDelay = maxSeconds * 1000;

  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  await sleep(delay);
}

function countTokens(text) {
  return encode(text).length;
}
function getRelatedness(x, y) {
  return similarity(x, y);
}

function validateInput(messages, temperature) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Invalid 'messages' input: Expected a non-empty array.");
  }

  if (typeof temperature !== 'number' || temperature < 0 || temperature > 1) {
    throw new Error(
      "Invalid 'temperature' input: Expected a number between 0 and 1."
    );
  }
}

module.exports = {
  getRelatedness,
  createCourseGptEmbedding,
  createCourseGptCompletion,
  countTokens,
  generateChatTitle,
};
