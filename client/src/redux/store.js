import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import schoolsReducer from './schoolsSlice';
import coursesReducer from './coursesSlice';
import chatsReducer from './chatsSlice';
import messagesReducer from './messagesSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    schools: schoolsReducer,
    courses: coursesReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    auth: authReducer,
  },
});
