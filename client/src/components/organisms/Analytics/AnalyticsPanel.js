import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../../redux/authSlice';
import FeedbackData from '../temp/mainData';
import styles from './AnalyticsPanel.module.css';

function AnalyticsPanel({ toggleSidePanelVisibility, isSidepanelVisible }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div
      className={styles.container}
      style={
        isSidepanelVisible
          ? { transition: '0.5s' }
          : { width: '100%', transition: '0.5s' }
      }
    >
      <FeedbackData toggleSidePanelVisibility={toggleSidePanelVisibility} />
    </div>
  );
}

export default AnalyticsPanel;
