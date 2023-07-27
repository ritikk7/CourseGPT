import React, { useState } from 'react';
import {
  Box,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack, useTheme,
  VStack
} from "@chakra-ui/react";
import { FaUser, FaUserPlus, FaSchool, FaLock } from 'react-icons/fa';
import ProfileUserSettings from '../../molecules/ProfileSettings/ProfileUserSettings/ProfileUserSettings';
import ProfileSchoolSettings from '../../molecules/ProfileSettings/ProfileSchoolSettings/ProfileSchoolSettings';
import ProfileSecuritySettings from '../../molecules/ProfileSettings/ProfileSecuritySettings/ProfileSecuritySettings';
import ProfileAvatar from '../../molecules/ProfileSettings/ProfileAvatar/ProfileAvatar';

const ProfileModal = ({ isOpen, handleClose }) => {
  const [selectedSetting, setSelectedSetting] = useState('Personal');
  const theme = useTheme();
  const renderSettingsSidePanel = () => {
    return (
      <Box
        width="150px"
        borderRight="1px solid"
        borderColor={theme.colors.profileModal.mainTextColor}
        backgroundColor={theme.colors.profileModal.sidePanelInactiveItemBackground}
      >
        <VStack spacing={0} height="full" justify="space-around">
          <Box
            as="button"
            w="100%"
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => setSelectedSetting('Personal')}
            _hover={{
              background: theme.colors.profileModal.sidePanelHoverItemBackground,
            }}
            backgroundColor={selectedSetting === 'Personal' ? theme.colors.profileModal.sidePanelActiveItemBackground : theme.colors.profileModal.sidePanelInactiveItemBackground}
          >
            <Icon as={FaUser} boxSize="24px" color={theme.colors.profileModal.sidePanelIconColor} />
          </Box>
          <Box
            as="button"
            w="100%"
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderTop="1px"
            borderColor={theme.colors.profileModal.mainTextColor}
            onClick={() => setSelectedSetting('Avatar')}
            _hover={{
              background: theme.colors.profileModal.sidePanelHoverItemBackground,
            }}
            backgroundColor={selectedSetting === 'Avatar' ? theme.colors.profileModal.sidePanelActiveItemBackground : theme.colors.profileModal.sidePanelInactiveItemBackground}
          >
            <Icon as={FaUserPlus} boxSize="24px" color={theme.colors.profileModal.sidePanelIconColor} />
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
            borderColor={theme.colors.profileModal.mainTextColor}
            onClick={() => setSelectedSetting('School')}
            _hover={{
              background: theme.colors.profileModal.sidePanelHoverItemBackground,
            }}
            backgroundColor={selectedSetting === 'School' ? theme.colors.profileModal.sidePanelActiveItemBackground : theme.colors.profileModal.sidePanelInactiveItemBackground}
          >
            <Icon as={FaSchool} boxSize="24px" color={theme.colors.profileModal.sidePanelIconColor} />
          </Box>
          <Box
            as="button"
            w="100%"
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => setSelectedSetting('Security')}
            _hover={{
              background: theme.colors.profileModal.sidePanelHoverItemBackground,
            }}
            backgroundColor={selectedSetting === 'Security' ? theme.colors.profileModal.sidePanelActiveItemBackground : theme.colors.profileModal.sidePanelInactiveItemBackground}
          >
            <Icon as={FaLock} boxSize="24px" color={theme.colors.profileModal.sidePanelIconColor} />
          </Box>
        </VStack>
      </Box>
    );
  };

  const renderSettings = () => {
    switch (selectedSetting) {
      case 'Personal':
        return <ProfileUserSettings handleClose={handleClose} />;
      case 'Avatar':
        return <ProfileAvatar handleClose={handleClose} />;
      case 'School':
        return <ProfileSchoolSettings handleClose={handleClose} />;
      case 'Security':
        return <ProfileSecuritySettings handleClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Stack direction="row" height="450px" backgroundColor={theme.colors.profileModal.mainBackground}>
          {renderSettingsSidePanel()}
          <VStack p={5}>{renderSettings()}</VStack>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
