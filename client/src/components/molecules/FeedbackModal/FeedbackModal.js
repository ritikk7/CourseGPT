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
  const [inputValue, setInputValue] = useState('');
  const activeChat = useSelector(activeChatWithMessagesSelector);

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue || inputValue === '') {
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
      <ModalContent bg={theme.colors.secondary.dark}>
        <ModalHeader color={theme.colors.textPrimary.light}>
          {isPositive
            ? "We're glad we answered your question! What stood out to you?"
            : "We're sorry to hear that! What stood out to you?"}
        </ModalHeader>
        <ModalBody>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            borderColor={theme.colors.tertiary.light}
            color={theme.colors.textPrimary.light}
            focusBorderColor={theme.colors.primary.light}
            placeholder="Tell us your thoughts"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            bg={theme.colors.button.light}
            color={theme.colors.textPrimary.light}
            _hover={{
              bgColor: theme.colors.button.hover,
              color: theme.colors.textPrimary.light,
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            bg={theme.colors.buttonCancel.light}
            color={theme.colors.textPrimary.light}
            _hover={{
              bgColor: theme.colors.buttonCancel.hover,
              color: theme.colors.textPrimary.light,
            }}
            ml={3}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
