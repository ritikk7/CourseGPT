import React, { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import styles from './FeedbackPanel.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import FeedbackModal from '../FeedbackModal/FeedbackModal';

const Feedback = ({message}) => {
  const [currentFeedbackModal, setCurrentFeedbackModal] = useState(null);

  const handleThumbsUpClick = () => {
    setCurrentFeedbackModal('positive');
  };

  const handleThumbsDownClick = () => {
    setCurrentFeedbackModal('negative');
  };

  const handleCloseModal = () => {
    setCurrentFeedbackModal(null);
  };


  return (
    <Box className={styles.message}>
      <Flex justifyContent="space-between" alignItems="right">
      {currentFeedbackModal === 'positive' && (
          <FeedbackModal
            isOpen={true}
            onClose={handleCloseModal}
            isPositive={true}
            message={message}
          />
        )}
        {currentFeedbackModal === 'negative' && (
          <FeedbackModal
            isOpen={true}
            onClose={handleCloseModal}
            isPositive={false}
            message={message}
          />
        )}
        <IconButton
          icon={<FaThumbsUp />}
          colorScheme="green"
          variant="ghost"
          onClick={handleThumbsUpClick}
        />
        <IconButton
          icon={<FaThumbsDown />}
          colorScheme="red"
          variant="ghost"
          onClick={handleThumbsDownClick}
        />
      </Flex>
    </Box>
  );

  
};

export default Feedback;
