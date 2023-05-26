import React, { useState } from 'react';
import styles from './RightSection.module.css';

import { Text, HStack, Button } from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';

const prompts = [
  'What is the course CPSC455 about?',
  'What is the goal of the CPSC455 course?',
  'What technologies will be applied in the CPSC455 course?',
];

const RightSection = () => {
  const [inputText, setInputText] = useState('');

  const PromptButton = ({ promptText }) => {
    return (
      <Button
        bg="#42434f"
        _hover={{ bg: '#2b2b2e' }}
        border="none"
        whiteSpace="normal"
        blockSize="auto"
        px={8}
        py={4}
        onClick={() => setInputText(promptText)}
      >
        <Text fontSize="md" fontWeight={400}>
          {promptText}
        </Text>
      </Button>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainPanel}>
        <Text as="b" fontSize="4xl">
          CourseGPT
        </Text>
        <HStack mt={24} spacing="16px">
          {prompts.map(prompt => (
            <PromptButton promptText={prompt} />
          ))}
        </HStack>
      </div>
      <div className={styles.inputSection}>
        <div className={styles.inputArea}>
          <input
            className={styles.input}
            placeholder="Enter a prompt..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
          <button className={styles.sendBtn} onClick={() => setInputText('')}>
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
