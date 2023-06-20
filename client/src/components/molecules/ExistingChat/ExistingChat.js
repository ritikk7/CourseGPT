import React, { useEffect, useState } from 'react';

import { ChatIcon } from '@chakra-ui/icons';
import styles from './ExistingChat.module.css';
import { Button, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const ExistingChat = ({ title, handleExistingChatClick, id }) => {
  const focusedChat = useSelector(state => state.chats.focusedChat);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsFocused(focusedChat == id);
  }, [focusedChat]);

  const truncateTitle = () => {
    if (title.length > 20) {
      return title.slice(0, 20) + '...';
    }
    return title;
  };

  return (
    <Button
      width="100%"
      bg={isFocused ? 'rgb(61, 61, 61)' : 'transparent'}
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
