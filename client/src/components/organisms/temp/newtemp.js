import React, { useEffect, useState } from 'react';
import * as GroupHelpers from './groupHelpers';
import { Box, Heading, Text, VStack } from "@chakra-ui/react";


function NlpSentenceEncoderComponent({ course, school, data }) {
  const [feedbackInfo, ] = useState(() => {
    return data.reduce((map, feedbackInfo) => {
      const [comment, rating, question, answer, course] = feedbackInfo;
      map[question.content] = { comment, rating, question, answer, course };
      return map;
    }, {});
  });
  const listSentences = Object.keys(feedbackInfo);

  const [groups, setGroups] = useState([]);

  useEffect(() => {    
    const initializeTensorflow = async () => {
      await GroupHelpers.initializeTensorflow();
      onClickAnalyzeSentences()
    };
    
    initializeTensorflow();
  }, []);

  const onClickAnalyzeSentences = async () => {
    await getSimilarity(listSentences);
  };

  const getEmbeddings = async (listSentences) => {
    const embeddings = await GroupHelpers.getEmbeddings(listSentences);
    return embeddings;
  };

  const getSimilarity = async (listSentences) => {
    const embeddings = await getEmbeddings(listSentences);
    const cosineSimilarityMatrix = GroupHelpers.cosineSimilarityMatrix(embeddings.arraySync());
    const groupData = GroupHelpers.formGroups(cosineSimilarityMatrix);

    const toAdd = []
    for (let i in groupData) {
      let temp = []
      for (let j in groupData[i]) {
        const index = groupData[i][j];
        if (index >= 0 && index < listSentences.length) {
          temp.push(listSentences[index]);
        }
      }
      toAdd.push(temp)
    }
    
    
    setGroups(toAdd);
  };

  return (
    <Box>
      {/* {console.log(data)} */}
      {/* {console.log(feedbackInfo)} */}
      {console.log(listSentences)}

      {/* <Heading as="h1" size="xl">Sentence Similarity with TensorFlow.js Sentence Encoder</Heading> */}
      {groups && groups.length > 0 && groups.map((group, i) => (
        <VStack key={i} align="start" my={4}>
          <Heading as="h3" size="md">Group {i + 1}</Heading>
          {group && group.map((sentence, j) => (
            <Text key={j}>{sentence}</Text>
          ))}
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
