import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './SidePanel.module.css';
import ProfileModal from '../ProfileModal/ProfileModal';
import {
  setCurrentlySelectedDropdownCourse,
  trainCurrentlySelectedDropdownCourse,
} from '../../../redux/coursesSlice';
import { userFavouriteCoursesSelector } from '../../../redux/selectors/userFavouriteCoursesSelector';
import {
  fetchUserChats,
  setActiveChat,
  setFocusedChat,
  setWaitingFirstMessage,
  softDeleteSelectedDropdownCourseChats,
  softDeleteSingleChat,
} from '../../../redux/chatsSlice';
import {
  setActivePanelChat,
  setActivePanelInfo,
  setShouldFocusChatInput,
} from '../../../redux/userSlice';
import { logoutUser } from '../../../redux/authSlice';
import SidePanelUserMenu from '../../molecules/SidePanelUserMenu/SidePanelUserMenu';
import CreateNewChatSection from '../../molecules/CreateNewChatSection/CreateNewChatSection';
import ExistingChat from '../../molecules/ExistingChat/ExistingChat';
import { fetchActiveChatMessages } from '../../../redux/messagesSlice';

const SimpleCourseTrainingPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const onSubmit = () => {
    dispatch(trainCurrentlySelectedDropdownCourse(text));
  };

  if (!isOpen) return null;

  return (
    <div>
      <textarea
        className={styles.textareaStyle}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => onSubmit(text)}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const SidePanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSimpleCourseTrainingPopup, setShowSimpleCourseTrainingPopup] =
    useState(false);
  const userFirst = useSelector(state => state.user.firstName);
  const userLast = useSelector(state => state.user.lastName);
  const userType = useSelector(state => state.user.type);
  const favouriteCourses = useSelector(userFavouriteCoursesSelector);
  const selectedCourse = useSelector(
    state => state.courses.currentlySelectedDropdownCourse
  );
  const [disableNewChatButton, setDisableNewChatButton] = useState(true);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [defaultDropdownValue, setDefaultDropdownValue] = useState('');
  const existingChats = useSelector(state => state.chats.userChats);
  const [filteredChatsToShow, setFilteredChatsToShow] = useState(existingChats);

  useEffect(() => {
    if (selectedCourse) {
      const filteredChats = Object.values(existingChats).filter(chat => {
        return chat.course === selectedCourse._id;
      });
      setFilteredChatsToShow(filteredChats);
    } else {
      setFilteredChatsToShow(existingChats);
    }
  }, [selectedCourse, existingChats]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const handleNewChat = () => {
    dispatch(setActivePanelInfo());
    dispatch(setWaitingFirstMessage(true));
    dispatch(setShouldFocusChatInput(true));
  };

  const handleCourseChange = event => {
    const newCourseId = event.target.value;
    if (newCourseId === '') {
      dispatch(setCurrentlySelectedDropdownCourse(null));
      setFilteredChatsToShow([]);
      setDisableNewChatButton(true);
    } else {
      const newCourse = favouriteCourses[newCourseId];
      dispatch(setCurrentlySelectedDropdownCourse(newCourse));
      setDisableNewChatButton(false);
    }
    dispatch(setFocusedChat(null));
    dispatch(setActivePanelInfo());
    dispatch(setWaitingFirstMessage(true));
    dispatch(setShouldFocusChatInput(true));
  };

  const handleExistingChatClick = async chatId => {
    await dispatch(setActiveChat(chatId));
    await dispatch(setFocusedChat(chatId));
    await dispatch(fetchActiveChatMessages());
    await dispatch(setActivePanelChat());
    dispatch(setShouldFocusChatInput(true));
  };

  const handleChatDelete = async id => {
    await dispatch(setActivePanelInfo());
    await dispatch(softDeleteSingleChat(id));
    await dispatch(fetchUserChats());
  };

  const handleClearConversations = () => {
    dispatch(softDeleteSelectedDropdownCourseChats());
  };

  useEffect(() => {
    if (selectedCourse === null) {
      setDefaultDropdownValue('');
    }
    if (selectedCourse) {
      setDefaultDropdownValue(selectedCourse._id);
    }
  }, [selectedCourse, favouriteCourses]);

  let chats = Object.values(filteredChatsToShow);
  return (
    <div className={styles.sidepanel}>
      <div className={styles.courseSelect}>
        {userType === 'Developer' && (
          <button
            onClick={() =>
              setShowSimpleCourseTrainingPopup(!showSimpleCourseTrainingPopup)
            }
          >
            Train Selected Course
          </button>
        )}
        <SimpleCourseTrainingPopup
          isOpen={showSimpleCourseTrainingPopup}
          onClose={() => setShowSimpleCourseTrainingPopup(false)}
        />
        <CreateNewChatSection
          favouriteCourses={favouriteCourses}
          handleCourseChange={handleCourseChange}
          defaultDropdownValue={defaultDropdownValue}
          handleNewChat={handleNewChat}
          disableNewChatButton={disableNewChatButton}
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
                  handleChatDelete={handleChatDelete}
                />
              ))}
        </div>
      </div>
      <div className={styles.profile}>
        <SidePanelUserMenu
          handleLogout={handleLogout}
          setSettingsOpen={setSettingsOpen}
          handleClearConversations={handleClearConversations}
          username={userFirst + ' ' + userLast}
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
