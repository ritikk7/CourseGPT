import React, { useState } from 'react';
import styles from './RightSection.module.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import InfoPanel from '../Panels/InfoPanel/InfoPanel';
import ChatPanel from '../Panels/ChatPanel/ChatPanel';

const RightSection = ({
  mainPanel,
  selectedCourse,
  setCurrentPrompt,
  setMainPanel,
}) => {
  const [inputText, setInputText] = useState('');

  const renderMainPanel = () => {
    if (mainPanel === 'CHAT') {
      return <ChatPanel />;
    } else
      return (
        <InfoPanel
          setInputText={setInputText}
          selectedCourse={selectedCourse}
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
        />
        <button
          className={styles.sendBtn}
          onClick={() => {
            setCurrentPrompt(inputText);
            setInputText('');
            setMainPanel('CHAT');
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
