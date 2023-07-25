import React, { useState } from 'react';
import api from '../../../api/axiosInstance';
import { useSelector } from 'react-redux';
import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useTheme,
} from '@chakra-ui/react';
import { activeChatWithMessagesSelector } from '../../../redux/selectors/activeChatWithMessagesSelector';

const FeedbackModal = ({ isOpen, onClose, isPositive, message }) => {
  const [inputValue, setInputValue] = useState('Tell us your thoughts');
  const activeChat = useSelector(activeChatWithMessagesSelector);

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue || inputValue === 'Tell us your thoughts') {
      return;
    }
    try {
      await api.post(
        `/users/${activeChat.user}/chatIds/${activeChat._id}/messages/${message}/feedback`,
        {
          rating: isPositive,
          comment: inputValue,
        }
      );
      onClose();
    } catch (e) {
      console.error('Error submitting feedback:', e);
    }
  };

  const theme = useTheme();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={theme.colors.background.light}>
        <ModalHeader
          color={
            isPositive ? theme.colors.accent.light : theme.colors.error.light
          }
        >
          {isPositive
            ? "We're glad we answered your question! What stood out to you?"
            : "We're sorry to hear that! What stood out to you?"}
        </ModalHeader>
        <ModalBody>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            borderColor={theme.colors.tertiary.light}
            focusBorderColor={theme.colors.primary.light}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor={theme.colors.button.light}
            color={theme.colors.button.textBase}
            _hover={{
              bgColor: theme.colors.button.hover,
              color: theme.colors.button.textHover,
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            color={theme.colors.textSecondary.light}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
