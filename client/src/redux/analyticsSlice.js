import { createSlice } from '@reduxjs/toolkit';

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    selectedAnalyticsView: null,
  },
  reducers: {
    setSelectedAnalyticsView: (state, action) => {
      state.selectedAnalyticsView = action.payload;
    },
  },
});

export const { setSelectedAnalyticsView } = analyticsSlice.actions;
export default analyticsSlice.reducer;
