import { createSelector } from "@reduxjs/toolkit";

const activeChatSelector = state => state.chats.activeChat
const messagesSelector = state => state.messages.messages;

export const activeChatWithMessagesSelector = createSelector(
  [activeChatSelector, messagesSelector],
  (activeChat, messages) => {
    const activeChatWithMessages = {...activeChat , messages: {}};

    for (const message of activeChat.messages) {
      activeChatWithMessages.messages[message._id] = messages[message._id];
    }

    return activeChatWithMessages;
  }
);
