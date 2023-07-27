import React from 'react';
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useTheme,
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
  const theme = useTheme();

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg={theme.colors.sidePanel.background}
        color={theme.colors.sidePanel.text}
        _hover={{
          bg: theme.colors.sidePanel.hoverItemBackground,
          color: theme.colors.textPrimary.light,
        }}
        _focus={{
          bg: theme.colors.sidePanel.hoverItemBackground,
          color: theme.colors.textPrimary.light,
        }}
        _expanded={{
          bg: theme.colors.sidePanel.hoverItemBackground,
          color: theme.colors.textPrimary.light,
        }}
        leftIcon={
          <Image
            borderRadius="full"
            boxSize="32px"
            src={userProfile ? userProfile : 'https://bit.ly/dan-abramov'}
            alt="avatar"
          />
        }
        rightIcon={<HamburgerIcon color={theme.colors.sidePanel.text} />}
        width="100%"
      >
        {username}
      </MenuButton>
      <MenuList
        bg={theme.colors.sidePanel.hoverItemBackground}
        color={theme.colors.sidePanel.text}
        border="none"
      >
        <MenuItem
          bg={theme.colors.sidePanel.hoverItemBackground}
          color={theme.colors.sidePanel.text}
          _hover={{
            color: theme.colors.sidePanel.textHover,
          }}
          onClick={() => setSettingsOpen(true)}
        >
          Profile
        </MenuItem>
        {!isGptLoading ? (
          <>
            <MenuDivider borderColor={theme.colors.sidePanel.text} />
            <MenuItem
              bg={theme.colors.sidePanel.hoverItemBackground}
              color={theme.colors.sidePanel.text}
              _hover={{
                color: theme.colors.sidePanel.textHover,
              }}
              onClick={handleClearConversations}
            >
              Clear conversations
            </MenuItem>
          </>
        ) : null}
        {usersAllowedToTrain.includes(userType) && !isTrainingCourse ? (
          <>
            <MenuDivider borderColor={theme.colors.sidePanel.text} />
            <MenuItem
              bg={theme.colors.sidePanel.hoverItemBackground}
              color={theme.colors.sidePanel.text}
              _hover={{
                color: theme.colors.sidePanel.textHover,
              }}
              onClick={() => setTrainCourseModalOpen(true)}
            >
              Train Selected Course
            </MenuItem>{' '}
          </>
        ) : null}
        <MenuDivider borderColor={theme.colors.sidePanel.text} />
        <MenuItem
          bg={theme.colors.sidePanel.hoverItemBackground}
          color={theme.colors.sidePanel.text}
          _hover={{
            color: theme.colors.sidePanel.textHover,
          }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SidePanelUserMenu;
