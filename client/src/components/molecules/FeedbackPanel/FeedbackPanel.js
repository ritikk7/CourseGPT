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
    <Box bgColor={theme.colors.background.light}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        color={theme.colors.textPrimary.light}
      >
        {currentFeedbackModal === 'positive' && (
          <FeedbackModal
            isOpen={true}
            onClose={handleCloseModal}
            isPositive={true}
            message={message}
            backgroundColor={theme.colors.accent.light}
            color={theme.colors.textSecondary.light}
          />
        )}
        {currentFeedbackModal === 'negative' && (
          <FeedbackModal
            isOpen={true}
            onClose={handleCloseModal}
            isPositive={false}
            message={message}
            backgroundColor={theme.colors.error.light}
            color={theme.colors.textSecondary.light}
          />
        )}
        <IconButton
          icon={<FaThumbsUp />}
          bgColor={theme.colors.button.light}
          color={theme.colors.button.textBase}
          _hover={{
            bgColor: theme.colors.button.hover,
            color: theme.colors.button.textHover,
          }}
          onClick={handleThumbsUpClick}
        />
        <IconButton
          icon={<FaThumbsDown />}
          bgColor={theme.colors.buttonTwo.light}
          color={theme.colors.buttonTwo.textBase}
          _hover={{
            bgColor: theme.colors.buttonTwo.hover,
            color: theme.colors.buttonTwo.textHover,
          }}
          onClick={handleThumbsDownClick}
        />
      </Flex>
    </Box>
  );
};

export default Feedback;
