import React, {useEffect, useState} from "react";
import CourseObject from "../models/CourseObject";
import SidePanel from "../components/sidepanel/SidePanel";
import RightSection from "../components/right-section/RightSection";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUser, setUser} from "../redux/authSlice";

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

    const [selectedCourse, setSelectedCourse] = useState(
        new CourseObject('cpsc455')
    );
    const [currentPrompt, setCurrentPrompt] = useState('');
    // TODO: redux states
    const [mainPanel, setMainPanel] = useState('INFO');

    return (
        <div className="App">
            <SidePanel
                setSelectedCourse={setSelectedCourse}
                currentPrompt={currentPrompt}
                setMainPanel={setMainPanel}
            />
            <RightSection
                selectedCourse={selectedCourse}
                setCurrentPrompt={setCurrentPrompt}
                mainPanel={mainPanel}
                setMainPanel={setMainPanel}
            />
        </div>
    );
}

export default Home;
