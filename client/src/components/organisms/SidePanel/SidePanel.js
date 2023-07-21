import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './SidePanel.module.css';
import ProfileModal from '../ProfileModal/ProfileModal';
import { setCurrentlySelectedDropdownCourse } from '../../../redux/coursesSlice';
import { userFavouriteCoursesSelector } from '../../../redux/selectors/userFavouriteCoursesSelector';
import {
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
  updateUser,
} from '../../../redux/userSlice';
import { logoutUser } from '../../../redux/authSlice';
import SidePanelUserMenu from '../../molecules/SidePanelUserMenu/SidePanelUserMenu';
import CreateNewChatSection from '../../molecules/CreateNewChatSection/CreateNewChatSection';
import ExistingChat from '../../molecules/ExistingChat/ExistingChat';
import { fetchActiveChatMessages } from '../../../redux/messagesSlice';
import TrainCourseModal from '../TrainCourseModal/TrainCourseModal';
import { Button } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

const SidePanel = ({
  toggleSidePanelVisibility,
  isSidepanelVisible,
  setIsSidepanelVisible,
  setSeeFeedback,
  isAnalyticsSidePanel,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isGptLoading = useSelector(state => state.messages.gptLoading);
  const userFirst = useSelector(state => state.user.firstName);
  const userLast = useSelector(state => state.user.lastName);
  const favouriteCourses = useSelector(userFavouriteCoursesSelector);
  const selectedCourse = useSelector(
    state => state.courses.currentlySelectedDropdownCourse
  );
  const [disableNewChatButton, setDisableNewChatButton] = useState(
    !!!selectedCourse && !isGptLoading
  );
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isTrainCourseModalOpen, setTrainCourseModalOpen] = useState(false);
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
      dispatch(updateUser({ selectedCourse: null }));
      setFilteredChatsToShow([]);
      setDisableNewChatButton(true);
    } else {
      const newCourse = favouriteCourses[newCourseId];
      dispatch(setCurrentlySelectedDropdownCourse(newCourse));
      dispatch(updateUser({ selectedCourse: newCourseId }));
      setDisableNewChatButton(isGptLoading);
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
    await dispatch(softDeleteSingleChat(id));
    await dispatch(setActivePanelInfo());
    await dispatch(setActiveChat(null));
    await dispatch(setFocusedChat(null));
    dispatch(setShouldFocusChatInput(true));
    dispatch(setWaitingFirstMessage(true));
  };

  const handleClearConversations = () => {
    dispatch(softDeleteSelectedDropdownCourseChats());
    dispatch(setActivePanelInfo());
    dispatch(setActiveChat(null));
    dispatch(setFocusedChat(null));
    dispatch(setShouldFocusChatInput(true));
    dispatch(setWaitingFirstMessage(true));
  };

  useEffect(() => {
    setDisableNewChatButton(isGptLoading);
  }, [isGptLoading]);

  useEffect(() => {
    if (selectedCourse === null) {
      setDefaultDropdownValue('');
    }
    if (selectedCourse) {
      setDefaultDropdownValue(selectedCourse._id);
    }
  }, [selectedCourse, favouriteCourses]);

  let chats = Object.values(filteredChatsToShow);

  if (isAnalyticsSidePanel) {
    return (
      <div
        className={styles.sidepanel}
        style={
          isSidepanelVisible
            ? { transition: '0.4s', transitionTimingFunction: 'ease-in-out' }
            : {
                transform: 'translateX(-100%)',
                transition: '0.4s',
                transitionTimingFunction: 'ease-in-out',
              }
        }
      >
        <Button
          ml={2}
          bg="transparent"
          _hover={{ bg: '#39393c' }}
          border="1px solid rgb(100, 100, 102)"
          onClick={toggleSidePanelVisibility}
        >
          <ChevronLeftIcon />
        </Button>
        <div className={styles.profile}>
          <SidePanelUserMenu
            handleLogout={handleLogout}
            setSettingsOpen={setSettingsOpen}
            username={userFirst + ' ' + userLast}
            setSeeFeedback={setSeeFeedback}
            isAnalyticsMode={isAnalyticsSidePanel}
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
  }

  return (
    <div
      className={styles.sidepanel}
      style={
        isSidepanelVisible
          ? { transition: '0.4s', transitionTimingFunction: 'ease-in-out' }
          : {
              transform: 'translateX(-100%)',
              transition: '0.4s',
              transitionTimingFunction: 'ease-in-out',
            }
      }
    >
      <div className={styles.courseSelect}>
        <CreateNewChatSection
          favouriteCourses={favouriteCourses}
          handleCourseChange={handleCourseChange}
          defaultDropdownValue={defaultDropdownValue}
          handleNewChat={handleNewChat}
          disableNewChatButton={disableNewChatButton}
          disabledNewChatCourseSelector={isGptLoading}
          toggleSidePanelVisibility={toggleSidePanelVisibility}
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
                  setIsSidepanelVisible={setIsSidepanelVisible}
                />
              ))}
        </div>
      </div>
      <div className={styles.profile}>
        <SidePanelUserMenu
          handleLogout={handleLogout}
          setSettingsOpen={setSettingsOpen}
          handleClearConversations={handleClearConversations}
          setTrainCourseModalOpen={setTrainCourseModalOpen}
          username={userFirst + ' ' + userLast}
          setSeeFeedback={setSeeFeedback}
        />
        {isSettingsOpen && (
          <ProfileModal
            isOpen={isSettingsOpen}
            handleClose={() => setSettingsOpen(false)}
          />
        )}
        <TrainCourseModal
          isOpen={isTrainCourseModalOpen}
          handleClose={() => setTrainCourseModalOpen(false)}
          selectedCourseName={selectedCourse?.courseCode}
        />
      </div>
    </div>
  );
};

export default SidePanel;
