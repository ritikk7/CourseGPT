import React, { useEffect, useState } from 'react';
import SidePanel from '../components/SidePanel/SidePanel';
import RightSection from '../components/RightSection/RightSection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, setUser } from '../redux/authSlice';


function Home() {
  const authState = useSelector(state => state.auth);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [mainPanel, setMainPanel] = useState('INFO');
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
            <SidePanel
                currentPrompt={currentPrompt}
                setMainPanel={setMainPanel}
            />
            <RightSection
                setCurrentPrompt={setCurrentPrompt}
                mainPanel={mainPanel}
                setMainPanel={setMainPanel}
            />
        </div>
    );
}

export default Home;
