const natural = require('natural');
const nlp = require('compromise');

// Function to lemmatize a word using WordNet
function lemmatizeWord(word) {
  let doc = nlp(word);
  return (
    doc.verbs().toInfinitive().out('text') ||
    doc.nouns().toSingular().out('text') ||
    word
  );
}

// Function to extract keyword phrases
async function extractKeywordPhrases(feedbackList) {
  console.log('group helper');

  console.log(feedbackList);
  // Create a tokenizer using natural
  const tokenizer = new natural.WordTokenizer();
  const toReturn = {};
  for (let groups of feedbackList) {
    // Tokenize all feedback and merge into a single array of words
    const words = groups[1]
      .map(feedback => tokenizer.tokenize(feedback.toLowerCase()))
      .flat();

    // // Lemmatize each word to group similar words (e.g., "dogs" and "dog")
    const lemmatizedWords = words.map(word => lemmatizeWord(word));

    // console.log("Lemmatized words: ", lemmatizedWords);
    // const freqDist = natural.FrequencyDistribution(lemmatizedWords);
    // console.log("Frequency distribution: ", freqDist);
    // const mostCommonPhrases = freqDist.mostCommon(10);
    // console.log("Most common phrases: ", mostCommonPhrases);
    // console.log("First group: ", groups[0]);
    // toReturn[groups[0]] = mostCommonPhrases;
    // console.log("toReturn object: ", toReturn);
    
  }
  console.log(toReturn);

  return toReturn;
}

module.exports = {
  extractKeywordPhrases,
};
