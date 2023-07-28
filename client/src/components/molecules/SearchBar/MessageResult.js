import React from 'react';
// import styled from 'styled-components';
import styles from './MessageResult.module.css';
import { Box, Highlight, Divider } from '@chakra-ui/react';
import {
  setActiveChat,
  setFocusedChat,
  setHighlightMessage,
} from '../../../redux/chatsSlice';
import { useDispatch } from 'react-redux';
import { setCurrentlySelectedDropdownCourse } from '../../../redux/coursesSlice';
import { fetchActiveChatMessages } from '../../../redux/messagesSlice';
import { setActivePanelChat } from '../../../redux/userSlice';
import mapHighlightedTextToArray from '../../../util/mapHighlightedText';
import { setIsSearchBarVisible } from '../../../redux/uiSlice';

const MessageResult = ({ result }) => {
  const dispatch = useDispatch();

  const highlightedTexts = mapHighlightedTextToArray(result);

  const handleClick = async e => {
    e.preventDefault();
    // console.log(result);
    const chatId = result.chat;
    // set selected course to all chats
    // console.log('setting CurrentlySelectedDropdownCourse to null (All)');
    await dispatch(setCurrentlySelectedDropdownCourse(null));
    // set selected chat to chatId
    // console.log('setting active chat to chat ', chatId);
    await dispatch(setActiveChat(chatId));
    // console.log('setting focused chat to chat ', chatId);
    await dispatch(setFocusedChat(chatId));
    // Render messages on the right (with the message highlighted)
    await dispatch(fetchActiveChatMessages());
    // collapse search panel
    await dispatch(setActivePanelChat());
    // set ref at the messageId and autoscroll to that reference
    await dispatch(setHighlightMessage(result));
    await dispatch(setIsSearchBarVisible(false));
  };

  return (
    <>
      <Box className={styles.box} onClick={handleClick}>
        <Highlight
          query={highlightedTexts}
          styles={{
            px: '1',
            py: '1',
            bg: 'blue.600',
            color: 'yellow.50',
            rounded: 'md',
          }}
        >
          {result.content}
        </Highlight>
      </Box>
      <Divider />
    </>
  );
};

export default MessageResult;
