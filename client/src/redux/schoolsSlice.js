import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';
import { updateUser } from './userSlice';
import buildObjectMapFromArray from '../util/buildObjectMapFromArray';

// State Handlers
const handleLoading = (state, loadingStatus) => {
  state.loading = loadingStatus;
  state.error = null;
};
const handlePending = state => {
  handleLoading(state, true);
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
export const fetchSchool = createAsyncThunk(
  'schools/fetchSchool',
  async schoolId => {
    try {
      const response = await api.get(`/schools/${schoolId}`);
      return response.data.school;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const fetchAllSchools = createAsyncThunk(
  'schools/fetchAllSchools',
  async () => {
    try {
      const response = await api.get('/schools');
      return buildObjectMapFromArray(response.data.schools);
    } catch (error) {
      handleRequestError(error);
    }
  }
);

const schoolsSlice = createSlice({
  name: 'schools',
  initialState: {
    // The `schools` object maps each `schoolId` key to a school object.
    // Example: { "schoolId1": schoolObject1, "schoolId2": schoolObject2}
    schools: {},
    loading: false,
    error: null, // string error
  },
  reducers: {
    setUserSchool: (state, action) => {
      state.userSchool = action.payload;
    },
    setSchoolsError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSchool.pending, handlePending)
      .addCase(fetchSchool.fulfilled, (state, action) => {
        state.schools[action.payload._id] = action.payload;
        handleLoading(state, false);
      })
      .addCase(fetchSchool.rejected, handleRejected)
      .addCase(fetchAllSchools.pending, handlePending)
      .addCase(fetchAllSchools.fulfilled, (state, action) => {
        state.schools = action.payload;
        handleLoading(state, false);
      })
      .addCase(fetchAllSchools.rejected, handleRejected)

      // userSlice actions
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.school) {
          state.userSchool = state.schools[action.payload.school] || null;
        }
      });
  },
});

export const { setUserSchool, setSchoolsError } = schoolsSlice.actions;
export default schoolsSlice.reducer;

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
