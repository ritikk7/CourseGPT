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
    const [selectedCourse, setSelectedCourse] = useState(new CourseObject('cpsc455'));
    const [currentPrompt, setCurrentPrompt] = useState('');
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
                setSelectedCourse={setSelectedCourse}
                currentPrompt={currentPrompt}
            />
            <RightSection
                selectedCourse={selectedCourse}
                setCurrentPrompt={setCurrentPrompt}
            />
        </div>
    );
}

export default Home;
