import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
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
    const state = getState();
    const userId = state.user.data._id;
    const response = await api.patch(`/users/${userId}`, payload);
    return response.data.user;
  } catch (error) {
    throw error.response.data.error;
  }
});

const deleteUser = createAsyncThunk(`user/deleteUser`, async (_, { getState }) => {
  try {
    const state = getState();
    const userId = state.user.data._id;
    const response = await api.delete(`/users/${userId}`);
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    authError: null,
    activeChatId: null,
    activeNewChatDropdownCourseId: null
  },
  reducers: {
    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
    },
    setActiveNewChatDropdownCourseId: (state, action) => {
      state.activeNewChatDropdownCourseId = action.payload;
    },
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


const selectUserState = (state) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (user) => user.data
);

export const selectUserEmail = createSelector(
  selectUser,
  (user) => user ? user.email : null
);

export const selectUserPassword = createSelector(
  selectUser,
  (user) => user ? user.password : null
);

export const selectUserGoogleId = createSelector(
  selectUser,
  (user) => user ? user.googleId : null
);

export const selectUserType = createSelector(
  selectUser,
  (user) => user ? user.type : null
);

export const selectUserProfilePicture = createSelector(
  selectUser,
  (user) => user ? user.profilePicture : null
);

export const selectUserFirstName = createSelector(
  selectUser,
  (user) => user ? user.firstName : null
);

export const selectUserLastName = createSelector(
  selectUser,
  (user) => user ? user.lastName : null
);

export const selectUserDateOfBirth = createSelector(
  selectUser,
  (user) => user ? user.dateOfBirth : null
);

export const selectUserChats = createSelector(
  selectUser,
  (user) => user ? user.chats : null
);

export const selectUserSchool = createSelector(
  selectUser,
  (user) => user ? user.school : null
);

export const selectUserFavourites = createSelector(
  selectUser,
  (user) => user ? user.favourites : null
);

export { registerUser, loginUser, fetchUser, logoutUser, updateUser, deleteUser };
export const { setAuthError, setActiveNewChatDropdownCourseId, setActiveChatId } = userSlice.actions;
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
