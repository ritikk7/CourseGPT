const axios = require('axios');

const gptApi = axios.create({
  baseURL: 'https://api.example.com',
  // Additional configuration specific to CHAT GPT API
});

module.exports = gptApi;
