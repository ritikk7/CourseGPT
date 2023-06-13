import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import styles from "./SidePanel.module.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import NewChatCourseSelector from "../../atoms/NewChatCourseSelector/NewChatCourseSelector";
import NewChatButton from "../../atoms/NewChatButton/NewChatButton";
import { setCurrentlySelectedDropdownCourse } from "../../../redux/coursesSlice";
import { userFavoriteCoursesSelector } from "../../../redux/selectors/userFavoriteCoursesSelector";
import { createChatWithSelectedDropdownCourse } from "../../../redux/chatsSlice";
import { setActivePanelInfo } from "../../../redux/userSlice";
import { logoutUser } from "../../../redux/authSlice";

const SidePanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favouriteCourses = useSelector(userFavoriteCoursesSelector);
  const selectedCourse = useSelector((state) => state.courses.currentlySelectedDropdownCourse);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [defaultDropdownValue, setDefaultDropdownValue] = useState(null)

  useEffect(() => {
    const firstCourse = favouriteCourses && (Object.values(favouriteCourses)[0] || null);
    dispatch(setCurrentlySelectedDropdownCourse(firstCourse));
  }, [favouriteCourses, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const handleNewChat = () => {
    if (selectedCourse) {
      dispatch(createChatWithSelectedDropdownCourse(selectedCourse._id));
      dispatch(setActivePanelInfo());
    }
  };

  const handleCourseChange = (event) => {
    const newCourseId = event.target.value;
    const newCourse = favouriteCourses[newCourseId];
    dispatch(setCurrentlySelectedDropdownCourse(newCourse));
  };

  useEffect(() => {
    if(selectedCourse) {
      setDefaultDropdownValue(selectedCourse._id);
    } else if (favouriteCourses && Object.values(favouriteCourses)[0] && Object.values(favouriteCourses)[0]._id){
      setDefaultDropdownValue(Object.values(favouriteCourses)[0]._id);
    }
  }, [selectedCourse, favouriteCourses])


  return (
    <div className={styles.sidepanel}>
      <div className={styles.courseSelect}>
        {favouriteCourses && Object.keys(favouriteCourses).length !== 0 && (
          <>
            <NewChatCourseSelector courses={favouriteCourses} onChange={handleCourseChange} defaultValue={defaultDropdownValue}/>
            <NewChatButton handleNewChat={handleNewChat} />
          </>
        )}
      </div>
      <div className={styles.profile}>
        <Menu>
          <MenuButton
            as={Button}
            bg="transparent"
            _hover={{ bg: "rgb(61, 61, 61)" }}
            _focus={{ bg: "rgb(61, 61, 61)" }}
            _expanded={{ bg: "rgb(61, 61, 61)" }}
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
            <MenuItem bg="black" onClick={() => setSettingsOpen(true)}>
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
        {isSettingsOpen && <ProfileModal isOpen={isSettingsOpen} handleClose={() => setSettingsOpen(false)} />}
      </div>
    </div>
  );
};

export default SidePanel;
