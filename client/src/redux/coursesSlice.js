import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";


const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (schoolId, { getState }) => {
    try {
      const response = await api.get(`/schools/${schoolId}/courses`);
      return {
        schoolId: schoolId,
        courses: response.data.courses
      };
    } catch (error) {
      throw error.response?.data?.error ? error.response.data.error : error.message;
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    // The `allCourses` object maps `schoolId` keys to arrays of courses.
    // Example: { "schoolId1": [courseObject1, courseObject2], "schoolId2": [courseObject3, courseObject4] }
    allCourses: {},
    // The `favourites` object maps `courseId` keys to a course object.
    // Example: { "courseId1": courseObject1, "courseId2": courseObject2 }

    favourites: {},
    currentlySelectedDropdownCourse: null,
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

/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
