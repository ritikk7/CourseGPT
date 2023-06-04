import { createSlice } from '@reduxjs/toolkit';

const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    school: null,
    classes: [] 
  },
  reducers: {
    setSchool: (state, action) => {
      state.school = action.payload;
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
  },
});

export const { setSchool, setClasses } = schoolSlice.actions;

export default schoolSlice.reducer;