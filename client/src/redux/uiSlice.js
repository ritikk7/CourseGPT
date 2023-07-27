import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidePanelVisible: true,
    isSearchBarVisible: false,
  },
  reducers: {
    setIsSidePanelVisible: (state, action) => {
      state.isSidePanelVisible = action.payload;
    },
    setIsSearchBarVisible: (state, action) => {
      state.isSearchBarVisible = action.payload;
    },
  },
});

export const { setIsSidePanelVisible, setIsSearchBarVisible } = uiSlice.actions;
export default uiSlice.reducer;
