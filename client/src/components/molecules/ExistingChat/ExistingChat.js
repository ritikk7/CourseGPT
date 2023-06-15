import React from 'react';

import { ChatIcon } from '@chakra-ui/icons';
import styles from './ExistingChat.module.css';
import { Text } from '@chakra-ui/react';

const ExistingChat = ({ title }) => {
  const truncateTitle = () => {
    if (title.length > 22) {
      return title.slice(0, 22) + '...';
    }
  };
  return (
    <div className={styles.existingChat}>
      <div>
        <ChatIcon />
      </div>
      <Text fontSize="sm" fontWeight="normal" pl={2} my="auto">
        {truncateTitle(title)}
      </Text>
    </div>
  );
};

export default ExistingChat;
