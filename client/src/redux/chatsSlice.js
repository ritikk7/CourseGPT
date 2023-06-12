import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";


// Helpers

const handleLoading = (state, loadingStatus) => {
  state.loading = loadingStatus;
  state.error = null;
};
const handlePending = (state) => handleLoading(state, true);
const handleFulfilled = (state, action) => {
  state.userChats[action.payload._id] = action.payload;
  handleLoading(state, false);
};
const handleRejected = (state, action) => {
  state.error = action.error.message;
  state.loading = false;
};
const handleRequestError = (error) => {
  throw error.response?.data?.error ? error.response.data.error : error.message;
};

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (_, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await api.get(`/api/users/${userId}/chats`);
      const chats = response.data.chats;
      const chatsById = {};
      for (let chat of chats) {
        chatsById[chat._id] = chat;
      }
      return chatsById;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const fetchChat = createAsyncThunk(
  "chats/fetchChat",
  async (chatId, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await api.get(`/api/users/${userId}/chats/${chatId}`);
      return response.data.chat;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const createChat = createAsyncThunk(
  "chats/createChat",
  async (courseId, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await api.post(`/api/users/${userId}/chats`, { course: courseId });
      return response.data.chat;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    // The `userChats` object maps `chatId` keys to a chat object.
    // Example: { "chatId1": chatObject1, "chatId2": chatObject2, }
    userChats: {},
    activeChat: null, // chat object
    loading: false,
    error: null // string message
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, handlePending)
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.userChats = action.payload;
        handleLoading(state, false);
      })
      .addCase(fetchChats.rejected, handleRejected)
      .addCase(fetchChat.pending, handlePending)
      .addCase(fetchChat.fulfilled, handleFulfilled)
      .addCase(fetchChat.rejected, handleRejected)
      .addCase(createChat.pending, handlePending)
      .addCase(createChat.fulfilled, handleFulfilled)
      .addCase(createChat.rejected, handleRejected);
  }
});


export const { setActiveChat, setError } = chatsSlice.actions;
export default chatsSlice.reducer;

/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
