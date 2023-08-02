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
  ModalCloseButton,
  Textarea,
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
      await api.post(`/chats/${activeChat._id}/messages/${message}/feedback`, {
        rating: isPositive,
        comment: inputValue,
      });
      onClose();
    } catch (e) {
      console.error('Error submitting feedback:', e);
    }
  };

  const theme = useTheme();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={theme.colors.profileModal.mainBackground}>
        <ModalCloseButton
          color={theme.colors.profileModal.mainFormInputColor}
        />
        <ModalHeader color={theme.colors.profileModal.mainTextColor}>
          {isPositive
            ? "We're glad we answered your question! What stood out to you?"
            : "We're sorry to hear that! What stood out to you?"}
        </ModalHeader>
        <ModalBody>
          <Textarea
            size="lg"
            value={inputValue}
            onChange={handleInputChange}
            isResizable={true}
            height="100px"
            color={theme.colors.profileModal.mainTextColor}
            bg={theme.colors.profileModal.mainBackground}
            placeholder="Tell us your thoughts"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            bg={theme.colors.button.light}
            color={theme.colors.button.text}
            _hover={{
              bg: theme.colors.button.hover,
              color: theme.colors.button.text,
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            bg={theme.colors.buttonCancel.light}
            color={theme.colors.buttonCancel.text}
            _hover={{
              bg: theme.colors.buttonCancel.hover,
              color: theme.colors.buttonCancel.text,
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
