const natural = require('natural');
const { fallback } = require('util');

// Polyfill for Node.js core modules
if (!fallback.util) fallback.util = require.resolve('util/');
if (!fallback.path) fallback.path = require.resolve('path-browserify');

// Function to lemmatize a word using WordNet
async function lemmatizeWord(word) {
  return new Promise((resolve, reject) => {
    natural.WordNet.lookup(word, results => {
      if (results.length > 0) {
        resolve(results[0].lemma);
      } else {
        resolve(word);
      }
    });
  });
}

// Function to extract keyword phrases
export async function extractKeywordPhrases(feedbackList) {
  // Create a tokenizer using natural
  const tokenizer = new natural.WordTokenizer();

  // Tokenize all feedback and merge into a single array of words
  const words = feedbackList
    .map(feedback => tokenizer.tokenize(feedback.toLowerCase()))
    .flat();

  // Lemmatize each word to group similar words (e.g., "dogs" and "dog")
  return Promise.all(words.map(word => lemmatizeWord(word)))
    .then(lemmatizedWords => {
      // Calculate frequency distribution to get the most common words/phrases
      const freqDist = new natural.FrequencyDistribution(lemmatizedWords);
      const mostCommonPhrases = freqDist.mostCommon(10);

      // Convert the most common phrases to an array of (phrase, times) pairs
      const keywordPhrases = mostCommonPhrases.map(([phrase, count]) => ({
        phrase,
        count,
      }));

      return keywordPhrases;
    })
    .catch(error => {
      console.error('Error during lemmatization:', error);
      return [];
    });
}
