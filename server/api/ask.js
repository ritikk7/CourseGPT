// imports
const {stringsRankedByRelatedness} = require('./embeddingBasedSearch');
const {numTokens} = require('./generateEmbeddings');
const { Configuration, OpenAIApi } = require('openai');
if (process.env.OPENAI_API_KEY == undefined) {
    throw "Cannot find OPENAI_API_KEY in environment variable";
}
const configuration = new Configuration({
    organization: 'org-Ctm9a6WpVYabY1qbocCED6NW',
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// constants
const EMBEDDING_MODEL = "text-embedding-ada-002"; // OpenAI's best embeddings as of Apr 2023
const GPT_MODEL = "gpt-3.5-turbo"; // you can submit up to 2048 embedding inputs per request

// Return a message for GPT, with relevant source texts pulled from a dataframe.
async function queryMessage(query, model, tokenBudget) {
    const strings = await stringsRankedByRelatedness(EMBEDDING_MODEL, query, openai);
    const introduction = 'Use the below information on the University of British Columbia CPSC455 - Applied Industry Practices course to answer the subsequent question. If the answer cannot be found in the provided information, write "I could not find an answer."';
    const question = `\n\nQuestion: ${query}`;
    let message = introduction;
    for (const string of strings) {
      const nextArticle = `\n\nCPSC455 Course Information:\n"""\n${string}\n"""`;
      if (numTokens(message + nextArticle + question, model) > tokenBudget) {
        break;
      } else {
        message += nextArticle;
      }
    }
    return message + question;
}
  
async function ask(query, courseId, tokenBudget = 4096 - 500, printMessage = false) {
    let message;
    let systemContext;
    // checking if the message belongs to a CPSC 455 chat
    if (courseId == "6492222f349939b24dc08c90"){
      console.log("querying CPSC 455 model");
      systemContext = "the University of British Columbia CPSC455 - Applied Industry Practices course.";
      message = await queryMessage(query, GPT_MODEL, tokenBudget);
    } else {
      console.log("querying original chatGPT model");
      systemContext = "university courses.";
      message = query;
      // returning a default message for now, remove this line to have it ask the original chatGPT model directly.
      // This is a temporary solution during development to prevent extensive use of tokens which cost money
      return "Sorry, we don't support this course yet.";
    }
    if (printMessage) {
      console.log(message);
    }
    const messages = [
      { role: "system", content: `You answer questions about ${systemContext}` },
      { role: "user", content: message },
    ];

    const response = await openai.createChatCompletion({ model: GPT_MODEL, messages: messages, temperature: 0 });
    const responseMessage = response.data.choices[0].message.content;
    return responseMessage;
}


module.exports = { ask };  