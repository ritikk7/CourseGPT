import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (chatId, { getState }) => {
    try {
      const userId = getState().auth.user?._id;
      const response = await api.get(`/api/users/${userId}/chats/${chatId}/messages`);
      return response.data.messages;
    } catch (error) {
      throw error.response?.data?.error ? error.response.data.error : error.message;
    }
  }
);

export const createMessageInActiveChat = createAsyncThunk(
  'messages/createMessageInActiveChat',
  async (_, { getState }) => {
    try {
      const userId = getState().auth.user?._id;
      const chatId = getState().chat.activeChat?._id;
      const response = await api.post(`/api/users/${userId}/chatIds/${chatId}/messages`);
      return {
        userMessage: response.data.userMessage,
        gptResponse: response.data.gptResponse,
      };
    } catch (error) {
      throw error.response?.data?.error ? error.response.data.error : error.message;
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    // The `state` object maps `chatId` keys to arrays of messages.
    // Example: { "chatId1": [messageObject1, messageObject2], "chatId2": [messageObject3, messageObject4] }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const chatId= action.payload[0]?.chat;
        if(chatId) state[chatId] = action.payload;
      })
      .addCase(createMessageInActiveChat.fulfilled, (state, action) => {
        const chatId = action.payload.userMessage.chat;
        state[chatId].push(action.payload.userMessage);
        state[chatId].push(action.payload.gptResponse);
      });
  },
});

export default messagesSlice.reducer;


/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
