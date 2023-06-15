import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

// State Handlers
const handleLoading = (state, loadingStatus) => {
  state.loading = loadingStatus;
  state.error = null;
};
const handlePending = (state) => {
  handleLoading(state, true);
}
const handleRejected = (state, action) => {
  state.error = action.error.message;
  state.loading = false;
};

// Helpers
const handleRequestError = (error) => {
  throw error.response?.data?.error || error.message;
};

// Async Functions
const fetchMessages = async (chatId, userId) => {
  const response = await api.get(`/users/${userId}/chats/${chatId}/messages`);
  const msgs = response.data.messages;
  const msgsById = {};
  for (let msg of msgs) {
    msgsById[msg._id] = msg;
  }
  return msgsById;
};

export const fetchChatMessages = createAsyncThunk(
  'messages/fetchChatMessages',
  async (chatId, { getState }) => {
    try {
      const userId = getState().auth.userId;
      return await fetchMessages(chatId, userId);
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const fetchActiveChatMessages = createAsyncThunk(
  'messages/fetchActiveChatMessages',
  async (_, { getState }) => {
    try {
      const chatId = getState().chats.activeChat._id;
      const userId = getState().auth.userId;
      return await fetchMessages(chatId, userId);
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const createMessageAndGetGptResponseInActiveChat = createAsyncThunk(
  'messages/createMessageAndGetGptResponseInActiveChat',
  async (message, { getState }) => {
    try {
      const newMessage = message || getState().messages.currentUserInput;
      const userId = getState().auth.userId;
      const chatId = getState().chats.activeChat?._id;
      const response = await api.post(`/users/${userId}/chats/${chatId}/messages`, { content: newMessage});
      return {
        userMessage: response.data.userMessage,
        gptResponse: response.data.gptResponse,
      };
    } catch (error) {
      handleRequestError(error);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    // The `messages` object maps each `messageId` key to a message object.
    // Example: { "messageId1": messageObject1, "messageId2": messageObject2}
    messages: {},
    currentUserInput: '',
    loading: false,
    error: null // string message
  },
  reducers: {
    setMessagesError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentUserInput: (state, action) => {
      state.currentUserInput = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, handlePending)
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.messages = { ...state.messages, ...action.payload };
        handleLoading(state, false);
      })
      .addCase(fetchChatMessages.rejected, handleRejected)
      .addCase(fetchActiveChatMessages.pending, handlePending)
      .addCase(fetchActiveChatMessages.fulfilled, (state, action) => {
        state.messages = { ...state.messages, ...action.payload };
        handleLoading(state, false);
      })
      .addCase(fetchActiveChatMessages.rejected, handleRejected)
      .addCase(createMessageAndGetGptResponseInActiveChat.pending, handlePending)
      .addCase(createMessageAndGetGptResponseInActiveChat.fulfilled, (state, action) => {
        const newMessages = {
          [action.payload.userMessage._id] : action.payload.userMessage,
          [action.payload.gptResponse._id] : action.payload.gptResponse
        }
        state.messages = { ...state.messages, ...newMessages };
        handleLoading(state, false);
      })
      .addCase(createMessageAndGetGptResponseInActiveChat.rejected, handleRejected)
  },
});

export const { setMessagesError , setCurrentUserInput} = messagesSlice.actions;
export default messagesSlice.reducer;


/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - https://redux.js.org/usage/deriving-messages-selectors
 * - Other general Redux docs
 * - ChatSection GPT
 * - Stack Overflow / Google
 */
