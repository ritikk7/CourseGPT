import { createSelector } from "@reduxjs/toolkit";

const activeChatSelector = state => state.chats.activeChat
const messagesSelector = state => state.messages.messages;

export const activeChatWithMessagesSelector = createSelector(
  [activeChatSelector, messagesSelector],
  (activeChat, messages) => {
    const activeChatWithMessages = {...activeChat , messages: {}};

    for (const messageId of activeChat.messages) {
      activeChatWithMessages.messages[messageId] = { ...messages[messageId] };
    }

    return activeChatWithMessages;
  }
);
