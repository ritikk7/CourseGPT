import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";


// Helpers
const handleLoading = (state, loadingStatus) => {
  state.loading = loadingStatus;
  state.error = null;
};
const handlePending = state => handleLoading(state, true);
const handleFulfilled = (state, action) => {
  state.userId = action.payload._id;
  handleLoading(state, false);
};
const handleRejected = (state, action) => {
  state.error = action.error.message;
  state.loading = false;
};
const handleRequestError = (error) => {
  throw error.response?.data?.error ? error.response.data.error : error.message;
};

// Async
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
  "registerUser",
  "post",
  "/auth/register",
);

export const loginUser = createUserRequest(
  "loginUser",
  "post",
  "/auth/login",
);

export const logoutUser = createUserRequest(
  "logoutUser",
  "post",
  "/auth/logout",
);

export const fetchUser = createUserRequest(
  "fetchUser",
  "get",
  "/auth/get-auth-user",
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null, // string id
    loading: false,
    error: null // string message
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, state => {
        state.userId = null;
        handleLoading(state, false);
      })
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, handleFulfilled)
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = null;
        state.loading = false;
      });
  }
});



export const { setError } = authSlice.actions;
export default authSlice.reducer;

/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
