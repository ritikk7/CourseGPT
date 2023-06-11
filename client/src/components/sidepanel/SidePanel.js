import React from 'react';
import styles from './SidePanel.module.css';
import api from '../../api/axiosInstance';
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
import CourseObject from '../../models/CourseObject';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const SidePanel = ({ setSelectedCourse, setMainPanel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleNewChat = () => {
    setMainPanel('INFO');
  };

  return (
    <div className={styles.sidepanel}>
      <div className={styles.courseSelect}>
        <Select
          _hover={{ bg: 'rgb(61, 61, 61)' }}
          borderColor="rgb(100, 100, 102)"
          defaultValue="cpsc455"
          onChange={e => {
            setSelectedCourse(new CourseObject(e.target.value));
          }}
        >
          <option value="cpsc455">CPSC455</option>
          <option value="cpsc310">CPSC310</option>
          <option value="cpsc320">CPSC320</option>
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
            <MenuItem bg="black">Profile</MenuItem>
            <MenuDivider borderColor="rgb(100, 100, 102)" />
            <MenuItem bg="black">Clear conversations</MenuItem>
            <MenuDivider borderColor="rgb(100, 100, 102)" />
            <MenuItem bg="black" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default SidePanel;
