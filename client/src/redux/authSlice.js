import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

// State Handlers
const handleLoading = (state, loadingStatus) => {
  state.loading = loadingStatus;
  state.error = null;
};
const handlePending = state => {
  handleLoading(state, true);
};
const handleFulfilledActiveUser = (state, action) => {
  state.userId = action.payload._id;
  state.isAuthenticated = true;
  handleLoading(state, false);
};
const handleRejected = (state, action) => {
  state.error = action.error.message;
  state.loading = false;
};

// Helpers
const handleRequestError = error => {
  throw error.response?.data?.error || error.message;
};

// Async Functions
const createUserRequest = (name, requestType, path) => {
  return createAsyncThunk(`auth/${name}`, async (payload = null) => {
    try {
      const response = await api[requestType](path, payload);
      return response.data.user;
    } catch (error) {
      handleRequestError(error);
    }
  });
};

export const registerUser = createUserRequest(
  'registerUser',
  'post',
  '/auth/register'
  // payload = {firstName: "John", lastName: "Doe", email: "efpyi@example.com", password: "password"}
);

export const loginUser = createUserRequest(
  'loginUser',
  'post',
  '/auth/login'
  // payload = {email: "efpyi@example.com", password: "password"}
);

export const logoutUser = createUserRequest(
  'logoutUser',
  'post',
  '/auth/logout'
  // payload = null
);

export const updatePassword = createUserRequest(
  'updatePassword',
  'patch',
  '/auth/update-password'
  // payload = {oldPassword: "oldpassword", newPassword: "newpassword", confirmPassword: "confirmpassword"}
);

export const fetchUser = createUserRequest(
  'fetchUser',
  'get',
  '/auth/get-auth-user'
  // payload = null
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null, // string id
    isAuthenticated: false, // boolean
    loading: false,
    error: null, // string message
  },
  reducers: {
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilledActiveUser)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilledActiveUser)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, state => {
        state.userId = null;
        state.isAuthenticated = false;
        handleLoading(state, false);
      })
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, handleFulfilledActiveUser)
      .addCase(fetchUser.rejected, state => {
        state.error = null; // Lazy way to prevent displaying "No Token Provided" message on login page.
        state.loading = false;
      });
  },
});

export const { setAuthError } = authSlice.actions;
export default authSlice.reducer;

/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - https://redux.js.org/usage/deriving-data-selectors
 * - Other general Redux docs
 * - ChatSection GPT
 * - Stack Overflow / Google
 */
