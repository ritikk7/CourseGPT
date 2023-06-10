import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import schoolCourseReducer from './schoolCourseSlice';

export default configureStore({
  reducer: {
    auth: userReducer,
    schoolCourse: schoolCourseReducer,
  },
});
