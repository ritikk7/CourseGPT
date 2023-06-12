import { Select } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentlySelectedDropdownCourse } from "../../../redux/coursesSlice";

const NewChatCourseSelector = ({ courses, onChange }) => {
  return (
    <Select
      _hover={{ bg: 'rgb(61, 61, 61)' }}
      borderColor="rgb(100, 100, 102)"
      onChange={(e) => onChange(e)}
    >
      {Object.values(courses)?.map((course, i) => (
        <option key={i} value={course._id}>
          {course.courseName}
        </option>
      ))}
    </Select>
  );
};
export default NewChatCourseSelector;
