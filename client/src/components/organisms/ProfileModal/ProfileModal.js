import React, { useState } from 'react';
import {
  Box,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { FaUser, FaSchool, FaLock } from 'react-icons/fa';
import ProfileUserSettings from '../../molecules/ProfileSettings/ProfileUserSettings/ProfileUserSettings';
import ProfileSchoolSettings from '../../molecules/ProfileSettings/ProfileSchoolSettings/ProfileSchoolSettings';
import ProfileSecuritySettings from '../../molecules/ProfileSettings/ProfileSecuritySettings/ProfileSecuritySettings';

const ProfileModal = ({ isOpen, handleClose }) => {
  const [selectedSetting, setSelectedSetting] = useState('Personal');

  const theme = useTheme();
  const personalBackgroundColor = selectedSetting === 'Personal'? theme.colors.page.sidePanelActiveItemBackground: 'transparent';
  const schoolBackgroundColor = selectedSetting === 'School'? theme.colors.page.sidePanelActiveItemBackground: 'transparent';
  const securityBackgroundColor = selectedSetting === 'Security'? theme.colors.page.sidePanelActiveItemBackground: 'transparent';
  const renderSettingsSidePanel = () => {
    return (
      <Box
        width="150px"
        borderRight="1px solid"
        borderColor={theme.colors.page.text}
        backgroundColor={theme.colors.page.sidePanelBackground}
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
              background: theme.colors.page.sidePanelHoverItemBackground,
            }}
            bg={personalBackgroundColor}
          >
            <Icon
              as={FaUser}
              boxSize="24px"
              color={theme.colors.page.text}
            />
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
            borderColor={theme.colors.page.text}
            onClick={() => setSelectedSetting('School')}
            _hover={{
              background: theme.colors.page.sidePanelHoverItemBackground,
            }}
            bg={schoolBackgroundColor}
          >
            <Icon
              as={FaSchool}
              boxSize="24px"
              color={theme.colors.page.text}
            />
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
              background: theme.colors.page.sidePanelHoverItemBackground,
            }}
            bg={securityBackgroundColor}
          >
            <Icon
              as={FaLock}
              boxSize="24px"
              color={theme.colors.page.text}
            />
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
        <Stack
          direction="row"
          height="450px"
          backgroundColor={theme.colors.page.text}
        >
          {renderSettingsSidePanel()}
          <VStack p={5}>{renderSettings()}</VStack>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
