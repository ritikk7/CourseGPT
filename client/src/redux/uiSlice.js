import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from './authSlice';

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
  extraReducers: builder => {
    builder.addCase(logoutUser.fulfilled, state => {
      state.isSidePanelVisible = true;
      state.isSearchBarVisible = false;
    });
  },
});

export const { setIsSidePanelVisible, setIsSearchBarVisible } = uiSlice.actions;
export default uiSlice.reducer;
