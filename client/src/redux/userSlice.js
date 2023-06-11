import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { loginUser, registerUser, fetchUser, logoutUser } from "./authSlice";

const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, { getState }) => {
    const user = getState().auth.user;
    if (user) {
      const response = await api.put(`/users/${user._id}`, payload);
      return response.data;
    }
    throw new Error("User not logged in");
  }
);

const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { getState }) => {
    const user = getState().auth.user;
    if (user) {
      const response = await api.delete(`/users/${user._id}`);
      return response.data;
    }
    throw new Error("User not logged in");
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
        // Here we update the user state when a user logs in
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
      });
  }
});

export { updateUser, deleteUser };
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
