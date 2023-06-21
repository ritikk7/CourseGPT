import React, { useEffect, useState } from 'react';

import { ChatIcon } from '@chakra-ui/icons';
import styles from './ExistingChat.module.css';
import { Button, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
const ExistingChat = ({
  title,
  handleExistingChatClick,
  id,
  handleChatDelete,
}) => {
  const focusedChat = useSelector(state => state.chats.focusedChat);
  const [isFocused, setIsFocused] = useState(false);
  const maxCharLength = 21;

  useEffect(() => {
    setIsFocused(focusedChat == id);
  }, [focusedChat]);

  const truncateTitle = () => {
    if (title.length > maxCharLength) {
      return title.slice(0, maxCharLength) + '...';
    }
    return title;
  };

  return (
    <Button
      width="100%"
      bg={isFocused ? 'rgb(61, 61, 61)' : 'transparent'}
      _hover={isFocused ? { bg: 'rgb(61, 61, 61)' } : { bg: 'rgb(47, 47, 47)' }}
      onClick={() => handleExistingChatClick(id)}
      pl={3}
    >
      <div className={styles.existingChat}>
        <div>
          <ChatIcon />
        </div>
        <Text fontSize="sm" fontWeight="normal" pl={2} my="auto">
          {truncateTitle(title)}
        </Text>
        {isFocused && (
          <Button
            bg="rgb(61, 61, 61)"
            _hover={{ bg: 'rgb(61, 61, 61)' }}
            position="absolute"
            right={-2}
            top={-0.5}
            onClick={() => handleChatDelete(id)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        )}
      </div>
    </Button>
  );
};

export default ExistingChat;
