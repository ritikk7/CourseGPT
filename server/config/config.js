// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  openaiApiKey: process.env.OPENAI_API_KEY
};