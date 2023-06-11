import React, { useEffect, useState } from 'react';
import SidePanel from '../organisms/SidePanel/SidePanel';
import RightSection from '../organisms/RightSection/RightSection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/userSlice';
import {Spinner, Box} from "@chakra-ui/react";
import LoadingSpinner from "../atoms/LoadingSpinner/LoadingSpinner";

function Home() {
    const user = useSelector(state => state.user.data);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [mainPanel, setMainPanel] = useState('INFO');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            dispatch(fetchUser()).then(response => {
                if (!response.payload) {
                    navigate('/login');
                } else {
                    setIsLoading(false);
                }
            });
        } else {
            setIsLoading(false);
        }
    }, [user, dispatch, navigate]);

    if (isLoading) return <LoadingSpinner/>;

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
