import React from 'react';
import PromptButton from '../../atoms/PromptButton/PromptButton';
import styles from './InfoPanel.module.css';
import { Box, Stack, Text, useTheme } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const InfoPanel = ({ setInputText, inputRef }) => {
  const selectedCourse = useSelector(
    state => state.courses.currentlySelectedDropdownCourse
  );
  const waitingFirstMessage = useSelector(
    state => state.chats.waitingFirstMessage
  );

  const theme = useTheme();

  const renderPrompts = () => {
    return (
      <Stack
        direction={['column', 'column', 'column', 'row']}
        mt={24}
        spacing="16px"
        bg={theme.colors.chatSection.light}
        color={theme.colors.chatSection.darkText}
      >
        {selectedCourse && waitingFirstMessage
          ? selectedCourse.promptTemplates?.map((prompt, i) => (
              <PromptButton
                key={i}
                promptText={prompt}
                setInputText={() => setInputText(prompt)}
                inputRef={inputRef}
              />
            ))
          : ''}
      </Stack>
    );
  };

  return (
    <Box className={styles.mainPanel} bg={theme.colors.chatSection.light}>
      <Text as="b" fontSize="4xl" color={theme.colors.textPrimary.dark}>
        CourseGPT
      </Text>
      {renderPrompts()}
    </Box>
  );
};

export default InfoPanel;
