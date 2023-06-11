import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

const createAuthRequest = (name, requestType, path, dataField) => {
  return createAsyncThunk(`auth/${name}`, async (payload = null) => {
    try {
      const response = await api[requestType](path, payload);
      return response.data[dataField];
    } catch (error) {
      throw error.response.data.error;
    }
  });
};

const registerUser = createAuthRequest(
  'registerUser',
  'post',
  '/auth/register',
  'user'
);
const loginUser = createAuthRequest('loginUser', 'post', '/auth/login', 'user');
const getUser = createAuthRequest(
  'getUser',
  'get',
  '/auth/get-auth-user',
  'user'
);
const logoutUser = createAuthRequest(
  'logoutUser',
  'post',
  '/auth/logout',
  'message'
);

const createChat = createAsyncThunk(
  'auth/createChat',
  async (payload, { getState }) => {
    try {
      const state = getState();
      const userId = state.user.data._id;
      const response = await api.post(`/users/${userId}/chats`);
      return response.data.chat;
    } catch (error) {
      throw error.response.data.error;
    }
  }
);

// state.auth.user._id
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    authError: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, state => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, state => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state, action) => {
        state.authError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authError = action.payload;
      });
  },
});

export { registerUser, loginUser, getUser, logoutUser };
export const { setUser, setError } = authSlice.actions;
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
