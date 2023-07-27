import React, { useEffect, useRef, useState } from 'react';
import styles from './RightSection.module.css';
import InfoPanel from '../InfoPanel/InfoPanel';
import ChatPanel from '../ChatPanel/ChatPanel';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUserMessageInActiveChat,
  getGptResponseInChat,
  setCurrentUserInput,
} from '../../../redux/messagesSlice';
import {
  setActivePanelChat,
  setShouldFocusChatInput,
} from '../../../redux/userSlice';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  createChatWithSelectedDropdownCourse,
  fetchChat,
} from '../../../redux/chatsSlice';
import { Button, Box, Spinner, Tooltip } from '@chakra-ui/react';
import {
  setIsSearchBarVisible,
  setIsSidePanelVisible,
} from '../../../redux/uiSlice';
import SearchBarInput from '../../molecules/SearchBar/SearchBarInput';
import { HotKeys } from 'react-hotkeys';
import InputArea from '../../atoms/InputArea/InputArea';

const keyMap = {
  SHOW_SEARCH: 'command+f',
};

const RightSection = () => {
  const dispatch = useDispatch();
  const activePanel = useSelector(state => state.user.activePanel);
  const isTrainingCourse = useSelector(state => state.courses.loading);
  const currentUserInput = useSelector(
    state => state.messages.currentUserInput
  );
  const isGptLoading = useSelector(state => state.messages.gptLoading);
  const selectedCourse = useSelector(
    state => state.courses.currentlySelectedDropdownCourse
  );
  const waitingFirstMessage = useSelector(
    state => state.chats.waitingFirstMessage
  );
  const activeChat = useSelector(state => state.chats.activeChat);
  const renderInput =
    (activePanel === 'CHAT' || selectedCourse) &&
    (activeChat || waitingFirstMessage);
  const inputRef = useRef(null);
  const shouldFocusChatInput = useSelector(
    state => state.user.shouldFocusChatInput
  );
  const [trainingCompleted, setTrainingCompleted] = useState(false);
  const hasBeenTraining = useRef(false);
  const isSidePanelVisible = useSelector(state => state.ui.isSidePanelVisible);
  const isSearchBarVisible = useSelector(state => state.ui.isSearchBarVisible);

  const hotKeyHandlers = {
    SHOW_SEARCH: () => {
      dispatch(setIsSearchBarVisible(true));
    },
  };

  useEffect(() => {
    let timeoutId;
    if (!isTrainingCourse && trainingCompleted) {
      timeoutId = setTimeout(() => {
        setTrainingCompleted(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [isTrainingCourse, trainingCompleted]);

  useEffect(() => {
    if (isTrainingCourse) {
      hasBeenTraining.current = true;
    }
    if (!isTrainingCourse && hasBeenTraining.current && !trainingCompleted) {
      setTrainingCompleted(true);
    }
  }, [isTrainingCourse]);

  const onInputSubmit = async e => {
    if (e.type === 'keydown' && e.key !== 'Enter') return;
    if (!activeChat) {
      await dispatch(createChatWithSelectedDropdownCourse(selectedCourse._id));
    }
    dispatch(setCurrentUserInput(''));
    dispatch(setActivePanelChat());
    await dispatch(createUserMessageInActiveChat(currentUserInput)).then(
      async newMessagePayload => {
        await dispatch(getGptResponseInChat(newMessagePayload.payload));
        dispatch(fetchChat(newMessagePayload.payload.chat));
      }
    );
  };

  const setInputText = value => {
    dispatch(setCurrentUserInput(value));
  };

  useEffect(() => {
    if (shouldFocusChatInput) {
      inputRef.current && inputRef.current.focus();
      dispatch(setShouldFocusChatInput(false));
    }
  }, [shouldFocusChatInput, dispatch]);

  const mainPanel =
    activePanel === 'CHAT' ? (
      <ChatPanel />
    ) : (
      <InfoPanel setInputText={setInputText} inputRef={inputRef} />
    );

  return (
    <HotKeys keyMap={keyMap} handlers={hotKeyHandlers}>
      <div
        className={styles.container}
        style={
          isSidePanelVisible
            ? { transition: '0.5s' }
            : { width: '100%', transition: '0.5s' }
        }
      >
        {!isSidePanelVisible && (
          <div className={styles.toggleSidepanelBtn}>
            <Button
              ml={2}
              bg="transparent"
              _hover={{ bg: '#50505c' }}
              border="1px solid white"
              onClick={() => {
                dispatch(setIsSidePanelVisible(true));
              }}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        )}
        {isTrainingCourse && (
          <Tooltip label="Training in progress" fontSize="md" placement="top">
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <Spinner
                color="blue.500"
                speed="0.90s"
                size="lg"
                thickness="3px"
              />
            </div>
          </Tooltip>
        )}
        {trainingCompleted && (
          <Box
            position="absolute"
            top="10px"
            right="10px"
            background="green.500"
            color="white"
            p="2"
            borderRadius="md"
          >
            Training complete!
          </Box>
        )}
        {mainPanel}
        {renderInput && (
          <InputArea
            currentUserInput={currentUserInput}
            setInputText={setInputText}
            onInputSubmit={onInputSubmit}
            inputRef={inputRef}
            disableInput={isGptLoading}
          />
        )}
        {isSearchBarVisible && <SearchBarInput />}
      </div>
    </HotKeys>
  );
};

export default RightSection;
