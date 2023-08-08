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

// Helpers
const handleRequestError = error => {
  throw error.response?.data?.error || error.message;
};

// Async Functions
export const fetchFeedbackAnalysis = createAsyncThunk(
  'feedbackData/fetchFeedbackAnalysis',
  async courseId => {
    try {
      const course = courseId || null;
      const response = await api.get(`/feedbackData`, { courseId: course });
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

const feedbackDataSlice = createSlice({
  name: 'feedbackData',
  initialState: {
    groups: [],
    feedbackSentiment: {},
    barChartData: [[], [], []],
    wordCloudData: [],
    scatterChartData: [],
    bubbleChartData: [],
    freqData: {},
    hasLoadedData: false,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeedbackAnalysis.pending, handlePending)
      .addCase(fetchFeedbackAnalysis.fulfilled, (state, action) => {
        state.groups = action.payload.groups;
        state.feedbackSentiment = action.payload.feedbackSentiment;
        state.barChartData = action.payload.barChartData;
        state.wordCloudData = action.payload.wordCloudData;
        state.scatterChartData = action.payload.scatterChartData;
        state.bubbleChartData = action.payload.bubbleChartData;
        state.hasLoadedData = true;
        handleLoading(state, false);
      })
      .addCase(fetchFeedbackAnalysis.rejected, handleRejected)
      // Auth slice
      .addCase(logoutUser.fulfilled, state => {
        state.groups = [];
        state.feedbackSentiment = {};
        state.barChartData = [[], [], []];
        state.wordCloudData = [];
        state.scatterChartData = [];
        state.bubbleChartData = [];
        state.freqData = {};
        state.hasLoadedData = false;
        handleLoading(state, false);
      });
  },
});

export default feedbackDataSlice.reducer;
