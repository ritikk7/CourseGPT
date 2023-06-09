const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: 'org-Ctm9a6WpVYabY1qbocCED6NW',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// example call. follow the listModels() function to see the remaining list of available functions.
// They are pretty much a one to one mapping with the OpenAI API listed here  https://platform.openai.com/docs/api-reference/
async function listModels() {
  const response = await openai.listModels();
  console.log(response);
}
