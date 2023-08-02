import { createSelector } from '@reduxjs/toolkit';

const userError = state => state.user.error;
const chatsError = state => state.chats.error;
const coursesError = state => state.courses.error;
const feedbackDataError = state => state.feedbackData.error;
const messagesError = state => state.messages.error;
const schoolsError = state => state.schools.error;

export const errorSelector = createSelector(
  [
    userError,
    chatsError,
    coursesError,
    feedbackDataError,
    messagesError,
    schoolsError,
  ],
  (
    userError,
    chatsError,
    coursesError,
    feedbackDataError,
    messagesError,
    schoolsError
  ) => {
    return (
      userError ||
      chatsError ||
      coursesError ||
      feedbackDataError ||
      messagesError ||
      schoolsError
    );
  }
);
