import React from 'react';
import PromptButton from '../../PromptButton/PromptButton';
import styles from './InfoPanel.module.css';
import { Text, HStack } from '@chakra-ui/react';

const InfoPanel = ({ selectedCourse, setInputText }) => {
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
    <div className={styles.mainPanel}>
      <Text as="b" fontSize="4xl">
        CourseGPT
      </Text>
      {renderPrompts()}
    </div>
  );
};

export default InfoPanel;
