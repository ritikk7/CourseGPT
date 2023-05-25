import React from 'react';
import styles from './RightSection.module.css';
import api from '../../api/axiosInstance';

import { Text, HStack, Button } from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';

const RightSection = () => {
  const PromptButton = () => {
    return (
      <Button
        bg="#42434f"
        _hover={{ bg: '#2b2b2e' }}
        border="none"
        whiteSpace="normal"
        blockSize="auto"
        px={8}
        py={4}
      >
        <Text fontSize="md" fontWeight={400}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor?
        </Text>
      </Button>
    );
  };

  const callApi = () => {
    api
      .post('/users')
      .then(response => {
        const data = response.data;
        alert(JSON.stringify(data));
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainPanel}>
        <Text as="b" fontSize="4xl">
          CourseGPT
        </Text>
        <HStack mt={24} spacing="16px">
          <PromptButton />
          <PromptButton />
          <PromptButton />
        </HStack>
      </div>
      <div className={styles.inputSection}>
        <div className={styles.inputArea}>
          <input className={styles.input} placeholder="Enter a prompt..." />
          <button className={styles.sendBtn} onClick={callApi}>
            <ArrowForwardIcon />
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
