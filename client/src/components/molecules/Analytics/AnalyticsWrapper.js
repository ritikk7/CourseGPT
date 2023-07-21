import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../../redux/authSlice';
import FeedbackData from '../../organisms/temp/mainData';
import styles from './AnalyticsWrapper.module.css';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import BubbleChart from '../BubbleChart/BubbleChart';
import BarChart from '../BarChart/BarChart';
import ScatterChart from '../ScatterChart/ScatterChart';
import WordCloud from '../WordCloud/WordCloud';

function AnalyticsWrapper({
  toggleSidePanelVisibility,
  isSidepanelVisible,
  selectedAnalyticsView,
}) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rerenderBubble, setRerenderBubble] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      loginAndLoadUserData();
    }
  }, [isAuthenticated, dispatch]);

  const loginAndLoadUserData = async () => {
    try {
      await dispatch(fetchUser());
      if (isAuthenticated || user.type !== 'Developer') {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedAnalyticsView === 'bubble') {
      setRerenderBubble(<BubbleChart />);
    } else setRerenderBubble(null);
  }, [selectedAnalyticsView]);

  const renderView = () => {
    switch (selectedAnalyticsView) {
      case 'bubble':
        return rerenderBubble;
      case 'bar':
        return <BarChart />;
      case 'scatter':
        return <ScatterChart />;
      case 'word':
        return <WordCloud isSidepanelVisible={isSidepanelVisible} />;
      default:
        return (
          <FeedbackData toggleSidePanelVisibility={toggleSidePanelVisibility} />
        );
    }
  };

  return (
    <div
      className={styles.container}
      style={
        isSidepanelVisible
          ? { transition: '0.5s' }
          : { width: '100%', transition: '0.5s' }
      }
    >
      {!isSidepanelVisible && (
        <Button
          ml={2}
          bg="transparent"
          _hover={{ bg: '#50505c' }}
          border="1px solid white"
          onClick={toggleSidePanelVisibility}
          position="absolute"
          top={4}
          left={4}
        >
          <ChevronRightIcon />
        </Button>
      )}

      {renderView()}
    </div>
  );
}

export default AnalyticsWrapper;
