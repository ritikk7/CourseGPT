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
        <textarea
          className={styles.input}
          placeholder="Enter a prompt..."
          value={currentUserInput || ''}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (currentUserInput.trim() && !disableInput) {
                inputRef.current.style.height = '50px'; // reset to default (in InputArea.module.css)
                onInputSubmit(e);
              }
            }
          }}
          onInput={e => {
            e.target.style.height = '50px'; // reset to default (in InputArea.module.css)
            e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
          }}
          ref={inputRef}
          style={{
            backgroundColor: theme.colors.chatSection.inputBackground,
            color: theme.colors.chatSection.inputText,
          }}
        />
        <button
          className={styles.sendBtn}
          onClick={e => {
            if (currentUserInput.trim()) {
              inputRef.current.style.height = '50px'; // reset to default (in InputArea.module.css)
              onInputSubmit(e);
            }
          }}
          style={
            currentUserInput.trim() && !disableInput
              ? {}
              : { cursor: 'not-allowed', opacity: 0.5 }
          }
          disabled={disableInput || !currentUserInput.trim()}
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
