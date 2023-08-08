import { createSelector } from '@reduxjs/toolkit';

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
/*
Example output:
{
  chatId1: {
    _id: chatId1,
    title: Chat1,
    user: userId1,
    course: courseId1,
    deleted: false,
    messages: {
      messageId1: {
        _id: messageId1,
        chat: chatId1,
        user: userId1,
        role: user,
        content: Hello,
        ...otherMessageProperties
      },
      messageId2: {
        _id: messageId2,
        chat: chatId1,
        user: userId1,
        role: system,
        content: Hi,
        ...otherMessageProperties
      }
    }
  },
  chatId2: {
    ...all chatObjectProperties
  }
}
*/
