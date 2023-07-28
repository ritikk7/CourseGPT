import React, { useEffect, useState } from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import styles from './ExistingChat.module.css';
import { Button, Text, useTheme } from '@chakra-ui/react';
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

  const theme = useTheme();

  const renderActions = () => {
    if (showEditMode) {
      return (
        <div className={styles.editActions}>
          <CheckIcon
            fontSize="smaller"
            mr={3}
            onClick={() => {
              handleChatDelete(id);
            }}
            color={theme.colors.sidePanel.text}
          />
          <CloseIcon
            fontSize="small"
            onClick={() => {
              setIsEditMode(false);
            }}
            color={theme.colors.sidePanel.text}
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
        bg={
          isFocused
            ? theme.colors.sidePanel.activeItemBackground
            : 'transparent'
        }
        _hover={{
          bg: isFocused
            ? theme.colors.sidePanel.activeItemBackground
            : theme.colors.sidePanel.hoverItemBackground,
        }}
        onClick={() => {
          handleExistingChatClick(id);
          if (!isScreenLarge) {
            dispatch(setIsSidePanelVisible(false));
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
