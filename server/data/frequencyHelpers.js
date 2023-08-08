const winkNLP = require('wink-nlp');
const its = require('wink-nlp/src/its.js');
const as = require('wink-nlp/src/as.js');
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);

function removeStopwords(words) {
  const stopwords = [
    'i',
    'me',
    'my',
    'myself',
    'we',
    'our',
    'ours',
    'ourselves',
    'you',
    'your',
    'yours',
    'yourself',
    'yourselves',
    'he',
    'him',
    'his',
    'himself',
    'she',
    'her',
    'hers',
    'herself',
    'it',
    'its',
    'itself',
    'they',
    'them',
    'their',
    'theirs',
    'themselves',
    'what',
    'which',
    'who',
    'whom',
    'this',
    'that',
    'these',
    'those',
    'am',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'having',
    'do',
    'does',
    'did',
    'doing',
    'a',
    'an',
    'the',
    'and',
    'but',
    'if',
    'or',
    'because',
    'as',
    'until',
    'while',
    'of',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'in',
    'out',
    'on',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    's',
    't',
    'can',
    'will',
    'just',
    'don',
    'should',
    'now',
  ];

  let res = [];
  for (let i = 0; i < words.length; i++) {
    if (!stopwords.includes(words[i])) {
      res.push(words[i]);
    }
  }
  return res;
}

function extractKeywordPhrases(feedbackList) {
  for (let group of feedbackList) {
    let allWords = nlp.readDoc(group[1].flat().join(' '));

    let words = allWords.tokens().out(its.normal, as.array);
    words = removeStopwords(words);

    // create a map to count the frequencies
    let freqMap = new Map();
    words.forEach(word => {
      let count = freqMap.get(word) || 0;
      freqMap.set(word, count + 1);
    });

    // sort the frequencies in descending order and take the top 100
    let mostFrequentWords = Array.from(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)
      .map(([text, value]) => ({ text, value })); // changed keys here

    return mostFrequentWords;
  }
}

module.exports = {
  extractKeywordPhrases,
};
