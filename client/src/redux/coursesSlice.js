import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (schoolId) => {
    const response = await api.get(`/schools/${schoolId}/courses`);
    console.log({
      schoolId: schoolId,
      courses: response.data.courses
    });
    return {
      schoolId: schoolId,
      courses: response.data.courses
    };
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    data: {},
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.data[action.payload.schoolId] = action.payload.courses;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export { fetchCourses };
export default coursesSlice.reducer;
