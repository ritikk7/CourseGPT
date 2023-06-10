import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import schoolCourseReducer from './schoolsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    schoolCourse: schoolCourseReducer,
  },
});
