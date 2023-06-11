import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { loginUser, registerUser, fetchUser, logoutUser } from "./authSlice";
import { createChat, fetchChats } from "./chatsSlice";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updates, { getState }) => {
    try {
      // updates must use same interface as schema
      // Example: updating user favourites, updates = {favourites: [favouriteId1, favouriteId2, favouriteId3]}
      // Example2: updating user first and last name, updates = {firstName: "John", lastName: "Doe"}
      const userId = getState().auth.userId;
      const response = await api.put(`/users/${userId}`, updates);
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
      const userId = getState().auth.userId;
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
    profilePicture: null, // string
    firstName: null, // string
    lastName: null, // string
    dateOfBirth: null, // string
    chats: null, // array of string id's
    school: null, // string id
    favourites: null, // array of string id's

    loading: false,
    error: null // string message
  },
  reducers: {
    clearUser: state => {
      state.profilePicture = null;
      state.firstName = null;
      state.lastName = null;
      state.dateOfBirth = null;
      state.chats = null;
      state.school = null;
      state.favourites = null;
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
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.profilePicture = null;
        state.firstName = null;
        state.lastName = null;
        state.dateOfBirth = null;
        state.chats = null;
        state.school = null;
        state.favourites = null;
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
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.profilePicture = null;
        state.firstName = null;
        state.lastName = null;
        state.dateOfBirth = null;
        state.chats = null;
        state.school = null;
        state.favourites = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats = [...state.chats, action.payload._id];
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats = Object.keys(action.payload);
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats = [...state.chats, action.payload._id];
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
