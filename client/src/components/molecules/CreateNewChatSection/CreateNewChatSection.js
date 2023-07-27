import React from 'react';
import NewChatCourseSelector from '../../atoms/NewChatCourseSelector/NewChatCourseSelector';
import NewChatButton from '../../atoms/NewChatButton/NewChatButton';
import { Button, useTheme } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

const CreateNewChatSection = ({
  favouriteCourses,
  handleCourseChange,
  defaultDropdownValue,
  handleNewChat,
  disableNewChatButton,
  disabledNewChatCourseSelector,
  toggleSidePanelVisibility,
}) => {
  const theme = useTheme();
  return favouriteCourses && Object.keys(favouriteCourses).length > 0 ? (
    <>
      <div style={{ display: 'flex' }}>
        <NewChatCourseSelector
          courses={favouriteCourses}
          onChange={handleCourseChange}
          defaultValue={defaultDropdownValue}
          disable={disabledNewChatCourseSelector}
        />
        <Button
          ml={2}
          bg="transparent"
          _hover={{ bg: theme.colors.sidePanel.hoverItemBackground }}
          border={`1px solid ${theme.colors.sidePanel.text}`}
          onClick={toggleSidePanelVisibility}
        >
          <ChevronLeftIcon color={theme.colors.sidePanel.text} />
        </Button>
      </div>
      <NewChatButton
        handleNewChat={handleNewChat}
        disable={disableNewChatButton}
      />
    </>
  ) : null;
};

export default CreateNewChatSection;
