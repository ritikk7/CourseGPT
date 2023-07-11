import React, { useEffect, useRef, useState } from 'react';
import styles from './FeedbackDataModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Select,
  Button,
} from '@chakra-ui/react';
import { schoolsWithCoursesSelector } from '../../../redux/selectors/schoolsWithCoursesSelector';
import { fetchFeedbackAnalysis } from '../../../redux/feedbackDataSlice';

const FeedbackData = () => {
  const dispatch = useDispatch();
  const schoolsWithCourses = useSelector(schoolsWithCoursesSelector);
  const courses = state => state.courses.courses;
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedCourse, setSelectedCourses] = useState([]);

  const handleClick = () => {
    // Dispatch your action to the reducer
    dispatch(fetchFeedbackAnalysis());
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.title}>
        {selectedSchool ? (
          <Text>
            Currently looking at the feedback for {selectedCourse.courseCode}:{' '}
            {selectedCourse.courseName} at {selectedSchool.name}
          </Text>
        ) : (
          <Text>Looking at the feedback for all courses and schools</Text>
        )}
      </Box>
      <Box className={styles.title}>
        <Button onClick={handleClick}>Click me</Button>

        {/* <Text>Currently looking at the feedback for {selectedCourse.courseCode}: {selectedCourse.courseName} at {selectedSchool.name}</Text> */}
      </Box>
    </Box>
  );
};

export default FeedbackData;
