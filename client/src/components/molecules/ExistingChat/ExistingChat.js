import React from 'react';

import { ChatIcon } from '@chakra-ui/icons';
import styles from './ExistingChat.module.css';
import { Button, Text } from '@chakra-ui/react';

const ExistingChat = ({ title, handleExistingChatClick, id }) => {
  const truncateTitle = () => {
    if (title.length > 22) {
      return title.slice(0, 22) + '...';
    }
  };
  return (
    <Button
      width="100%"
      bg="transparent"
      _hover={{ bg: 'rgb(61, 61, 61)' }}
      onClick={() => handleExistingChatClick(id)}
    >
      <div className={styles.existingChat}>
        <div>
          <ChatIcon />
        </div>
        <Text fontSize="sm" fontWeight="normal" pl={2} my="auto">
          {truncateTitle(title)}
        </Text>
      </div>
    </Button>
  );
};

export default ExistingChat;
