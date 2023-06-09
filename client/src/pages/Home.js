import React, { useEffect } from 'react';
import SidePanel from '../components/home/sidepanel/SidePanel';
import RightSection from '../components/home/right-section/RightSection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, setUser } from '../redux/authSlice';

function Home() {
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.user) {
      dispatch(getUser()).then(response => {
        if (response.payload) {
          dispatch(setUser(response.payload));
        } else {
          navigate('/login');
        }
      });
    }
  }, [authState, dispatch, navigate]);

  return (
    <div className="App">
      <SidePanel />
      <RightSection />
    </div>
  );
}

export default Home;
