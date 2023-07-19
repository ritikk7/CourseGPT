import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/authSlice';
import FeedbackData from '../organisms/temp/mainData';
import { Button } from '@chakra-ui/react';

function FeedbackPage({ setSeeFeedback }) {
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
    <>
      <Button
        onClick={() => {
          setSeeFeedback(false);
        }}
      >
        Back
      </Button>
      <FeedbackData />
    </>
  );
}

export default FeedbackPage;
