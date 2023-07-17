import React, { useEffect, useState } from 'react';
import * as GroupHelpers from './groupHelpers';
import * as SentimentAnalysisHelpers from './sentimentAnalysisHelpers';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

function NlpSentenceEncoderComponent({ course, school, data }) {
  const [feedbackInfo] = useState(() => {
    return data.reduce((map, feedbackInfo) => {
      const [comment, rating, question, answer, course] = feedbackInfo;
      map[question.content] = { comment, rating, question, answer, course };
      return map;
    }, {});
  });
  const listSentences = Object.keys(feedbackInfo);

  const [groups, setGroups] = useState([]);
  const [feedbackSentiment, setFeedbackSentiment] = useState({});

  useEffect(() => {
    const initializeTensorflow = async () => {
      await GroupHelpers.initializeTensorflow();
      onClickAnalyzeSentences();
    };

    initializeTensorflow();
  }, [listSentences]);

  const onClickAnalyzeSentences = async () => {
    await getSimilarity(listSentences);
  };

  const getEmbeddings = async listSentences => {
    const embeddings = await GroupHelpers.getEmbeddings(listSentences);
    return embeddings;
  };

  const getSimilarity = async listSentences => {
    const embeddings = await getEmbeddings(listSentences);
    const cosineSimilarityMatrix = GroupHelpers.cosineSimilarityMatrix(
      embeddings.arraySync()
    );
    const groupData = GroupHelpers.formGroups(
      cosineSimilarityMatrix,
      listSentences
    );
    setGroups(groupData);

    const model = await SentimentAnalysisHelpers.loadModel();
    const metadata = await SentimentAnalysisHelpers.getMetaData();
    const sentenceAndSentiment = {};
    for (let g of groupData) {
      let sentiments = [];
      for (let s of g) {
        // console.log(feedbackInfo[s][0]);
        let sentiment = SentimentAnalysisHelpers.getSentimentScore(
          s,
          model,
          metadata
        );
        // console.log(sentiment);
        sentiments.push(parseFloat(sentiment, 10))
        // console.log(sum);
      }
      sentenceAndSentiment[g] = sentiments;
    }
    setFeedbackSentiment(sentenceAndSentiment);
  };

  return (
    <Box>
      {/* {console.log(data)} */}
      {/* {console.log(feedbackInfo)} */}
      {/* {console.log(listSentences)} */}

      {groups &&
        groups.length > 0 &&
        groups.map((group, i) => (
          <VStack key={i} align="start" my={4}>
            <Heading as="h3" size="md">
              There were {group.length} questions similar to {group[0]}
              {/* Group {i + 1} */}
            </Heading>
            {feedbackSentiment[group] &&
            <>
            <Text>Out of a score between 0 and 1, user sentiment...</Text>
            <Text>was an average of {SentimentAnalysisHelpers.calculateMean(feedbackSentiment[group])}</Text>
            <Text>had a median of {SentimentAnalysisHelpers.calculateMedian(feedbackSentiment[group])}</Text>
            <Text>had a variance of {SentimentAnalysisHelpers.calculateVariance(feedbackSentiment[group])}</Text>
            </>
}

            {/* {group &&
              group.map((sentence, j) => <Text key={j}>{sentence}</Text>)} */}
          </VStack>
        ))}
    </Box>
  );
}

export default NlpSentenceEncoderComponent;

/*
Useful links that I referenced:
- Tensorflow JS docs (ex: https://www.tensorflow.org/js/guide/nodejs)
- https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder
- https://github.com/jinglescode/demos/tree/master/src/app/components/nlp-sentence-encoder
- https://github.com/jinglescode/textual-similarity-universal-sentence-encoder
*/
