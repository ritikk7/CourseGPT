import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Tooltip, Spinner } from '@chakra-ui/react';
import { fetchFeedbackAnalysis } from '../../../redux/feedbackDataSlice';

const FeedbackData = () => {
  const dispatch = useDispatch();
  const isLoadingFeedbackData = useSelector(
    state => state.feedbackData.loading
  );
  const hasLoadedData = useSelector(state => state.feedbackData.hasLoadedData);

  const handleClick = () => {
    dispatch(fetchFeedbackAnalysis());
  };

  return (
    <div style={{ color: 'black', paddingTop: 60, paddingLeft: '40%' }}>
      <Box>
        <Button onClick={handleClick}>Click to load data for feedback</Button>
      </Box>
      {isLoadingFeedbackData && (
        <Tooltip
          label="Currently loading feedback data"
          fontSize="lg"
          placement="top"
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            <Spinner color="blue.500" speed="0.90s" size="lg" />
          </div>
        </Tooltip>
      )}
      {hasLoadedData && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          background="green.500"
          color="white"
          p="4"
          borderRadius="md"
          fontSize="xl"
          fontWeight="bold"
          zIndex={1}
        >
          Feedback analysis loaded!
        </Box>
      )}
    </div>
  );
};

export default FeedbackData;
