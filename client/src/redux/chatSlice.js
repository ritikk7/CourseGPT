import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    activeChatId: null,
    activeNewChatDropdownCourseId: null
  },
  reducers: {
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
    },
    setActiveNewChatDropdownCourseId: (state, action) => {
      state.activeNewChatDropdownCourseId = action.payload;
    },
  },
  extraReducers: builder => {
  }
});

export {  };
export const { setActiveNewChatDropdownCourseId, setActiveChatId } = chatSlice.actions;
export default chatSlice.reducer;
