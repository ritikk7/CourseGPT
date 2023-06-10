import React, { useState } from 'react';
import styles from './SidePanel.module.css';
import api from '../../../api/axiosInstance';
import {
  Select,
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
import { logoutUser } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCourse } from '../../../redux/schoolsSlice';
import ProfileModal from '../ProfileModal';
import CourseSelectorModal from "../CourseSelectorModal";

const SidePanel = ({ setMainPanel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector(state => state.schoolCourse.courses);
  const school = useSelector(state => state.schoolCourse.school);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCourseSelectorOpen, setCourseSelectorOpen] = useState(true);

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleCloseCourseSelector = () => {
    setCourseSelectorOpen(false);
  };

  const callApi = () => {
    api
      .post('/users')
      .then(response => {
        const data = response.data;
        alert(JSON.stringify(data));
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/login');
    });
  };
  const handleNewChat = () => setMainPanel('INFO');

  return (
    <div className={styles.sidepanel}>
      <div className={styles.courseSelect}>
        <Select
          _hover={{ bg: 'rgb(61, 61, 61)' }}
          borderColor="rgb(100, 100, 102)"
          onChange={e => {
            dispatch(
              setCourse({ schoolId: school._id, courseId: e.target.value })
            );
          }}
        >
          {courses.map((course, i) => (
            <option key={i} value={course._id}>
              {course.courseName}
            </option>
          ))}
        </Select>
        <Button
          mt={4}
          width="100%"
          bg="transparent"
          _hover={{ bg: 'rgb(61, 61, 61)' }}
          border="1px"
          borderColor="rgb(100, 100, 102)"
          onClick={() => handleNewChat()}
        >
          + New Chat
        </Button>
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
            onClick={callApi}
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
        <CourseSelectorModal isOpen={isCourseSelectorOpen} handleClose={handleCloseCourseSelector} />
        <ProfileModal isOpen={isSettingsOpen} handleClose={handleCloseSettings} />
      </div>
    </div>
  );
};

export default SidePanel;
