import React, { useState } from 'react';
import { Box, Flex, IconButton, useTheme } from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import FeedbackModal from '../FeedbackModal/FeedbackModal';

const Feedback = ({ message }) => {
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

  const theme = useTheme();
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
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
          bg={theme.colors.chatSection.dark}
          color={theme.colors.chatSection.icon}
          _hover={{
            color: theme.colors.accent.darker,
          }}
          onClick={handleThumbsUpClick}
        />
        <IconButton
          icon={<FaThumbsDown />}
          bg={theme.colors.chatSection.dark}
          color={theme.colors.chatSection.icon}
          _hover={{
            color: theme.colors.error.dark,
          }}
          onClick={handleThumbsDownClick}
        />
      </Flex>
    </Box>
  );
};

export default Feedback;
