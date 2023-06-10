import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

const createUserRequest = (name, requestType, path, dataField) => {
  return createAsyncThunk(`user/${name}`, async (payload = null) => {
    try {
      const response = await api[requestType](path, payload);
      return response.data[dataField];
    } catch (error) {
      throw error.response.data.error;
    }
  });
};

const registerUser = createUserRequest(
  "registerUser",
  "post",
  "/auth/register",
  "user"
);

const loginUser = createUserRequest(
  "loginUser",
  "post",
  "/auth/login",
  "user"
);

const logoutUser = createUserRequest(
  "logoutUser",
  "post",
  "/auth/logout",
  "message"
);

const fetchUser = createUserRequest(
  "fetchUser",
  "get",
  "/auth/get-auth-user",
  "user"
);

const updateUser = createAsyncThunk(`user/updateUser`, async (payload, { getState }) => {
  try {
    const state = getState(); // check this
    const userId = state.user.data.id; // check this
    const response = await api.patch(`/users/${userId}`, payload);
    return response.data.user;
  } catch (error) {
    throw error.response.data.error;
  }
});

const deleteUser = createAsyncThunk(`user/deleteUser`, async (_, { getState }) => {
  try {
    const state = getState(); // check this
    const userId = state.user.data.id; // check this
    const response = await api.patch(`/users/${userId}`);
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    authError: null
  },
  reducers: {
    setAuthError: (state, action) => {
      state.authError = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authError = action.error.message;
      })
      .addCase(registerUser.pending, state => {
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authError = action.error.message;
      })
      .addCase(logoutUser.pending, state => {
        state.authError = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.authError = action.error.message;
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.authError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.authError = action.payload;
      })
      .addCase(updateUser.pending, state => {
        state.authError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.authError = action.error.message;
      })
      .addCase(deleteUser.pending, state => {
        state.authError = null;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.data = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.authError = action.error.message;
      });
  }
});

export { registerUser, loginUser, fetchUser, logoutUser, updateUser, deleteUser };
export const { setAuthError } = userSlice.actions;
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
