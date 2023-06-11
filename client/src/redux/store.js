import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import schoolsReducer from './schoolsSlice';
import coursesReducer from './coursesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    schools: schoolsReducer,
    courses: coursesReducer,
  },
});
