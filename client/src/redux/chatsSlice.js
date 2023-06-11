import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

export const fetchChats = createAsyncThunk('chats/fetchChats', async (_, { getState }) => {
  const { _id: userId } = getState().auth.user;
  const response = await api.get(`/api/users/${userId}/chatIds`);
  return response.data;
});

export const createChat = createAsyncThunk('chats/createChat', async (_, { getState }) => {
  const { _id: userId } = getState().auth.user;
  const response = await api.post(`/api/users/${userId}/chatIds`);
  return response.data;
});

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    userChats: {},
    activeChat: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (state, action) => {
        state = action.payload;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state[action.payload._id] = action.payload;
      });
  },
});

export default chatsSlice.reducer;
