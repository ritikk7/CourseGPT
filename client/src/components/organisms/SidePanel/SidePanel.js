import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './SidePanel.module.css';
import ProfileModal from '../ProfileModal/ProfileModal';
import { setCurrentlySelectedDropdownCourse } from '../../../redux/coursesSlice';
import { userFavouriteCoursesSelector } from '../../../redux/selectors/userFavouriteCoursesSelector';
import {
  createChatWithSelectedDropdownCourse,
  setActiveChat, softDeleteSelectedDropdownCourseChats
} from "../../../redux/chatsSlice";
import {
  setActivePanelChat,
  setActivePanelInfo,
} from '../../../redux/userSlice';
import { logoutUser } from '../../../redux/authSlice';
import SidePanelUserMenu from '../../molecules/SidePanelUserMenu/SidePanelUserMenu';
import CreateNewChatSection from '../../molecules/CreateNewChatSection/CreateNewChatSection';
import ExistingChat from '../../molecules/ExistingChat/ExistingChat';
import { fetchActiveChatMessages } from '../../../redux/messagesSlice';

const SidePanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favouriteCourses = useSelector(userFavouriteCoursesSelector);
  const selectedCourse = useSelector(
    state => state.courses.currentlySelectedDropdownCourse
  );
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [defaultDropdownValue, setDefaultDropdownValue] = useState('');
  const existingChats = useSelector(state => state.chats.userChats);

  useEffect(() => {
    const firstCourse =
      favouriteCourses && (Object.values(favouriteCourses)[0] || null);
    dispatch(setCurrentlySelectedDropdownCourse(firstCourse));
  }, [favouriteCourses, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const handleNewChat = () => {
    if (selectedCourse) {
      dispatch(createChatWithSelectedDropdownCourse(selectedCourse._id));
      dispatch(setActivePanelInfo());
    }
  };

  const handleCourseChange = event => {
    const newCourseId = event.target.value;
    const newCourse = favouriteCourses[newCourseId];
    dispatch(setCurrentlySelectedDropdownCourse(newCourse));
  };

  const handleExistingChatClick = async chatId => {
    await dispatch(setActiveChat(chatId));
    await dispatch(fetchActiveChatMessages());
    await dispatch(setActivePanelChat());
  };

  const handleClearConversations = () => {
    console.log("handleClearConversations");
    dispatch(softDeleteSelectedDropdownCourseChats());
  };

  useEffect(() => {
    if (selectedCourse) {
      setDefaultDropdownValue(selectedCourse._id);
    } else if (
      favouriteCourses &&
      Object.values(favouriteCourses)[0] &&
      Object.values(favouriteCourses)[0]._id
    ) {
      setDefaultDropdownValue(Object.values(favouriteCourses)[0]._id);
    }
  }, [selectedCourse, favouriteCourses]);

  let chats = Object.values(existingChats);
  return (
    <div className={styles.sidepanel}>
      <div className={styles.courseSelect}>
        <CreateNewChatSection
          favouriteCourses={favouriteCourses}
          handleCourseChange={handleCourseChange}
          defaultDropdownValue={defaultDropdownValue}
          handleNewChat={handleNewChat}
        />
        <div className={styles.chatsPanel}>
          {chats &&
            chats.length > 0 &&
            chats
              .filter(chatObj => !chatObj.deleted)
              .map(chatObj => (
              <ExistingChat
                key={chatObj._id}
                id={chatObj._id}
                title={chatObj.title}
                handleExistingChatClick={handleExistingChatClick}
              />
            ))}
        </div>
      </div>
      <div className={styles.profile}>
        <SidePanelUserMenu
          handleLogout={handleLogout}
          setSettingsOpen={setSettingsOpen}
          handleClearConversations={handleClearConversations}
        />
        {isSettingsOpen && (
          <ProfileModal
            isOpen={isSettingsOpen}
            handleClose={() => setSettingsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SidePanel;
