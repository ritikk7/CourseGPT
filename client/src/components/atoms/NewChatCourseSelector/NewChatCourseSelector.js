import { Select } from '@chakra-ui/react';
import React from 'react';

const NewChatCourseSelector = ({
  courses,
  onChange,
  defaultValue,
  disable,
}) => {
  return (
    <Select
      _hover={{ bg: 'rgb(61, 61, 61)' }}
      borderColor="rgb(100, 100, 102)"
      value={defaultValue}
      onChange={e => onChange(e)}
      isDisabled={disable}
    >
      {
        <option key={0} value="">
          All chats
        </option>
      }
      {Object.values(courses)?.map((course, i) => (
        <option key={i + 1} value={course._id}>
          {course.courseCode}
        </option>
      ))}
    </Select>
  );
};
export default NewChatCourseSelector;
