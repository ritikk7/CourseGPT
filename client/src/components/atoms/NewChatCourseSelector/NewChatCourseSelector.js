import { Select } from "@chakra-ui/react";
import React from "react";

const NewChatCourseSelector = ({ courses, onChange }) => {
  return (
    <Select
      _hover={{ bg: 'rgb(61, 61, 61)' }}
      borderColor="rgb(100, 100, 102)"
      onChange={(e) => onChange(e)}
    >
      {Object.values(courses)?.map((course, i) => (
        <option key={i} value={course}>
          {course.courseName}
        </option>
      ))}
    </Select>
  );
};
export default NewChatCourseSelector;
