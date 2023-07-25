import React from 'react';
import { Button, useTheme } from '@chakra-ui/react';

const NewChatButton = ({ handleNewChat, disable }) => {
  const theme = useTheme();
  return (
    <Button
      mt={4}
      width="100%"
      bg={theme.colors.button.light}
      _hover={disable ? '' : { bg: theme.colors.button.hover }}
      color={theme.colors.button.textBase}
      _hover={{ color: theme.colors.button.textHover }}
      border="1px"
      borderColor={theme.colors.secondary.light}
      onClick={() => {
        if (!disable) {
          handleNewChat();
        }
      }}
      style={disable ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
    >
      + New Chat
    </Button>
  );
};

export default NewChatButton;
