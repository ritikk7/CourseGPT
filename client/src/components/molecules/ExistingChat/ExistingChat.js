import React, { useEffect, useState } from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import styles from './ExistingChat.module.css';
import { Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { setIsSidePanelVisible } from '../../../redux/uiSlice';

const ExistingChat = ({
  title,
  handleExistingChatClick,
  id,
  handleChatDelete,
}) => {
  const dispatch = useDispatch();
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
          />
          <CloseIcon
            fontSize="small"
            onClick={() => {
              setIsEditMode(false);
            }}
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
          <DeleteIcon className={styles.editIcon} fontSize="small" />
        </div>
      );
    }
  };

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
            dispatch(setIsSidePanelVisible(false));
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
      {renderActions()}
    </div>
  );
};

export default ExistingChat;
