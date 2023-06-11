import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (chatId, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await api.get(`/api/users/${userId}/chats/${chatId}/messages`);
      return response.data.messages;
    } catch (error) {
      throw error.response?.data?.error ? error.response.data.error : error.message;
    }
  }
);

export const createMessageInActiveChat = createAsyncThunk(
  'messages/createMessageInActiveChat',
  async (newMessage, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const chatId = getState().chat.activeChat?._id;
      const response = await api.post(`/api/users/${userId}/chatIds/${chatId}/messages`, { content: newMessage});
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
    // The `data` object maps `chatId` keys to arrays of messages.
    // Example: { "chatId1": [messageObject1, messageObject2], "chatId2": [messageObject3, messageObject4] }
    data: null,
    loading: false,
    error: null // string message
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        if(state.data === null) state.data = {};
        const chatId = action.payload[0]?.chat;
        if (chatId) state.data[chatId] = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMessageInActiveChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessageInActiveChat.fulfilled, (state, action) => {
        state.loading = false;
        if(state.data === null) state.data = {};
        const chatId = action.payload.userMessage.chat;
        if(state.data[chatId] === null) state.data[chatId] = [];
        state.data[chatId].push(action.payload.userMessage);
        state.data[chatId].push(action.payload.gptResponse);
      })
      .addCase(createMessageInActiveChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
