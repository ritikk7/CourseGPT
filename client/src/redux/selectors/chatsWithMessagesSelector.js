import { createSelector } from "@reduxjs/toolkit";

const chatsSelector = state => state.chats.chats;
const messagesSelector = state => state.messages.messages;

export const chatsWithMessagesSelector = createSelector(
  [chatsSelector, messagesSelector],
  (chats, messages) => {
    const chatsWithMessages = {};

    for (const chat of Object.values(chats)) {
      const chatWithMessages = { ...chat, messages: {} };
      for (const courseId of chat.courses) {
        chatWithMessages.messages[courseId] = { ...messages[courseId] };
      }
      chatsWithMessages[chat._id] = chatWithMessages;
    }

    return chatsWithMessages;
  }
);
