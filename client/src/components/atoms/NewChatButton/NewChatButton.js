import React from 'react';
import { Button, useTheme } from '@chakra-ui/react';

const NewChatButton = ({ handleNewChat, disable }) => {
  const theme = useTheme();
  return (
    <Button
      mt={4}
      width="100%"
      bg={theme.colors.sidePanel.background}
      _hover={disable ? '' : { bg: theme.colors.sidePanel.hoverItemBackground }}
      color={theme.colors.sidePanel.text}
      border="1px"
      borderColor={theme.colors.sidePanel.text}
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
