import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import schoolCourseReducer from './schoolCourseSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    schoolCourse: schoolCourseReducer,
  },
});
