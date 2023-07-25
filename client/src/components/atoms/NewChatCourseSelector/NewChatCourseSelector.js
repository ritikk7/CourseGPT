import { Select } from '@chakra-ui/react';
import React from 'react';
import { useTheme } from '@chakra-ui/react';

const NewChatCourseSelector = ({
  courses,
  onChange,
  defaultValue,
  disable,
}) => {
  const theme = useTheme();

  return (
    <Select
      _hover={{ bg: theme.colors.primary.light }}
      borderColor={theme.colors.secondary.light}
      color={theme.colors.textPrimary.light}
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
