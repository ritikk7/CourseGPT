import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Text, Box, Checkbox } from "@chakra-ui/react";
import { fetchSchoolCourses } from "../../../redux/coursesSlice";

const CourseSelection = ({ school, selectedCourses, setSelectedCourses }) => {
  const dispatch = useDispatch();
  const schoolIdToCoursesMap = useSelector((state) => state.courses.allCourses);

  useEffect(() => {
    if(school && school._id && (!schoolIdToCoursesMap || !schoolIdToCoursesMap[school._id])) {
      dispatch(fetchSchoolCourses(school._id));
    }
  }, [school, schoolIdToCoursesMap, dispatch]);

  const courses = school && school._id && schoolIdToCoursesMap && schoolIdToCoursesMap[school._id] ? schoolIdToCoursesMap[school._id] : {};

  const handleCourseChange = (course) => {
    setSelectedCourses((prevCourses) => {
      if (prevCourses[course._id]) {
        const {[course._id]: deletedCourse, ...remainingCourses} = prevCourses;
        return remainingCourses;
      } else {
        return { ...prevCourses, [course._id]: course};
      }
    });
  };

  if (!school || !school._id) {
    return null;
  }

  return (
    <Box w="100%">
      <Text fontSize="lg">Courses</Text>
      {Object.values(courses).map((course) => (
        <Checkbox
          key={course._id}
          isChecked={!!selectedCourses[course._id]}
          onChange={() => handleCourseChange(course)}
        >
          {course.courseName}
        </Checkbox>
      ))}
    </Box>
  );
};

export default CourseSelection;
