import React from 'react';
import { Button } from '@chakra-ui/react';

const NewChatButton = ({ handleHome }) => {
  return (
    <Button
      mt={4}
      width="100%"
      bg="transparent"
      _hover={{ bg: 'rgb(61, 61, 61)' }}
      border="1px"
      borderColor="rgb(100, 100, 102)"
      onClick={handleHome}
    >
      Home
    </Button>
  );
};

export default NewChatButton;
