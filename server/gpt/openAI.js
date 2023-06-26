const { Configuration, OpenAIApi } = require('openai');
const { encode } = require('gpt-3-encoder');
const similarity = require('compute-cosine-similarity');

const openAI = new OpenAIApi(
  new Configuration({
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
  })
);

async function createCourseGptCompletion(
  enableThrottling,
  messages,
  temperature = 0.5
) {
  if (enableThrottling) await sleep(3000);
  const NUM_ATTEMPTS = 2;
  for (let i = 0; i < NUM_ATTEMPTS; i++) {
    try {
      const response = await openAI.createChatCompletion({
        model: process.env.OPENAI_GPT_MODEL,
        messages: messages,
        temperature: temperature,
      });
      return response.data.choices[0].message.content;
    } catch (err) {
      await sleep(2000);
      console.log(err);
    }
  }
  return 'Sorry, something went wrong.';
}

async function createCourseGptEmbedding(input) {
  const response = await openAI.createEmbedding({
    model: process.env.EMBEDDING_MODEL,
    input: input,
  });
  return response.data.data;
}

// Helper Functions

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function countTokens(text) {
  return encode(text).length;
}

function removeSpacesAndLowercase(str) {
  return str.replace(/\s/g, '').toLowerCase();
}

function getRelatedness(x, y) {
  return similarity(x, y);
}

module.exports = {
  getRelatedness,
  createCourseGptEmbedding,
  createCourseGptCompletion,
  countTokens,
  removeSpacesAndLowercase,
};
