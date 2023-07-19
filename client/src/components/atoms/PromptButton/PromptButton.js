import React from 'react';

import styles from './PromptButton.module.css';
import { Button, Text } from '@chakra-ui/react';

const PromptButton = ({ promptText, setInputText, inputRef }) => {
  return (
    <Button
      width={{ base: '100%', lg: '33%' }}
      minH="85px"
      bg="#42434f"
      _hover={{ bg: '#2b2b2e' }}
      border="none"
      whiteSpace="normal"
      blockSize="auto"
      px={8}
      onClick={() => {
        setInputText(promptText);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <Text
        key={promptText}
        className={styles.fadeIn}
        fontSize="md"
        fontWeight={400}
      >
        {promptText}
      </Text>
    </Button>
  );
};
export default PromptButton;
