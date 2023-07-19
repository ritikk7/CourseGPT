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
import { useNavigate } from 'react-router-dom';

const SidePanelUserMenu = ({
  setSettingsOpen,
  handleLogout,
  handleClearConversations,
  setTrainCourseModalOpen,
  username,
}) => {
  const userType = useSelector(state => state.user.type);
  const isTrainingCourse = useSelector(state => state.courses.loading);
  const isGptLoading = useSelector(state => state.messages.gptLoading);
  const usersAllowedToTrain = ['Professor', 'Admin', 'Developer'];
  const allowedViewAnalytics = ['Admin', 'Developer'];
  const navigate = useNavigate();

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
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
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
            </MenuItem>
          </>
        ) : null}
        {allowedViewAnalytics.includes(userType) ? (
          <>
            <MenuDivider borderColor="rgb(100, 100, 102)" />
            <MenuItem bg="black" onClick={() => navigate('/data')}>
              View Analytics
            </MenuItem>
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
