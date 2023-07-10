import React, { useEffect, useState } from 'react';
import SidePanel from '../organisms/SidePanel/SidePanel';
import RightSection from '../organisms/RightSection/RightSection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/authSlice';
import FeedbackData from '../organisms/temp/temp';

function FeedbackPage() {
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

  return <FeedbackData />;
}

export default FeedbackPage;
