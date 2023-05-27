import React, { useState } from 'react';
import styles from './RightSection.module.css';
import { Text, HStack } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import PromptButton from '../PromptButton/PromptButton';

const RightSection = ({ selectedCourse, setCurrentPrompt }) => {
  const [inputText, setInputText] = useState('');

  const renderPrompts = () => {
    return (
      <HStack mt={24} spacing="16px">
        {selectedCourse.getPrompts().map((prompt, i) => (
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
        {renderPrompts()}
      </div>
      <div className={styles.inputSection}>
        <div className={styles.inputArea}>
          <input
            className={styles.input}
            placeholder="Enter a prompt..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
          <button
            className={styles.sendBtn}
            onClick={() => {
              setCurrentPrompt(inputText);
              setInputText('');
            }}
          >
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
