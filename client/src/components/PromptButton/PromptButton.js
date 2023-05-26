import React from 'react';

import { Text, Button } from '@chakra-ui/react';

const PromptButton = ({ promptText, setInputText }) => {
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
export default PromptButton;
