import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { updateUser } from "./userSlice";

const handleRequestError = (error) => {
  throw error.response?.data?.error ? error.response.data.error : error.message;
};

export const fetchSchoolCourses = createAsyncThunk(
  "courses/fetchSchoolCourses",
  async (schoolId, { getState }) => {
    try {
      const response = await api.get(`/schools/${schoolId}/courses`);
      return {
        schoolId: schoolId,
        courses: response.data.courses
      };
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const fetchUserFavouriteCourses = createAsyncThunk(
  "courses/fetchUserFavouriteCourses",
  async (_, { getState }) => {
    try {
      const favouriteIds = getState().user.favourites;
      const schoolId = getState().user.school;
      const response = await api.get(`/schools/${schoolId}/courses/`);
      const courses = response.data.courses;
      const coursesById = {};
      for (let course of courses) {
        if(favouriteIds.includes(course._id)) {
          coursesById[course._id] = course;
        }
      }
      return coursesById;
    } catch (error) {
      handleRequestError(error);
    }
  }
);


const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    // The `allCourses` object maps `schoolId` keys to arrays of courses.
    // Example: { "schoolId1": [courseObject1, courseObject2], "schoolId2": [courseObject3, courseObject4] }
    allCourses: {},
    // The `userFavourites` object maps `courseId` keys to a course object.
    // Example: { "courseId1": courseObject1, "courseId2": courseObject2 }
    userFavourites: {},
    currentlySelectedDropdownCourse: null, // course object
    loading: false,
    error: null // string message
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    }, 
    setCurrentlySelectedDropdownCourse: (state, action) => {
      state.currentlySelectedDropdownCourse = action.payload;
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
        state.allCourses[action.payload.schoolId] = action.payload.courses;
      })
      .addCase(fetchSchoolCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.allCourses = {};
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
        state.userFavourites = {};
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userFavourites = {}
      });
  }
});




export const { setError, setCurrentlySelectedDropdownCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
