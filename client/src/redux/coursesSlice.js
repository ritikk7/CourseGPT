import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { updateUser } from "./userSlice";


const fetchSchoolCourses = createAsyncThunk(
  "courses/fetchSchoolCourses",
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

const fetchUserFavouriteCourses = createAsyncThunk(
  "courses/fetchUserFavouriteCourses",
  async (_, { getState }) => {
    try {
      const favouriteIds = getState().user.favourites;
      const schoolId = getState().user.school;
      const courseIds = favouriteIds.join(",");
      const response = await api.get(`/schools/${schoolId}/courses/byIds?ids=${courseIds}`);
      const courses = response.data.courses;
      const coursesById = {};
      for (let course of courses) {
        coursesById[course._id] = course;
      }
      return coursesById;
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
    allCourses: null,
    // The `userFavourites` object maps `courseId` keys to a course object.
    // Example: { "courseId1": courseObject1, "courseId2": courseObject2 }
    userFavourites: null,
    currentlySelectedDropdownCourse: null, // course object
    loading: false,
    error: null // string message
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolCourses.fulfilled, (state, action) => {
        state.loading = false;
        if (state.allCourses === null) {
          state.allCourses = {};
        }
        state.allCourses[action.payload.schoolId] = action.payload.courses;
      })
      .addCase(fetchSchoolCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.allCourses = null;
      })
      .addCase(fetchUserFavouriteCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavouriteCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.userFavourites = action.payload;
      })
      .addCase(fetchUserFavouriteCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.userFavourites = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.userFavourites === null) {
          state.userFavourites = {};
        }

        const updatedFavourites = action.payload.favourites;

        for (let courseId in state.userFavourites) {
          if (!updatedFavourites.includes(courseId)) {
            state.userFavourites = null;
            break;
          }
        }

      });


  }
});

export { fetchSchoolCourses, fetchUserFavouriteCourses };
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
