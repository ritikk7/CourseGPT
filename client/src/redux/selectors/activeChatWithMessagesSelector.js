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

/*
Example output:
{
  _id: activeChatId,
  title: HelloHi,
  user: userId1,
  course: courseId1,
  messages: {
    messageId1: {
      _id: messageId1,
      chat: activeChatId,
      user: userId1,
      senderType: User,
      content: "Hello",
      ...otherMessageProperties
    },
    messageId2: {
      _id: messageId2,
      chat: activeChatId,
      user: userId2,
      senderType: CourseGPT,
      content: "Hi",
      ...otherMessageProperties
    }
  }
}
*/
