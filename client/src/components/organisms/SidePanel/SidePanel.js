import React, { useState } from 'react';
import styles from './SidePanel.module.css';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { logoutUser, selectUserFavourites, setActiveNewChatDropdownCourseId } from "../../../redux/userSlice";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileModal from '../ProfileModal';
import NewChatCourseSelector from "../../atoms/NewChatCourseSelector/NewChatCourseSelector";
import NewChatButton from "../../atoms/NewChatButton/NewChatButton";

const SidePanel = ({ setMainPanel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favouriteCourses = useSelector(selectUserFavourites);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/login');
    });
  };
  const handleNewChat = () => setMainPanel('INFO');

  const handleNewChatCourseSelectorChange = (e) => {
      dispatch(setActiveNewChatDropdownCourseId(e.target.value));
  }

  return (
    <div className={styles.sidepanel}>
      <div className={styles.courseSelect}>
        <NewChatCourseSelector courses={favouriteCourses} onChange={handleNewChatCourseSelectorChange}/>
        <NewChatButton onClick={handleNewChat}/>
      </div>
      <div className={styles.profile}>
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
            Username
          </MenuButton>
          <MenuList bg="black" border="none">
            <MenuItem bg="black" onClick={handleOpenSettings}>
              Profile
            </MenuItem>
            <MenuDivider borderColor="rgb(100, 100, 102)" />
            <MenuItem bg="black">Clear conversations</MenuItem>
            <MenuDivider borderColor="rgb(100, 100, 102)" />
            <MenuItem bg="black" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
        <ProfileModal isOpen={isSettingsOpen} handleClose={handleCloseSettings} />
      </div>
    </div>
  );
};

export default SidePanel;
