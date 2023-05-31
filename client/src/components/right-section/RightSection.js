import React, { useState } from 'react';
import styles from './RightSection.module.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import InfoPanel from '../Panels/InfoPanel/InfoPanel';
import ChatPanel from '../Panels/ChatPanel/ChatPanel';

const RightSection = ({ selectedCourse, setCurrentPrompt }) => {
  const [inputText, setInputText] = useState('');

  // const [mainPanel, setMainPanel] = useState(
  //   <InfoPanel setInputText={setInputText} selectedCourse={selectedCourse} />
  // );
  const [mainPanel, setMainPanel] = useState(<ChatPanel />);

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
          }}
        >
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {mainPanel}
      {renderInput()}
    </div>
  );
};

export default RightSection;
