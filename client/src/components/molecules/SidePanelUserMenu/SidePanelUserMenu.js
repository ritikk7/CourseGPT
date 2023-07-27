import React from 'react';
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

const SidePanelUserMenu = ({
  setSettingsOpen,
  handleLogout,
  handleClearConversations,
  setTrainCourseModalOpen,
  username,
}) => {
  const userType = useSelector(state => state.user.type);
  const userProfile = useSelector(state => state.user.profilePicture);
  const isTrainingCourse = useSelector(state => state.courses.loading);
  const isGptLoading = useSelector(state => state.messages.gptLoading);
  const usersAllowedToTrain = ['Professor', 'Admin', 'Developer'];

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="transparent"
        _hover={{ bg: 'rgb(61, 61, 61)' }}
        _focus={{ bg: 'rgb(61, 61, 61)' }}
        _expanded={{ bg: 'rgb(61, 61, 61)' }}
        leftIcon={
          <Image
            borderRadius="full"
            boxSize="32px"
            src={userProfile ? userProfile : 'https://bit.ly/dan-abramov'}
            alt="avatar"
          />
        }
        rightIcon={<HamburgerIcon />}
        width="100%"
      >
        {username}
      </MenuButton>
      <MenuList bg="black" border="none">
        <MenuItem bg="black" onClick={() => setSettingsOpen(true)}>
          Profile
        </MenuItem>
        {!isGptLoading ? (
          <>
            <MenuDivider borderColor="rgb(100, 100, 102)" />
            <MenuItem bg="black" onClick={handleClearConversations}>
              Clear conversations
            </MenuItem>
          </>
        ) : null}
        {usersAllowedToTrain.includes(userType) && !isTrainingCourse ? (
          <>
            <MenuDivider borderColor="rgb(100, 100, 102)" />
            <MenuItem bg="black" onClick={() => setTrainCourseModalOpen(true)}>
              Train Selected Course
            </MenuItem>{' '}
          </>
        ) : null}
        <MenuDivider borderColor="rgb(100, 100, 102)" />
        <MenuItem bg="black" onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SidePanelUserMenu;
