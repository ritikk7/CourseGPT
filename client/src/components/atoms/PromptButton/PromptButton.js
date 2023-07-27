import React from 'react';

import { Button, Text, useTheme } from '@chakra-ui/react';

const PromptButton = ({ promptText, setInputText, inputRef }) => {
  const theme = useTheme();
  return (
    <Button
      width={{ base: '100%', lg: '33%' }}
      minH="85px"
      color={theme.colors.textPrimary.dark}
      bg={theme.colors.chatSection.dark}
      _hover={{ bg: theme.colors.chatSection.hover }}
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
      <Text key={promptText} fontSize="md" fontWeight={400}>
        {promptText}
      </Text>
    </Button>
  );
};

export default PromptButton;
