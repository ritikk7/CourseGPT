import React from 'react';

import styles from './InputArea.module.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';

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
        placeholder="Enter a prompt... Press ctrl+F or cmd+F to search all chats..."
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
export default InputArea;
