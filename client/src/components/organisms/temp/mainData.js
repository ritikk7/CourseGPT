import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Button } from '@chakra-ui/react';
import { fetchFeedbackAnalysis } from '../../../redux/feedbackDataSlice';
import MainAnalysisPage from './MainAnalysisPage';

const FeedbackData = () => {
  const dispatch = useDispatch();
  // This is for a select school/course thing I haven't done yet (can either have all schools/courses selected or specific one)
  const [selectedSchool, setSelectedSchool] = useState(''); // need to add dropdown stuff later
  const [selectedCourse, setSelectedCourse] = useState([]);
  const feedbackData = useSelector(state => state.feedbackData.feedbackInfo);
  const freqData = useSelector(state => state.feedbackData.freqData);

  const handleClick = () => {
    dispatch(fetchFeedbackAnalysis());
  };

  return (
    <div style={{ color: 'black', paddingTop: 60 }}>
      <Box>
        <Box>
          {selectedSchool ? (
            <Text>
              Currently looking at the feedback for {selectedCourse.courseCode}:{' '}
              {selectedCourse.courseName} at {selectedSchool.name}
            </Text>
          ) : (
            <Text>Looking at the feedback for all courses and schools</Text>
          )}
        </Box>
        <Box>
          <Button onClick={handleClick}>Get feedback</Button>
          {feedbackData.length && (
            <MainAnalysisPage
              course={selectedCourse}
              school={selectedSchool}
              data={feedbackData}
              freqData={freqData}
            />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default FeedbackData;
