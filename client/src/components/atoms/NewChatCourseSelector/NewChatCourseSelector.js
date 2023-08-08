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
      _hover={{
        bg: theme.colors.sidePanel.hoverItemBackground,
        borderColor: theme.colors.sidePanel.text,
      }}
      borderColor={theme.colors.sidePanel.text}
      _focus={{
        bg: theme.colors.sidePanel.hoverItemBackground,
        borderColor: theme.colors.sidePanel.text,
      }}
      _expanded={{
        bg: theme.colors.sidePanel.hoverItemBackground,
        borderColor: theme.colors.sidePanel.text,
      }}
      color={theme.colors.sidePanel.text}
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
