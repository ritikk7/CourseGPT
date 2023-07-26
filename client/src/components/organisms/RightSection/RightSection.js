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
import { ArrowForwardIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  createChatWithSelectedDropdownCourse,
  fetchChat,
} from '../../../redux/chatsSlice';
import { Button, Box, Spinner, Tooltip } from '@chakra-ui/react';
import SearchBarInput from '../../molecules/SearchBar/SearchBarInput';

const Message = ({ value }) => (
  <div className={styles.message}>
    <p>{value}</p>
  </div>
);

const InputArea = ({
  currentUserInput,
  setInputText,
  onInputSubmit,
  inputRef,
  disableInput,
}) => (
  <div className={styles.inputSection}>
    <div className={styles.inputArea}>
      <input
        className={styles.input}
        placeholder="Enter a prompt..."
        value={currentUserInput || ''}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={onInputSubmit}
        ref={inputRef}
      />
      <button
        className={styles.sendBtn}
        onClick={e => {
          if (currentUserInput.trim()) onInputSubmit(e);
        }}
        style={
          currentUserInput.trim() && !disableInput
            ? {}
            : { cursor: 'not-allowed', opacity: 0.5 }
        }
        disabled={disableInput}
      >
        <ArrowForwardIcon />
      </button>
    </div>
    <Message
      value={
        'CourseGPT may produce inaccurate information about instructors or course content. [CourseGPT 2023 Version]'
      }
    />
  </div>
);

const RightSection = ({ isSidepanelVisible, toggleSidePanelVisibility }) => {
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
    <div
      className={styles.container}
      style={
        isSidepanelVisible
          ? { transition: '0.5s' }
          : { width: '100%', transition: '0.5s' }
      }
    >
      {!isSidepanelVisible && (
        <div className={styles.toggleSidepanelBtn}>
          <Button
            ml={2}
            bg="transparent"
            _hover={{ bg: '#50505c' }}
            border="1px solid white"
            onClick={toggleSidePanelVisibility}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      )}
      {isTrainingCourse && (
        <Tooltip label="Training in progress" fontSize="md" placement="top">
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <Spinner color="blue.500" speed="0.90s" size="lg" thickness="3px" />
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
      <SearchBarInput />
    </div>
  );
};

export default RightSection;
