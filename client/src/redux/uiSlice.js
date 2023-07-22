import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidePanelVisible: true,
  },
  reducers: {
    setIsSidePanelVisible: (state, action) => {
      state.isSidePanelVisible = action.payload;
    },
  },
});

export const { setIsSidePanelVisible } = uiSlice.actions;
export default uiSlice.reducer;
