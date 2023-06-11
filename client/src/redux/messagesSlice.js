import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

// Async thunks
export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (_, { getState }) => {
  const { _id: userId } = getState().auth.user;
  const { chatIds } = getState().chat;
  const response = await api.get(`/api/users/${userId}/chatIds/${chatIds}/messages`);
  return response.data;
});

export const createMessage = createAsyncThunk('messages/createMessage', async (_, { getState }) => {
  const { _id: userId } = getState().auth.user;
  const { chatIds } = getState().chat;
  const response = await api.post(`/api/users/${userId}/chatIds/${chatIds}/messages`);
  return response.data;
});

// Slice
const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default messagesSlice.reducer;
