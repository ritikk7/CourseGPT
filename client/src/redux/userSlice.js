import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { loginUser, registerUser, fetchUser, logoutUser } from "./authSlice";
import { createChatWithSelectedDropdownCourse } from "./chatsSlice";

// State Handlers
const updateUserData = (state, action) => {
  const userFields =
    ['profilePicture',
      'firstName',
      'lastName',
      'email',
      'dateOfBirth',
      'chats',
      'school',
      'favourites',
      'type'];
  for(const field of userFields) {
    state[field] = action.payload[field] || null;
  }
  handleLoading(state, false);
};

const clearUserData = (state) => {
  updateUserData(state, {payload: {}});
};

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
const createUserRequest = (name, requestType, path) => {
  return createAsyncThunk(`user/${name}`, async (payload = null, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await api[requestType](`${path}/${userId}`, payload);
      return response.data.user;
    } catch (error) {
      handleRequestError(error);
    }
  });
};

export const updateUser = createUserRequest(
  "updateUser",
  "patch",
  "/users"
  // payload = {all target user fields to update according to the exact user schema}
  // Example: {firstName: "John", lastName: "Doe", email: "efpyi@example.com"}
);

export const deleteUser = createUserRequest(
  "deleteUser",
  "delete",
  "/users"
  // payload = null
);

// User Slice
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
    error: null, // string message

    activePanel: "INFO" // "CHAT", "INFO"
  },
  reducers: {
    clearUser: (state) => {
      clearUserData(state);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setActivePanelInfo: (state, action) => {
      state.activePanel = "INFO";
    },
    setActivePanelChat: (state, action) => {
      state.activePanel = "CHAT";
    }
  },
  extraReducers: builder => {
    builder
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, updateUserData)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, clearUserData)
      .addCase(deleteUser.rejected, handleRejected)

      // authSlice actions
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

      // chatSlice actions
      .addCase(createChatWithSelectedDropdownCourse.fulfilled, (state, action) => {
        state.chats.push(action.payload._id);
      })
  }
});

export const { clearUser, setError, setActivePanelChat, setActivePanelInfo } = userSlice.actions;
export default userSlice.reducer;

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
