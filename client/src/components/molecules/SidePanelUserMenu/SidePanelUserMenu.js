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
import { useSelector, useDispatch } from 'react-redux';
import { setIsSearchBarVisible } from '../../../redux/uiSlice';
import { setActivePanelSearch } from '../../../redux/userSlice';

const SidePanelUserMenu = ({
  setSettingsOpen,
  handleLogout,
  handleClearConversations,
  setTrainCourseModalOpen,
  username,
  setSeeFeedback,
  isAnalyticsMode,
}) => {
  const dispatch = useDispatch();
  const userType = useSelector(state => state.user.type);
  const userProfile = useSelector(state => state.user.profilePicture);
  const isTrainingCourse = useSelector(state => state.courses.loading);
  const isGptLoading = useSelector(state => state.messages.gptLoading);
  const usersAllowedToTrain = ['Professor', 'Admin', 'Developer'];
  const theme = useTheme();
  const allowedViewAnalytics = ['Admin', 'Developer'];

  const renderUserMenu = () => {
    if (isAnalyticsMode) {
      return (
        <>
          <MenuItem
            bg={theme.colors.sidePanel.menuBackground}
            color={theme.colors.sidePanel.menuText}
            _hover={{
              color: theme.colors.sidePanel.menuTextHover,
            }}
            onClick={() => {
              setSeeFeedback(false);
            }}
          >
            Back
          </MenuItem>
        </>
      );
    }
    return (
      <>
        <MenuItem
          bg={theme.colors.sidePanel.menuBackground}
          color={theme.colors.sidePanel.menuText}
          _hover={{
            color: theme.colors.sidePanel.menuTextHover,
          }}
          onClick={() => setSettingsOpen(true)}
        >
          Profile
        </MenuItem>
        <MenuDivider borderColor={theme.colors.sidePanel.menuText} />
        <MenuItem
          bg={theme.colors.sidePanel.menuBackground}
          color={theme.colors.sidePanel.menuText}
          _hover={{
            color: theme.colors.sidePanel.menuTextHover,
          }}
          onClick={() => {
            dispatch(setIsSearchBarVisible(true));
            dispatch(setActivePanelSearch());
          }}
        >
          Search Chats/Messages
        </MenuItem>
        {!isGptLoading ? (
          <>
            <MenuDivider borderColor={theme.colors.sidePanel.menuText} />
            <MenuItem
              bg={theme.colors.sidePanel.menuBackground}
              color={theme.colors.sidePanel.menuText}
              _hover={{
                color: theme.colors.sidePanel.menuTextHover,
              }}
              onClick={handleClearConversations}
            >
              Clear conversations
            </MenuItem>
          </>
        ) : null}
        {usersAllowedToTrain.includes(userType) && !isTrainingCourse ? (
          <>
            <MenuDivider borderColor={theme.colors.sidePanel.menuText} />
            <MenuItem
              bg={theme.colors.sidePanel.menuBackground}
              color={theme.colors.sidePanel.menuText}
              _hover={{
                color: theme.colors.sidePanel.menuTextHover,
              }}
              onClick={() => setTrainCourseModalOpen(true)}
            >
              Train Selected Course
            </MenuItem>{' '}
          </>
        ) : null}
        {allowedViewAnalytics.includes(userType) ? (
          <>
            <MenuDivider borderColor={theme.colors.sidePanel.menuText} />
            <MenuItem
              bg={theme.colors.sidePanel.menuBackground}
              color={theme.colors.sidePanel.menuText}
              _hover={{
                color: theme.colors.sidePanel.menuTextHover,
              }}
              onClick={() => setSeeFeedback(true)}
            >
              View Analytics
            </MenuItem>
          </>
        ) : null}
      </>
    );
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg={theme.colors.sidePanel.background}
        color={theme.colors.sidePanel.menuText}
        _hover={{
          bg: theme.colors.sidePanel.menuBackground,
          color: theme.colors.textPrimary.light,
        }}
        _focus={{
          bg: theme.colors.sidePanel.menuBackground,
          color: theme.colors.textPrimary.light,
        }}
        _expanded={{
          bg: theme.colors.sidePanel.menuBackground,
          color: theme.colors.textPrimary.light,
        }}
        leftIcon={
          <Image
            borderRadius="full"
            boxSize="32px"
            src={userProfile}
            alt="avatar"
          />
        }
        rightIcon={<HamburgerIcon color={theme.colors.sidePanel.menuText} />}
        width="100%"
      >
        {username}
      </MenuButton>
      <MenuList
        bg={theme.colors.sidePanel.menuBackground}
        color={theme.colors.sidePanel.menuText}
        border="none"
      >
        {renderUserMenu()}
        <MenuDivider borderColor={theme.colors.sidePanel.menuText} />
        <MenuItem
          bg={theme.colors.sidePanel.menuBackground}
          color={theme.colors.sidePanel.menuText}
          _hover={{
            color: theme.colors.sidePanel.menuTextHover,
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
