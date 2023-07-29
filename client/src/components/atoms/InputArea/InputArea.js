import React from 'react';

import styles from './InputArea.module.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useTheme } from '@chakra-ui/react';

const InputArea = ({
  currentUserInput,
  setInputText,
  onInputSubmit,
  inputRef,
  disableInput,
}) => {
  const theme = useTheme();
  return (
    <div className={styles.inputSection}>
      <div className={styles.inputArea}>
        <input
          className={styles.input}
          placeholder="Enter a prompt... Press ctrl+F or cmd+F to search all chats..."
          value={currentUserInput || ''}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={onInputSubmit}
          ref={inputRef}
          style={{
            backgroundColor: theme.colors.chatSection.inputBackground,
            color: theme.colors.chatSection.inputText,
          }}
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
          <ArrowForwardIcon
            color={theme.colors.chatSection.sendArrow}
            boxSize="1.5em"
          />
        </button>
      </div>
      <div
        className={styles.message}
        style={{ color: theme.colors.textPrimary.dark }}
      >
        <p>
          CourseGPT may produce inaccurate information about instructors or
          course content. [CourseGPT 2023 Version]
        </p>
      </div>
    </div>
  );
};
export default InputArea;
