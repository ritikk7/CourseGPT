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
  const isTrainingCourse = useSelector(state => state.courses.loading);
  const isGptLoading = useSelector(state => state.messages.gptLoading);
  const usersAllowedToTrain = ['Professor', 'Admin', 'Developer'];
  const theme = useTheme();

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg={theme.colors.buttonTwo.light}
        _hover={{
          bg: theme.colors.buttonTwo.hover,
          color: theme.colors.textPrimary.light,
        }}
        _focus={{
          bg: theme.colors.buttonTwo.hover,
          color: theme.colors.textPrimary.light,
        }}
        _expanded={{
          bg: theme.colors.buttonTwo.hover,
          color: theme.colors.textPrimary.light,
        }}
        leftIcon={
          <Image
            borderRadius="full"
            boxSize="32px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            backgroundColor={theme.colors.background.dark}
          />
        }
        rightIcon={<HamburgerIcon color={theme.colors.textPrimary.dark} />}
        width="100%"
      >
        {username}
      </MenuButton>
      <MenuList bg={theme.colors.primary.dark} border="none">
        <MenuItem
          bg={theme.colors.primary.dark}
          color={theme.colors.textPrimary.light}
          onClick={() => setSettingsOpen(true)}
        >
          Profile
        </MenuItem>
        {!isGptLoading ? (
          <>
            <MenuDivider borderColor={theme.colors.primary.light} />
            <MenuItem
              bg={theme.colors.primary.dark}
              color={theme.colors.textPrimary.light}
              onClick={handleClearConversations}
            >
              Clear conversations
            </MenuItem>
          </>
        ) : null}
        {usersAllowedToTrain.includes(userType) && !isTrainingCourse ? (
          <>
            <MenuDivider borderColor={theme.colors.primary.light} />
            <MenuItem
              bg={theme.colors.primary.dark}
              color={theme.colors.textPrimary.light}
              onClick={() => setTrainCourseModalOpen(true)}
            >
              Train Selected Course
            </MenuItem>{' '}
          </>
        ) : null}
        <MenuDivider borderColor={theme.colors.primary.light} />
        <MenuItem
          bg={theme.colors.primary.dark}
          color={theme.colors.textPrimary.light}
          onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SidePanelUserMenu;
