import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { createMessageAndGetGptResponseInActiveChat } from "./messagesSlice";


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
export const fetchUserChats = createAsyncThunk(
  "chats/fetchUserChats",
  async (_, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await api.get(`/users/${userId}/chats`);
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
      const response = await api.get(`/users/${userId}/chats/${chatId}`);
      return response.data.chat;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const createChatWithSelectedDropdownCourse = createAsyncThunk(
  "chats/createChatWithSelectedDropdownCourse",
  async (_, { getState }) => {
    try {
      const courseId = getState().courses.currentlySelectedDropdownCourse._id
      const userId = getState().auth.userId;
      const response = await api.post(`/users/${userId}/chats`, { course: courseId });
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
      // Payload must be a string (chatId) or chat object
      if (typeof action.payload === 'string') {
        state.activeChat = state.userChats[action.payload];
      } else {
        state.activeChat = action.payload;
      }
    },
    setChatsError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserChats.pending, handlePending)
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.userChats = action.payload;
        handleLoading(state, false);
      })
      .addCase(fetchUserChats.rejected, handleRejected)
      .addCase(fetchChat.pending, handlePending)
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.userChats[action.payload._id] = action.payload;
        handleLoading(state, false);
      })
      .addCase(fetchChat.rejected, handleRejected)
      .addCase(createChatWithSelectedDropdownCourse.pending, handlePending)
      .addCase(createChatWithSelectedDropdownCourse.fulfilled,(state, action) => {
        state.userChats[action.payload._id] = action.payload;
        state.activeChat = action.payload
        handleLoading(state, false);
      })
      .addCase(createChatWithSelectedDropdownCourse.rejected, handleRejected)

      // messagesSlice actions
      .addCase(createMessageAndGetGptResponseInActiveChat.fulfilled, (state, action) => {
        const activeChatId = state.activeChat._id;
        state.userChats[activeChatId].messages.push(action.payload.userMessage._id);
        state.userChats[activeChatId].messages.push(action.payload.gptResponse._id);
        state.activeChat = state.userChats[activeChatId];
    })
  }
});


export const { setActiveChat, setChatsError } = chatsSlice.actions;
export default chatsSlice.reducer;


/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - https://redux.js.org/usage/deriving-data-selectors
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
