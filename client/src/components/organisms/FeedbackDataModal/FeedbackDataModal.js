import React, { useEffect, useRef, useState } from 'react';
import styles from './FeedbackDataModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  Textarea,
  VStack,
} from '@chakra-ui/react';

const FeedbackDataModal = ({ isOpen, handleClose, selectedCourse }) => {
  const dispatch = useDispatch();
  // const selectedSchool = useSelector(
  //   state => state.schools[selectedCourse.school]
  // );

  // console.log('here');

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent
          width="82%"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          height="100vh"
        >
          <ModalHeader>
            {/* Currently looking at the feedback for {selectedCourse.courseName} at{' '}
            {selectedSchool.name} */}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>This is the modal content.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedbackDataModal;
