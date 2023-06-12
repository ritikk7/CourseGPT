import React, { useEffect, useState } from "react";
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
import { logoutUser} from "../../../redux/authSlice";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileModal from '../ProfileModal/ProfileModal';
import NewChatCourseSelector from "../../atoms/NewChatCourseSelector/NewChatCourseSelector";
import NewChatButton from "../../atoms/NewChatButton/NewChatButton";
import { fetchUserFavouriteCourses, setCurrentlySelectedDropdownCourse } from "../../../redux/coursesSlice";
import { createChat } from '../../../redux/chatsSlice';


const SidePanel = ({ setMainPanel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userFavouriteCourses = useSelector((state) => state.courses.userFavourites);
  const currentlySelectedDropdownCourse = useSelector((state) => state.courses.currentlySelectedDropdownCourse)
  const [viewSettings, setViewSettings] = useState(false);

  const handleViewSettings = () => {
    setViewSettings(!viewSettings);
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/login');
    });
  };
  const handleNewChat = () => {
    if (!currentlySelectedDropdownCourse) {
      return;
    }
    dispatch(createChat(currentlySelectedDropdownCourse._id))
    setMainPanel('INFO');
  };

  const handleNewChatCourseSelectorChange = (e) => {
    dispatch(setCurrentlySelectedDropdownCourse(e.target.value))
  }

  return (
    <div className={styles.sidepanel}>
      <div className={styles.courseSelect}>
        {Object.keys(userFavouriteCourses).length !== 0 && (
          <>
            <NewChatCourseSelector courses={userFavouriteCourses} onChange={handleNewChatCourseSelectorChange}/>
            <NewChatButton onClick={handleNewChat}/>
          </>
        )}
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
            <MenuItem bg="black" onClick={handleViewSettings}>
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
        {viewSettings && <ProfileModal isOpen={viewSettings} handleClose={handleViewSettings} />}
      </div>
    </div>
  );
};

export default SidePanel;
