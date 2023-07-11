import React, { useState } from 'react';
import {
  Box,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { FaUser, FaSchool, FaLock } from 'react-icons/fa';
import ProfileUserSettings from '../../molecules/ProfileSettings/ProfileUserSettings/ProfileUserSettings';
import ProfileSchoolSettings from '../../molecules/ProfileSettings/ProfileSchoolSettings/ProfileSchoolSettings';

const ProfileModal = ({ isOpen, handleClose }) => {
  const [selectedSetting, setSelectedSetting] = useState('Personal');

  const renderSettingsSidePanel = () => {
    return (
      <Box
        width="150px"
        borderRight="1px solid"
        borderColor="gray.400"
        backgroundColor="gray.200"
      >
        <VStack spacing={0} height="full" justify="space-around" p={1} m={-1}>
          <Box
            as="button"
            w="100%"
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => setSelectedSetting('Personal')}
            _hover={{
              background: 'gray.300'
            }}
          >
            <Icon as={FaUser} boxSize="24px" />
          </Box>
          <Box
            as="button"
            w="100%"
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderTop="1px"
            borderBottom="1px"
            borderColor="gray.400"
            onClick={() => setSelectedSetting('School')}
            _hover={{
              background: 'gray.300'
            }}
          >
            <Icon as={FaSchool} boxSize="24px" />
          </Box>
          <Box
            as="button"
            w="100%"
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{
              background: 'gray.300'
            }}
          >
            <Icon as={FaLock} boxSize="24px" />
          </Box>
        </VStack>
      </Box>
    );
  };

  const renderSettings = () => {
    switch (selectedSetting) {
      case 'Personal':
        return <ProfileUserSettings handleClose={handleClose} />;
      case 'School':
        return <ProfileSchoolSettings handleClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Stack direction="row" height="450px" backgroundColor={'gray.500'}>
          {renderSettingsSidePanel()}
          <VStack p={5} >{renderSettings()}</VStack>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
