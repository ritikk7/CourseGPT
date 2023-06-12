import React, { useEffect, useState } from "react";
import SidePanel from "../organisms/SidePanel/SidePanel";
import RightSection from "../organisms/RightSection/RightSection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../redux/authSlice";
import LoadingSpinner from "../atoms/LoadingSpinner/LoadingSpinner";
import { fetchSchools, fetchUserSchool } from "../../redux/schoolsSlice";
import { fetchChats } from "../../redux/chatsSlice";
import { fetchMessages } from "../../redux/messagesSlice";
import { fetchSchoolCourses, fetchUserFavouriteCourses } from "../../redux/coursesSlice";

function Home() {
  const authenticatedUserId = useSelector(state => state.auth.userId);
  const [isLoading, setIsLoading] = useState(true);
  const [mainPanel, setMainPanel] = useState("INFO");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAndLoadUserData = async () => {
    try {
      await dispatch(fetchUser()).then(async response => {
        if (!response.payload) {
          navigate("/login");
        } else {
          await loadUserData();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserData = async () => {
    try {
      const schoolsResponse = await dispatch(fetchSchools());
      await dispatch(fetchUserSchool());
      await dispatch(fetchUserFavouriteCourses());
      for (let schoolId of Object.keys(schoolsResponse.payload)) {
        await dispatch(fetchSchoolCourses(schoolId));
      }

      const chatsResponse = await dispatch(fetchChats());

      if(chatsResponse.payload) {
        for (let chatId of Object.keys(chatsResponse.payload)) {
          await dispatch(fetchMessages(chatId));
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authenticatedUserId) {
      setIsLoading(true);
      loginAndLoadUserData();
    }
  }, [authenticatedUserId, dispatch]);



  const userFavourites = useSelector(state => state.user.favourites);
  const userSchool = useSelector(state => state.user.school);

  useEffect(() => {
    if (userSchool) {
      dispatch(fetchSchoolCourses(userSchool));
    }
  }, [userSchool, dispatch]);
  useEffect(() => {
    if (userSchool) {
      dispatch(fetchUserFavouriteCourses());
    }
  }, [userFavourites, dispatch]);

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
