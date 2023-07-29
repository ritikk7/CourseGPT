import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';
import { logoutUser } from "./authSlice";

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

export const fetchGroups = createAsyncThunk(
  'feedbackData/fetchGroups',
  async (groupData, { getState }) => {
    try {
      const group = groupData || null;
      console.log(group);

      const response = await api.post(`/feedbackData/groups`, {
        groupData: group,
      });
      console.log('feedback data slice api call done');

      return response.data.freqData;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const feedbackDataSlice = createSlice({
  name: 'feedbackData',
  initialState: {
    feedbackInfo: [],
    freqData: {},
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
    })
  },
});

export default feedbackDataSlice.reducer;
