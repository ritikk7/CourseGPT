import React from 'react';
import { Button } from '@chakra-ui/react';

const NewChatButton = ({ handleNewChat, disable }) => {
  return (
    <Button
      mt={4}
      width="100%"
      bg="transparent"
      _hover={disable ? '' : { bg: 'rgb(61, 61, 61)' }}
      border="1px"
      borderColor="rgb(100, 100, 102)"
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
