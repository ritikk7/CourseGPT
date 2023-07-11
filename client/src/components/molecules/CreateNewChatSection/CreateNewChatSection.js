import React from 'react';
import NewChatCourseSelector from '../../atoms/NewChatCourseSelector/NewChatCourseSelector';
import NewChatButton from '../../atoms/NewChatButton/NewChatButton';
import { Button } from '@chakra-ui/react';
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
          _hover={{ bg: '#39393c' }}
          border="1px solid rgb(100, 100, 102)"
          onClick={toggleSidePanelVisibility}
        >
          <ChevronLeftIcon />
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
