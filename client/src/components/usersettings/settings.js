import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import SchoolCourseSelector from './schoolcourse/SchoolCourseSelector';

const Settings = ({ isOpen, handleClose }) => {
  const handleSave = () => {
    // you can do the user settings save stuff here if wanted
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <SchoolCourseSelector />
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Settings;
