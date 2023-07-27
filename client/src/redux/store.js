import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import schoolsReducer from './schoolsSlice';
import coursesReducer from './coursesSlice';
import chatsReducer from './chatsSlice';
import messagesReducer from './messagesSlice';
import authReducer from './authSlice';
import feedbackDataReducer from './feedbackDataSlice';
import analyticsReducer from './analyticsSlice';
import uiReducer from './uiSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    schools: schoolsReducer,
    courses: coursesReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    auth: authReducer,
    feedbackData: feedbackDataReducer,
    analytics: analyticsReducer,
    ui: uiReducer,
  },
});
