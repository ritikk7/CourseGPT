import React, { useEffect, useState } from 'react';
import * as GroupHelpers from './groupHelpers';
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

function NlpSentenceEncoderComponent() {
  const [listSentences, setListSentences] = useState([
    "Will it snow tomorrow?",
    "Recently a lot of hurricanes have hit the US",
    "Global warming is real",
    "An apple a day, keeps the doctors away",
    "Eating strawberries is healthy",
    "what is your age?",
    "How old are you?",
    "How are you?",
    "The dog bit Johnny",
    "Johnny bit the dog",
    "The cat ate the mouse",
    "The mouse ate the cat"
  ]);
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
