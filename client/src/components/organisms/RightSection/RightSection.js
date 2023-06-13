import React, { useState } from 'react';
import styles from './RightSection.module.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import InfoPanel from '../InfoPanel/InfoPanel';
import ExistingChatPanel from '../ChatPanel/ExistingChatPanel';
import { useDispatch } from "react-redux";
import { createMessageAndGetGptResponseInActiveChat } from '../../../redux/messagesSlice';

const RightSection = ({
  mainPanel,
  setMainPanel,
}) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');

  const updateChatMessages = newPrompt => {
    if (newPrompt) {
      dispatch(createMessageAndGetGptResponseInActiveChat(newPrompt))
      
    }
  };

  const onInputSubmit = () => {
    updateChatMessages(inputText);
    setInputText('');
    setMainPanel('CHAT');
  };

  const renderMainPanel = () => {
    if (mainPanel === 'CHAT') {
      return <ExistingChatPanel />;
    } else
      return (
        <InfoPanel
          setInputText={setInputText}
        />
      );
  };

  const renderInput = () => (
    <div className={styles.inputSection}>
      <div className={styles.inputArea}>
        <input
          className={styles.input}
          placeholder="Enter a prompt..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && inputText) {
              onInputSubmit();
            }
          }}
        />
        <button
          className={styles.sendBtn}
          onClick={() => {
            onInputSubmit();
          }}
        >
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {renderMainPanel()}
      {renderInput()}
    </div>
  );
};

export default RightSection;
