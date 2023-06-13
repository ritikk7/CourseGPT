import React, { useEffect, useState } from "react";
import SidePanel from "../organisms/SidePanel/SidePanel";
import RightSection from "../organisms/RightSection/RightSection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../redux/authSlice";
import LoadingSpinner from "../atoms/LoadingSpinner/LoadingSpinner";
import { fetchAllSchools, } from "../../redux/schoolsSlice";
import { fetchAllCourses, } from "../../redux/coursesSlice";
import { fetchUserChats } from "../../redux/chatsSlice";

function Home() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      loginAndLoadUserData();
    } else {
      loadData();
    }
  }, [isAuthenticated, dispatch]);

  const loginAndLoadUserData = async () => {
    try {
      await dispatch(fetchUser()).then(async response => {
        if (!isAuthenticated) {
          navigate("/login");
        } else {
          await loadData();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    try {
      await dispatch(fetchAllSchools);
      await dispatch(fetchAllCourses);
      await dispatch(fetchUserChats);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthenticated) return <LoadingSpinner />;

  return (
    <div className="App">
      <SidePanel/>
      <RightSection/>
    </div>
  );
}

export default Home;
