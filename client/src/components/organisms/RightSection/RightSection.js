import React, { useCallback } from 'react';
import styles from './RightSection.module.css';
import InfoPanel from '../InfoPanel/InfoPanel';
import ChatPanel from '../ChatPanel/ChatPanel';
import { useDispatch, useSelector } from 'react-redux';
import {
  createMessageAndGetGptResponseInActiveChat,
  setCurrentUserInput,
} from '../../../redux/messagesSlice';
import { setActivePanelChat } from '../../../redux/userSlice';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const InputArea = ({ currentUserInput, setInputText, onInputSubmit }) => (
  <div className={styles.inputSection}>
    <div className={styles.inputArea}>
      <input
        className={styles.input}
        placeholder="Enter a prompt..."
        value={currentUserInput || ''}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={onInputSubmit}
      />
      <button
        className={styles.sendBtn}
        onClick={e => {
          if (currentUserInput.trim()) onInputSubmit(e);
        }}
        style={
          currentUserInput.trim() ? {} : { cursor: 'not-allowed', opacity: 0.5 }
        }
      >
        <ArrowForwardIcon />
      </button>
    </div>
  </div>
);

const RightSection = () => {
  const dispatch = useDispatch();
  const activePanel = useSelector(state => state.user.activePanel);
  const currentUserInput = useSelector(
    state => state.messages.currentUserInput
  );

  const onInputSubmit = e => {
    if (e.type === 'keydown' && e.key !== 'Enter') return;
    dispatch(createMessageAndGetGptResponseInActiveChat(currentUserInput));
    dispatch(setCurrentUserInput(''));
    dispatch(setActivePanelChat());
  };

  const setInputText = value => {
    dispatch(setCurrentUserInput(value));
  };

  const mainPanel =
    activePanel === 'CHAT' ? (
      <ChatPanel />
    ) : (
      <InfoPanel setInputText={setInputText} />
    );

  return (
    <div className={styles.container}>
      {mainPanel}
      <InputArea
        currentUserInput={currentUserInput}
        setInputText={setInputText}
        onInputSubmit={onInputSubmit}
      />
    </div>
  );
};

export default RightSection;
