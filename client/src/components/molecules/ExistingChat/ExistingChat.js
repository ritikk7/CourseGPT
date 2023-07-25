import React, { useEffect, useState } from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import styles from './ExistingChat.module.css';
import { Button, Text, useTheme } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const showEditMode = isFocused && isEditMode;

  useEffect(() => {
    setIsScreenLarge(window.innerWidth > 680);
  }, [window.innerWidth]);

  useEffect(() => {
    setIsFocused(focusedChat == id);
    setIsEditMode(false);
  }, [focusedChat]);

  const theme = useTheme();

  const renderActions = () => {
    if (showEditMode) {
      return (
        <div className={styles.actions}>
          <CheckIcon
            fontSize="smaller"
            mr={3}
            onClick={() => {
              handleChatDelete(id);
            }}
            color={theme.colors.textSecondary.light}
          />
          <CloseIcon
            fontSize="small"
            onClick={() => {
              setIsEditMode(false);
            }}
            color={theme.colors.textSecondary.light}
          />
        </div>
      );
    } else if (isFocused) {
      return (
        <div
          className={styles.actions}
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          <DeleteIcon
            className={styles.editIcon}
            fontSize="small"
            color={'info'}
          />
        </div>
      );
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button
        width="100%"
        bg={isFocused ? theme.colors.button.light : 'transparent'}
        _hover={{ bg: theme.colors.button.hover }}
        onClick={() => {
          handleExistingChatClick(id);
          if (!isScreenLarge) {
            setIsSidepanelVisible(false);
          }
        }}
        pl={3}
        isDisabled={isGptLoading}
        color={theme.colors.button.textBase}
      >
        <div className={styles.existingChat}>
          <div>
            <ChatIcon color={theme.colors.textPrimary.light} />
          </div>
          <Text
            fontSize="sm"
            fontWeight="normal"
            pl={2}
            my="auto"
            maxW="90%"
            color={theme.colors.textPrimary.light}
          >
            {title}
          </Text>
        </div>
        {!isFocused && <div className={styles.gradient} />}
      </Button>
      {renderActions()}
    </div>
  );
};

export default ExistingChat;
