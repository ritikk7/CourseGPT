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
import NlpSentenceEncoderComponent from './newtemp';

const FeedbackData = () => {
  const dispatch = useDispatch();
  const schoolsWithCourses = useSelector(schoolsWithCoursesSelector);
  const [selectedSchool, setSelectedSchool] = useState(''); // need to add dropdown stuff later
  const [selectedCourse, setSelectedCourse] = useState([]);
  const feedbackData = useSelector(state => state.feedbackData.feedbackInfo);

  const handleClick = () => {
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
        <Button onClick={handleClick}>Get feedback</Button>
        {feedbackData.length && (
          <NlpSentenceEncoderComponent
            course={selectedCourse}
            school={selectedSchool}
            data={feedbackData}
          />
        )}
      </Box>
    </Box>
  );
};

export default FeedbackData;
