import React, { useEffect, useState } from 'react';
import * as GroupHelpers from './groupHelpers';
import * as SentimentAnalysisHelpers from './sentimentAnalysisHelpers';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchGroups } from '../../../redux/feedbackDataSlice';
import { extractKeywordPhrases } from './frequentHelpers';
// Data is the return type from the file databaseHelpers in the backend
// basically, returns 2D array where a feedback info is [ comment, rating, question, answer, course ]
// example return: [ FeedbackInfo1, FeedbackInfo2 ]
function MainAnalysisPage({ course, school, data, freqData }) {
  const dispatch = useDispatch();

  // FeedbackInfo maps the question to the rest of the feedback info
  const [feedbackInfo] = useState(() => {
    return data.reduce((map, feedbackInfo) => {
      const [comment, rating, question, answer, course] = feedbackInfo;
      map[question.content] = { comment, rating, question, answer, course };
      return map;
    }, {});
  });

  // listSentences is just the questions in an array
  const listSentences = Object.keys(feedbackInfo);

  // groups is another 2D array with each internal array being a set of related questions
  const [groups, setGroups] = useState([]);

  // feedbackSentiment is a map of an array of questions to a corresponding array of sentiment scores
  const [feedbackSentiment, setFeedbackSentiment] = useState({});

  // freqSentences is a map of an array of questions to a corresponding array of the 10 most frequent questions
  // eslint-disable-next-line no-unused-vars
  const [freqSentences, setFreqSentences] = useState({});

  // initializes the model
  useEffect(() => {
    const initializeTensorflow = async () => {
      await GroupHelpers.initializeTensorflow();
      onClickAnalyzeSentences();
    };

    initializeTensorflow();
  }, []);

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
    // console.log(feedbackInfo);
    const comments = [];
    for (let g of groupData) {
      let sentiments = [];
      let cur = [];

      for (let s of g) {
        let sentiment = SentimentAnalysisHelpers.getSentimentScore(
          feedbackInfo[s].comment,
          model,
          metadata
        );
        sentiments.push(parseFloat(sentiment, 10));
        cur.push(feedbackInfo[s].comment);
      }
      comments.push([g, cur]);
      sentenceAndSentiment[g] = sentiments;
    }

    console.log(extractKeywordPhrases(comments));

    // dispatch(fetchGroups(comments));
    setFeedbackSentiment(sentenceAndSentiment);
  };

  return (
    <Box>
      {groups &&
        groups.length > 0 &&
        groups.map((group, i) => (
          <VStack key={i} align="start" my={4}>
            <Heading as="h3" size="md">
              There were {group.length} questions similar to {group[0]}
            </Heading>
            {feedbackSentiment[group] && (
              <>
                <Text>Out of a score between 0 and 1, user sentiment...</Text>
                <Text>
                  was an average of{' '}
                  {SentimentAnalysisHelpers.calculateMean(
                    feedbackSentiment[group]
                  )}
                </Text>
                <Text>
                  had a median of{' '}
                  {SentimentAnalysisHelpers.calculateMedian(
                    feedbackSentiment[group]
                  )}
                </Text>
                <Text>
                  had a variance of{' '}
                  {SentimentAnalysisHelpers.calculateVariance(
                    feedbackSentiment[group]
                  )}
                  {Object.keys(freqData).length}
                </Text>
              </>
            )}
            {/* 
            {freqSentences[group] && (
              <>
                <Text>Top 10 most frequent phrases and their frequences</Text>
                {freqSentences[group].map((phrase, count) => {
                  <Text>
                    {phrase} appears {count} times{' '}
                  </Text>;
                })}
              </>
            )} */}
          </VStack>
        ))}
    </Box>
  );
}

export default MainAnalysisPage;

/*
Useful links that I referenced:
- Tensorflow JS docs (ex: https://www.tensorflow.org/js/guide/nodejs)
- https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder
- https://github.com/jinglescode/demos/tree/master/src/app/components/nlp-sentence-encoder
- https://github.com/jinglescode/textual-similarity-universal-sentence-encoder
- https://bensonruan.com/twitter-sentiment-analysis-with-tensorflowjs/
- https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Entities-Keywords-Extraction/Hotel%20Reviews%20Analysis%20-%20Entities%20and%20Keywords.ipynb
- https://cloud.ibm.com/docs/natural-language-understanding?topic=natural-language-understanding-additional-resources
*/
