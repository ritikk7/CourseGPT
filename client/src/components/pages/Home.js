import React, { useEffect, useState } from 'react';
import SidePanel from '../organisms/SidePanel/SidePanel';
import RightSection from '../organisms/RightSection/RightSection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../redux/userSlice';
import {Spinner, Box} from "@chakra-ui/react";

function Home() {
    const user = useSelector(state => state.auth.user);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [mainPanel, setMainPanel] = useState('INFO');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            dispatch(getUser()).then(response => {
                if (!response.payload) {
                    navigate('/login');
                }
            });
        } else {
            setIsLoading(false);
        }

    }, [user, dispatch, navigate]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Box>
        );
    }

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
