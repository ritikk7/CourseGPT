import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './SidePanel.module.css';
import ProfileModal from '../ProfileModal/ProfileModal';
import { setCurrentlySelectedDropdownCourse } from '../../../redux/coursesSlice';
import { userFavouriteCoursesSelector } from '../../../redux/selectors/userFavouriteCoursesSelector';
import {
  createChatWithSelectedDropdownCourse,
  setActiveChat,
} from '../../../redux/chatsSlice';
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
  const [filteredChatsToShow, setFilteredChatsToShow] = useState(existingChats);

  useEffect(() => {
    if (selectedCourse) {
      const filteredChats = Object.values(existingChats).filter(chat => {
        return chat.course == selectedCourse._id;
      });
      setFilteredChatsToShow(filteredChats);
    } else {
      setFilteredChatsToShow(existingChats);
    }
  }, [selectedCourse]);

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
    if (newCourseId === 'Select a course') {
      dispatch(setCurrentlySelectedDropdownCourse(null));
      setFilteredChatsToShow([]);
    } else {
      const newCourse = favouriteCourses[newCourseId];
      dispatch(setCurrentlySelectedDropdownCourse(newCourse));
    }
  };

  const handleExistingChatClick = async chatId => {
    await dispatch(setActiveChat(chatId));
    await dispatch(fetchActiveChatMessages());
    await dispatch(setActivePanelChat());
  };

  useEffect(() => {
    if (selectedCourse === null) {
      setDefaultDropdownValue('Select a course');
    }
    if (selectedCourse) {
      setDefaultDropdownValue(selectedCourse._id);
    }
  }, [selectedCourse, favouriteCourses]);

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
          {Object.values(filteredChatsToShow) &&
            Object.values(filteredChatsToShow).length > 0 &&
            Object.values(filteredChatsToShow).map(chatObj => (
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
