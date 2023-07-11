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
  setIsSidepanelVisible,
}) => {
  const focusedChat = useSelector(state => state.chats.focusedChat);
  const isGptLoading = useSelector(state => state.messages.gptLoading);
  const [isFocused, setIsFocused] = useState(false);
  const [isScreenLarge, setIsScreenLarge] = useState(true);

  useEffect(() => {
    setIsScreenLarge(window.innerWidth > 680);
  }, [window.innerWidth]);

  useEffect(() => {
    setIsFocused(focusedChat == id);
  }, [focusedChat]);
  return (
    <div style={{ position: 'relative' }}>
      <Button
        width="100%"
        bg={isFocused ? 'rgb(61, 61, 61)' : 'transparent'}
        _hover={
          isFocused ? { bg: 'rgb(61, 61, 61)' } : { bg: 'rgb(47, 47, 47)' }
        }
        onClick={() => {
          handleExistingChatClick(id);
          if (!isScreenLarge) {
            setIsSidepanelVisible(false);
          }
        }}
        pl={3}
        isDisabled={isGptLoading}
      >
        <div className={styles.existingChat}>
          <div>
            <ChatIcon />
          </div>
          <Text fontSize="sm" fontWeight="normal" pl={2} my="auto" maxW="90%">
            {title}
          </Text>
        </div>
        {!isFocused && <div className={styles.gradient} />}
      </Button>
      {isFocused && (
        <div
          className={styles.actions}
          onClick={() => {
            handleChatDelete(id);
          }}
        >
          <DeleteIcon fontSize="small" style={{ margin: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default ExistingChat;
