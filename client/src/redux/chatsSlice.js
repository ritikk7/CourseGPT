import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

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
      throw error.response?.data?.error ? error.response.data.error : error.message;
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
      throw error.response?.data?.error ? error.response.data.error : error.message;
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
      throw error.response?.data?.error ? error.response.data.error : error.message;
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
      .addCase(fetchChats.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.userChats = action.payload;
        state.loading = false;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createChat.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.userChats[action.payload._id] = action.payload;
        state.loading = false;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchChat.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.userChats[action.payload._id] = action.payload;
        state.loading = false;
      })
      .addCase(fetchChat.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export const { setActiveChat } = chatsSlice.actions;
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
