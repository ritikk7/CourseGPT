const tf = require('@tensorflow/tfjs-node');
const axios = require('axios');

async function loadModel() {
  const url = `https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json`;
  const model = await tf.loadLayersModel(url);
  return model;
}

async function getMetaData() {
  try {
    const response = await axios.get(
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching metadata: ', error);
  }
}

// Adds padding for model
function addPadding(sentences, metadata) {
  return sentences.map(sen => {
    if (sen.length > metadata.max_len) {
      sen.splice(0, sen.length - metadata.max_len);
    }
    if (sen.length < metadata.max_len) {
      const pad = [];
      for (let i = 0; i < metadata.max_len - sen.length; ++i) {
        pad.push(0);
      }
      sen = pad.concat(sen);
    }
    return sen;
  });
}

function getSentimentScore(sentence, model, metadata) {
  const trimmed = sentence
    .trim()
    .toLowerCase()
    .replace(/(\.|,|!)/g, '')
    .split(' ');

  const sequence = trimmed.map(word => {
    const wordIndex = metadata.word_index[word];
    if (
      typeof wordIndex === 'undefined' ||
      wordIndex + metadata.index_from > 19999
    ) {
      return 2;
    }
    return wordIndex + metadata.index_from;
  });

  const paddedSequence = addPadding([sequence], metadata);
  const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
  const predictOut = model.predict(input);

  const score = predictOut.array();
  predictOut.dispose();

  return score;
}

function calculateVariance(sentiments) {
  const mean =
    sentiments.reduce((acc, val) => acc + val, 0) / sentiments.length;
  const squaredDifferences = sentiments.map(val => (val - mean) ** 2);
  const variance =
    squaredDifferences.reduce((acc, val) => acc + val, 0) / sentiments.length;
  return variance;
}

function calculateMedian(sentiments) {
  const sortedArray = sentiments.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedArray.length / 2);

  if (sortedArray.length % 2 === 0) {
    return (sortedArray[middleIndex - 1] + sortedArray[middleIndex]) / 2;
  } else {
    return sortedArray[middleIndex];
  }
}

function calculateMean(sentiments) {
  const sum = sentiments.reduce((acc, val) => acc + val, 0);
  const mean = sum / sentiments.length;
  return mean;
}

module.exports = {
  loadModel,
  getMetaData,
  getSentimentScore,
  calculateVariance,
  calculateMedian,
  calculateMean,
};
