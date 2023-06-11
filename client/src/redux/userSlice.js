import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { loginUser, registerUser, fetchUser, logoutUser } from "./authSlice";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, { getState }) => {
    try {
      const userId = getState().auth.user?._id;
      const response = await api.put(`/users/${userId}`, payload);
      return response.data.user;
    } catch (error) {
      throw error.response?.data?.error ? error.response.data.error : error.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { getState }) => {
    try {
      const userId = getState().auth.user?._id;
      const response = await api.delete(`/users/${userId}`);
      return response.data.user;
    } catch (error) {
      throw error.response?.data?.error ? error.response.data.error : error.message;
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    profilePicture: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    chats: [], // ids
    school: null, // ids
    favourites: [], // ids

    loading: false,
    error: null
  },
  reducers: {
    clearUser: state => {
      state.profilePicture = "";
      state.firstName = "";
      state.lastName = "";
      state.dateOfBirth = null;
      state.chats = [];
      state.school = null;
      state.favourites = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.profilePicture = action.payload.profilePicture || state.profilePicture;
        state.firstName = action.payload.firstName || state.firstName;
        state.lastName = action.payload.lastName || state.lastName;
        state.dateOfBirth = action.payload.dateOfBirth || state.dateOfBirth;
        state.chats = action.payload.chats || state.chats;
        state.school = action.payload.school || state.school;
        state.favourites = action.payload.favourites || state.favourites;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.profilePicture = action.payload.profilePicture;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.dateOfBirth = action.payload.dateOfBirth;
        state.chats = action.payload.chats;
        state.school = action.payload.school;
        state.favourites = action.payload.favourites;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.profilePicture = action.payload.profilePicture;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.dateOfBirth = action.payload.dateOfBirth;
        state.chats = action.payload.chats;
        state.school = action.payload.school;
        state.favourites = action.payload.favourites;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.profilePicture = action.payload.profilePicture;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.dateOfBirth = action.payload.dateOfBirth;
        state.chats = action.payload.chats;
        state.school = action.payload.school;
        state.favourites = action.payload.favourites;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.profilePicture = "";
        state.firstName = "";
        state.lastName = "";
        state.dateOfBirth = null;
        state.chats = [];
        state.school = null;
        state.favourites = [];
      })
  }
});

export const { clearUser } = userSlice.actions;
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
