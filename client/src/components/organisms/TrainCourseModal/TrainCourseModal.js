import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { trainCurrentlySelectedDropdownCourse } from '../../../redux/coursesSlice';
import { useDispatch } from 'react-redux';

const TrainCourseModal = ({ isOpen, handleClose, selectedCourseName }) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const dispatch = useDispatch();
  const handleTextAreaChange = event => {
    setTextAreaValue(event.target.value);
  };

  function onTrain() {
    dispatch(trainCurrentlySelectedDropdownCourse(textAreaValue));
    setTextAreaValue('');
    handleClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent bg="gray.700">
        <ModalCloseButton color="white" />
        <VStack p={5} pt={10}>
          <Textarea
            size="lg"
            placeholder="Your text here..."
            value={textAreaValue}
            onChange={handleTextAreaChange}
            isResizable={true}
            height="300px"
            color="white"
          />
        </VStack>
        <ModalFooter>
          <Button
            bg="blue.600"
            color="white"
            _hover={{ bg: 'blue.700' }}
            mr={3}
            onClick={onTrain}
          >
            Train {selectedCourseName}
          </Button>
          <Button
            bg="red.600"
            color="white"
            _hover={{ bg: 'red.700' }}
            onClick={() => {
              setTextAreaValue('');
              handleClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TrainCourseModal;
