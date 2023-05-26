import React, { useState } from 'react';
import styles from './RightSection.module.css';

import { Text, HStack } from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import PromptButton from '../PromptButton/PromptButton';

const prompts = [
  'What is the course CPSC455 about?',
  'What is the goal of the CPSC455 course?',
  'What technologies will be applied in the CPSC455 course?',
];

const prompts310 = [
  'What are the learning outcomes of CPSC 310 and their significance in software engineering?',
  'How is the project graded?',
  'What is the definition of software and what role does it play in various domains?',
];

const RightSection = ({ selectedCourse }) => {
  const [inputText, setInputText] = useState('');

  const renderPrompts = () => {
    return (
      <HStack mt={24} spacing="16px" className={styles.fadeIn}>
        {prompts.map((prompt, i) => (
          <PromptButton
            key={i}
            promptText={prompt}
            setInputText={setInputText}
          />
        ))}
      </HStack>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainPanel}>
        <Text as="b" fontSize="4xl">
          CourseGPT
        </Text>
        {selectedCourse === 'cpsc455' && renderPrompts()}
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
