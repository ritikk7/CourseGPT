import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../../redux/authSlice';
import { Button, Tooltip, Spinner } from '@chakra-ui/react';
import styles from './AnalyticsWrapper.module.css';
import { ChevronRightIcon } from '@chakra-ui/icons';
import BubbleChart from '../BubbleChart/BubbleChart';
import BarChart from '../BarChart/BarChart';
import ScatterChart from '../ScatterChart/ScatterChart';
import WordCloud from '../WordCloud/WordCloud';
import { setIsSidePanelVisible } from '../../../redux/uiSlice';
import { setUserError } from '../../../redux/userSlice';

function AnalyticsWrapper() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedAnalyticsView = useSelector(
    state => state.analytics.selectedAnalyticsView
  );
  const isSidePanelVisible = useSelector(state => state.ui.isSidePanelVisible);
  const isLoadingFeedbackData = useSelector(
    state => state.feedbackData.loading
  );

  const loginAndLoadUserData = async () => {
    try {
      await dispatch(fetchUser());
      if (isAuthenticated || user.type !== 'Developer') {
        navigate('/');
      }
    } catch (error) {
      dispatch(setUserError(error));
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      loginAndLoadUserData();
    }
  }, [isAuthenticated, dispatch]);

  const renderView = () => {
    switch (selectedAnalyticsView) {
      case 'bubble':
        return <BubbleChart />;
      case 'bar':
        return <BarChart />;
      case 'scatter':
        return <ScatterChart />;
      case 'word':
        return <WordCloud />;
      default:
        return <BubbleChart />;
    }
  };

  const renderContent = () => {
    if (!isLoadingFeedbackData) {
      return (
        <>
          {!isSidePanelVisible && (
            <Button
              ml={2}
              bg="gray"
              _hover={{ bg: '#50505c' }}
              border="1px solid white"
              onClick={() => {
                dispatch(setIsSidePanelVisible(true));
              }}
              position="absolute"
              top={4}
              left={4}
            >
              <ChevronRightIcon />
            </Button>
          )}

          {renderView()}
        </>
      );
    }
    return (
      <Tooltip
        label="Currently loading feedback data"
        fontSize="lg"
        placement="top"
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <Spinner color="blue.500" speed="0.90s" size="lg" />
        </div>
      </Tooltip>
    );
  };

  return (
    <div
      className={styles.container}
      style={
        isSidePanelVisible
          ? { transition: '0.5s' }
          : { width: '100%', transition: '0.5s' }
      }
    >
      {renderContent()}
    </div>
  );
}

export default AnalyticsWrapper;
