import React from 'react';

import { ChatIcon } from '@chakra-ui/icons';
import styles from './ExistingChat.module.css';
import { Text } from '@chakra-ui/react';

const ExistingChat = () => {
  return (
    <div className={styles.existingChat}>
      <div>
        <ChatIcon />
      </div>
      <Text fontWeight="medium" pl={2}>
        Chat name
      </Text>
    </div>
  );
};

export default ExistingChat;
