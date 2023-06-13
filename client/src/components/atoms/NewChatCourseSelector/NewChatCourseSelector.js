import { Select } from "@chakra-ui/react";
import React from "react";

const NewChatCourseSelector = ({ courses, onChange, defaultValue }) => {
  return (
    <Select
      _hover={{ bg: 'rgb(61, 61, 61)' }}
      borderColor="rgb(100, 100, 102)"
      value={defaultValue}
      onChange={(e) => onChange(e)}
    >
      {Object.values(courses)?.map((course, i) => (
        <option key={i} value={course._id}>
          {course.courseCode}
        </option>
      ))}
    </Select>
  );
};
export default NewChatCourseSelector;
