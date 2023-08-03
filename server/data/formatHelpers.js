const GroupHelpers = require('./groupingHelpers');
const SentimentAnalysisHelpers = require('./sentimentHelpers');
const tf = require('@tensorflow/tfjs-node');
const FrequencyHelpers = require('./frequencyHelpers');

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

async function getSentimentScore(sentence, model, metadata) {
  const trimmed = sentence
    .trim()
    .toLowerCase()
    .replace(/(\.|,|!)/g, '')
    .split(' ');

  const sequence = trimmed.map(word => {
    const wordIndex = metadata.word_index[word];
    if (typeof wordIndex === 'undefined') {
      return 2;
    }
    return wordIndex + metadata.index_from;
  });

  const paddedSequence = addPadding([sequence], metadata);
  const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
  const predictOut = model.predict(input);

  const score = (await predictOut.array())[0];
  predictOut.dispose();

  return score;
}

async function analyzeFeedback(data) {
  const feedbackInfo = data.reduce((map, feedbackInfo) => {
    const [comment, rating, question, answer, course] = feedbackInfo;
    map[question.content] = { comment, rating, question, answer, course };
    return map;
  }, {});

  const listSentences = Object.keys(feedbackInfo);

  await GroupHelpers.initializeTensorflow();
  const embeddings = await GroupHelpers.getEmbeddings(listSentences);
  const cosineSimilarityMatrix = GroupHelpers.cosineSimilarityMatrix(
    embeddings.arraySync()
  );
  const groups = GroupHelpers.formGroups(cosineSimilarityMatrix, listSentences);

  const model = await SentimentAnalysisHelpers.loadModel();
  const metadata = await SentimentAnalysisHelpers.getMetaData();
  const feedbackSentiment = {};
  const comments = [];
  await groupSentimentScore(
    groups,
    comments,
    feedbackSentiment,
    model,
    metadata,
    feedbackInfo
  );

  const wordCloudData = FrequencyHelpers.extractKeywordPhrases(comments);
  const barChartData = findBarChartData(groups, feedbackSentiment);
  const scatterChartData = findScatterChartData(groups, feedbackSentiment);
  const bubbleChartData = await findBubbleChartData(
    wordCloudData,
    model,
    metadata
  );

  return {
    groups,
    feedbackSentiment,
    barChartData,
    wordCloudData,
    scatterChartData,
    bubbleChartData,
  };
}

async function groupSentimentScore(
  groups,
  comments,
  feedbackSentiment,
  model,
  metadata,
  feedbackInfo
) {
  for (let g of groups) {
    let sentiments = [];
    let cur = [];

    for (let s of g) {
      try {
        let sentiment = await getSentimentScore(
          feedbackInfo[s].comment,
          model,
          metadata
        );
        sentiments.push(parseFloat(sentiment, 10));
        cur.push(feedbackInfo[s].comment);
      } catch (error) {
        console.error('Error occurred while getting sentiment score:', error);
      }
    }
    comments.push([g, cur]);
    feedbackSentiment[g] = sentiments;
  }
}

function findBarChartData(groups, feedbackSentiment) {
  if (!groups || !feedbackSentiment) {
    return;
  }
  const barChartData = [[], [], []];

  for (let g of groups) {
    barChartData[0].push(g[0]);
    barChartData[1].push(
      SentimentAnalysisHelpers.calculateMean(feedbackSentiment[g])
    );
    barChartData[2].push(
      SentimentAnalysisHelpers.calculateMedian(feedbackSentiment[g])
    );
  }
  return barChartData;
}

function findScatterChartData(groups, feedbackSentiment) {
  if (!groups || !feedbackSentiment) {
    return;
  }

  const scatterChartData = [];
  for (let g of groups) {
    scatterChartData.push({
      x: g.length,
      y: SentimentAnalysisHelpers.calculateMean(feedbackSentiment[g]),
    });
  }
  return scatterChartData;
}

async function findBubbleChartData(wordCloudData, model, metadata) {
  let transformedData = wordCloudData.map(async ({ text, value }) => {
    let sentimentScore = await getSentimentScore(text, model, metadata);
    return {
      id: text,
      value: value,
      sentiment: sentimentScore,
    };
  });

  return Promise.all(transformedData);
}

module.exports = { analyzeFeedback };
