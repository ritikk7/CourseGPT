import React, { useEffect, useState } from "react";
import SidePanel from "../organisms/SidePanel/SidePanel";
import RightSection from "../organisms/RightSection/RightSection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../redux/authSlice";
import LoadingSpinner from "../atoms/LoadingSpinner/LoadingSpinner";
import { fetchAllSchools, fetchSchools, fetchUserSchool } from "../../redux/schoolsSlice";
import { fetchUserChats } from "../../redux/chatsSlice";
import { fetchChatMessages } from "../../redux/messagesSlice";
import { fetchAllCourses, fetchSchoolCourses, fetchUserFavouriteCourses } from "../../redux/coursesSlice";

function Home() {
  const authenticatedUserId = useSelector(state => state.auth.userId);
  const [isLoading, setIsLoading] = useState(true);
  const [mainPanel, setMainPanel] = useState("INFO");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatedUserId) {
      setIsLoading(true);
      loginAndLoadUserData();
    } else {
      loadSchoolData();
    }
  }, [authenticatedUserId, dispatch]);

  const loginAndLoadUserData = async () => {
    try {
      await dispatch(fetchUser()).then(async response => {
        if (!response.payload) {
          navigate("/login");
        } else {
          await loadSchoolData();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadSchoolData = async () => {
    try {
      await dispatch(fetchAllSchools);
      await dispatch(fetchAllCourses);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="App">
      <SidePanel
        setMainPanel={setMainPanel}
      />
      <RightSection
        mainPanel={mainPanel}
        setMainPanel={setMainPanel}
      />
    </div>
  );
}

export default Home;
