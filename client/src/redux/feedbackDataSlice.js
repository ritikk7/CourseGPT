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
const handleRejected = (state, action) => {
  state.error = action.error.message;
  state.loading = false;
};

// Async Functions
export const fetchFeedbackAnalysis = createAsyncThunk(
  'feedbackData/fetchFeedbackAnalysis',
  async (courseId, { getState }) => {
    try {
      const course = courseId || null;
      console.log('feedback data slice');
      const response = await api.get(`/feedbackData`, { courseId: course });
      console.log('feedback data slice api call done');
      // console.log(response.data.feedbackData);

      return response.data.feedbackData;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const feedbackDataSlice = createSlice({
  name: 'feedbackData',
  initialState: {
    feedbackInfo: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeedbackAnalysis.pending, handlePending)
      .addCase(fetchFeedbackAnalysis.fulfilled, (state, action) => {
        state.feedbackInfo = action.payload;
        // console.log(state.feedbackInfo);
        // console.log('data stuff in feedback data slice');
      })
      .addCase(fetchFeedbackAnalysis.rejected, handleRejected);
  },
});

export default feedbackDataSlice.reducer;
