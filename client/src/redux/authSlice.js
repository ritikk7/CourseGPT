import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

const createUserRequest = (name, requestType, path) => {
  return createAsyncThunk(`auth/${name}`, async (payload = null) => {
    try {
      const response = await api[requestType](path, payload);
      return response.data.user;
    } catch (error) {
      throw error.response?.data?.error ? error.response.data.error : error.message;
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
      .addCase(loginUser.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userId = action.payload._id;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(registerUser.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userId = action.payload._id;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userId = action.payload._id;
        state.loading = false;
      })
      .addCase(logoutUser.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchUser.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userId = action.payload._id;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
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
