import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Textarea,
  useTheme,
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

  const theme = useTheme();
  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent bg={theme.colors.background.light}>
        <ModalCloseButton color={theme.colors.textPrimary.light} />
        <VStack p={5} pt={10}>
          <Textarea
            size="lg"
            placeholder="Your text here..."
            value={textAreaValue}
            onChange={handleTextAreaChange}
            isResizable={true}
            height="300px"
            color={theme.colors.textPrimary.dark}
            bg={theme.colors.tertiary.light}
          />
        </VStack>
        <ModalFooter>
          <Button
            bg={theme.colors.button.light}
            color={theme.colors.textPrimary.light}
            _hover={{
              bg: theme.colors.button.hover,
              color: theme.colors.textPrimary.light,
            }}
            mr={3}
            onClick={onTrain}
          >
            Train {selectedCourseName}
          </Button>
          <Button
            bg={theme.colors.buttonCancel.light}
            color={theme.colors.textPrimary.light}
            _hover={{
              bg: theme.colors.buttonCancel.hover,
              color: theme.colors.textPrimary.light,
            }}
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
