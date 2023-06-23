import React, { useState } from 'react';
import api from '../../../api/axiosInstance';
import { useSelector } from 'react-redux';
import { Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { activeChatWithMessagesSelector } from '../../../redux/selectors/activeChatWithMessagesSelector';

const FeedbackModal = ({ isOpen, onClose, isPositive, message }) => {
    const [inputValue, setInputValue] = useState('Tell us your thoughts');  
    const activeChat = useSelector(activeChatWithMessagesSelector);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = async () => {
        if (!inputValue || inputValue === 'Tell us your thoughts') {
            return;
        }
        try {
            await api.post(`/users/${activeChat.user}/chatIds/${activeChat._id}/messages/${message}/feedback`, {
                rating: isPositive, comment: inputValue,
            });
            onClose();
        } catch (e) {
            console.error('Error submitting feedback:', e);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
            {isPositive ? "We're glad we answered your question! What stood out to you?" : 
                            "We're sorry to hear that! What stood out to you?"}
        </ModalHeader>
          <ModalBody>
            <Input value={inputValue} onChange={handleInputChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
          </ModalContent>
      </Modal>
    )
}

export default FeedbackModal;