import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { loginUser, registerUser, fetchUser, logoutUser } from "./authSlice";
import { createChat, fetchChats } from "./chatsSlice";

// Helpers
const updateUserData = (state, action) => {
  Object.keys(state).forEach((key) => {
    if (key in action.payload) {
      state[key] = action.payload[key];
    }
  });
  handleLoading(state, false);
};

const clearUserData = (state) => {
  handleLoading(state, false);
  ['profilePicture', 'firstName', 'lastName', 'email', 'dateOfBirth', 'chats', 'school', 'favourites', 'type'].forEach(field => {
    state[field] = null;
  });
};

const handleLoading = (state, loadingStatus) => {
  state.loading = loadingStatus;
  state.error = null;
};
const handlePending = state => handleLoading(state, true);

const handleRejected = (state, action) => {
  state.error = action.error.message;
  state.loading = false;
};
const handleRequestError = (error) => {
  throw error.response?.data?.error ? error.response.data.error : error.message;
};

// Async
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updates, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await api.patch(`/users/${userId}`, updates);
      return response.data.user;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await api.delete(`/users/${userId}`);
      return response.data.user;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profilePicture: null,
    firstName: null,
    lastName: null,
    email: null,
    dateOfBirth: null,
    chats: [],
    school: null,
    favourites: [],
    type: null,
    loading: false,
    error: null
  },
  reducers: {
    clearUser: clearUserData,
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(updateUser.fulfilled, updateUserData)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(updateUser.pending, handlePending)
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, clearUserData)
      .addCase(deleteUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, updateUserData)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, updateUserData)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, updateUserData)
      .addCase(fetchUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, clearUserData)
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats.push(action.payload._id);
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats.push(action.payload._id);
      });
  }
});


export const { clearUser, setError } = userSlice.actions;
export default userSlice.reducer;

/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
