import React from 'react';
import NewChatCourseSelector from '../../atoms/NewChatCourseSelector/NewChatCourseSelector';
import NewChatButton from '../../atoms/NewChatButton/NewChatButton';

const CreateNewChatSection = ({
  favouriteCourses,
  handleCourseChange,
  defaultDropdownValue,
  handleHome,
}) => {
  return favouriteCourses && Object.keys(favouriteCourses).length > 0 ? (
    <>
      <NewChatCourseSelector
        courses={favouriteCourses}
        onChange={handleCourseChange}
        defaultValue={defaultDropdownValue}
      />
      <NewChatButton handleHome={handleHome} />
    </>
  ) : null;
};

export default CreateNewChatSection;
