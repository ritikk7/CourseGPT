import React from 'react';

import { Button, Text, useTheme } from '@chakra-ui/react';

const PromptButton = ({ promptText, setInputText, inputRef }) => {
  const theme = useTheme();
  return (
    <Button
      width={{ base: '100%', lg: '33%' }}
      minH="85px"
      bg={theme.colors.button.light}
      _hover={{
        bg: theme.colors.button.hover,
        color: theme.colors.button.textHover,
      }}
      border="none"
      color={theme.colors.button.textBase}
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
