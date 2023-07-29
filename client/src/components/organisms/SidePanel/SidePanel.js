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
import { setSelectedAnalyticsView } from '../../../redux/analyticsSlice';
import { logoutUser } from '../../../redux/authSlice';
import SidePanelUserMenu from '../../molecules/SidePanelUserMenu/SidePanelUserMenu';
import CreateNewChatSection from '../../molecules/CreateNewChatSection/CreateNewChatSection';
import ExistingChat from '../../molecules/ExistingChat/ExistingChat';
import { fetchActiveChatMessages } from '../../../redux/messagesSlice';
import TrainCourseModal from '../TrainCourseModal/TrainCourseModal';
import { Box, Button, useMediaQuery, useTheme } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  BubbleChart,
  BarChart,
  ScatterPlot,
  Assessment,
  Abc,
} from '@mui/icons-material';
import { setIsSidePanelVisible } from '../../../redux/uiSlice';

const SidePanel = ({ setSeeFeedback, isAnalyticsSidePanel }) => {
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
  const isSidePanelVisible = useSelector(state => state.ui.isSidePanelVisible);

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
  const [isDesktop] = useMediaQuery('(max-width: 680px)');
  const width = isDesktop ? '100%' : '18%';
  const theme = useTheme();

  if (isAnalyticsSidePanel) {
    return (
      <div
        className={styles.sidepanel}
        bg={theme.colors.sidePanel.background}
        style={
          isSidePanelVisible
            ? { transition: '0.4s', transitionTimingFunction: 'ease-in-out' }
            : {
                transform: 'translateX(-100%)',
                transition: '0.4s',
                transitionTimingFunction: 'ease-in-out',
              }
        }
      >
        <div className={styles.chevronLeft}>
          <Button
            ml={2}
            mt={2}
            bg="transparent"
            width="50px"
            position="absolute"
            right={2}
            _hover={{ bg: '#39393c' }}
            border="1px solid rgb(100, 100, 102)"
            onClick={() => dispatch(setIsSidePanelVisible(false))}
          >
            <ChevronLeftIcon />
          </Button>
        </div>
        <div className={styles.selectDataView}>
          <Button
            onClick={() => {
              dispatch(setSelectedAnalyticsView('feedback'));
            }}
            bg="transparent"
            color="black"
            _hover={{ bg: '#39393c', color: 'white' }}
            leftIcon={<Assessment />}
          >
            Feedback
          </Button>
          <Button
            onClick={() => {
              dispatch(setSelectedAnalyticsView('bubble'));
            }}
            bg="transparent"
            color="black"
            _hover={{ bg: '#39393c', color: 'white' }}
            leftIcon={<BubbleChart />}
          >
            Bubble Chart
          </Button>
          <Button
            onClick={() => {
              dispatch(setSelectedAnalyticsView('bar'));
            }}
            bg="transparent"
            color="black"
            _hover={{ bg: '#39393c', color: 'white' }}
            leftIcon={<BarChart />}
          >
            Bar Chart
          </Button>
          <Button
            onClick={() => {
              dispatch(setSelectedAnalyticsView('scatter'));
            }}
            bg="transparent"
            color="black"
            _hover={{ bg: '#39393c', color: 'white' }}
            leftIcon={<ScatterPlot />}
          >
            Scatter
          </Button>
          <Button
            onClick={() => {
              dispatch(setSelectedAnalyticsView('word'));
            }}
            bg="transparent"
            color="black"
            _hover={{ bg: '#39393c', color: 'white' }}
            leftIcon={<Abc />}
          >
            Word Cloud
          </Button>
        </div>
        <div className={styles.profileAnalytics}>
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
  } else {
    return (
      <Box
        bg={theme.colors.sidePanel.background}
        w={width}
        minW="250px"
        pos="absolute"
        left="0"
        top="0"
        h="100%"
        display="flex"
        flexDirection="column"
        transition="0.4s"
        transitionTimingFunction="ease-in-out"
        transform={isSidePanelVisible ? 'none' : 'translateX(-100%)'}
      >
        <Box w="90%" m="auto" mt="16px">
          <CreateNewChatSection
            favouriteCourses={favouriteCourses}
            handleCourseChange={handleCourseChange}
            defaultDropdownValue={defaultDropdownValue}
            handleNewChat={handleNewChat}
            disableNewChatButton={disableNewChatButton}
            disabledNewChatCourseSelector={isGptLoading}
          />
          <Box className={styles.chatsPanel}>
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
          </Box>
        </Box>
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
      </Box>
    );
  }
};

export default SidePanel;
