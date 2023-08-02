import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';
import { logoutUser } from './authSlice';

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

const handleRequestError = error => {
  throw error.response?.data?.error || error.message;
};

// Async Functions
export const fetchFeedbackAnalysis = createAsyncThunk(
  'feedbackData/fetchFeedbackAnalysis',
  async (courseId, { getState }) => {
    try {
      const course = courseId || null;
      const response = await api.get(`/feedbackData`, { courseId: course });

      return response.data.feedbackData;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const fetchGroups = createAsyncThunk(
  'feedbackData/fetchGroups',
  async (groupData, { getState }) => {
    try {
      const group = groupData || null;

      const response = await api.post(`/feedbackData/groups`, {
        groupData: group,
      });

      return response.data.freqData;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

const feedbackDataSlice = createSlice({
  name: 'feedbackData',
  initialState: {
    feedbackInfo: [],
    freqData: {},
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeedbackAnalysis.pending, handlePending)
      .addCase(fetchFeedbackAnalysis.fulfilled, (state, action) => {
        state.feedbackInfo = action.payload;
      })
      .addCase(fetchFeedbackAnalysis.rejected, handleRejected)
      .addCase(fetchGroups.pending, handlePending)
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.freqData = action.payload;
      })
      .addCase(fetchGroups.rejected, handleRejected)

      // Auth slice
      .addCase(logoutUser.fulfilled, state => {
        state.feedbackInfo = [];
        state.freqData = {};
        state.error = null;
        state.loading = false;
      });
  },
});

export default feedbackDataSlice.reducer;
