import React, {useState} from "react";
import CourseObject from "../models/CourseObject";
import SidePanel from "../components/sidepanel/SidePanel";
import RightSection from "../components/right-section/RightSection";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

function Home() {
    const authState = useSelector(state => state.auth);
    const [selectedCourse, setSelectedCourse] = useState(new CourseObject('cpsc455'));
    const [currentPrompt, setCurrentPrompt] = useState('');

    if (!authState.user) {
        return <Navigate to="/login" replace />;
    }

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
