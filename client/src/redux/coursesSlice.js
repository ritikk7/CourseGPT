import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';
import buildObjectMapFromArray from '../util/buildObjectMapFromArray';

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

// Helpers
const handleRequestError = error => {
  throw error.response?.data?.error || error.message;
};

// Async Functions
export const fetchSchoolCourse = createAsyncThunk(
  'courses/fetchSchoolCourse',
  async ({ schoolId, courseId }, { getState }) => {
    try {
      const response = await api.get(
        `/schools/${schoolId}/courses/${courseId}`
      );
      return response.data.course;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const trainCurrentlySelectedDropdownCourse = createAsyncThunk(
  'courses/trainCurrentlySelectedDropdownCourse',
  async (content, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const schoolId =
        getState().courses.currentlySelectedDropdownCourse?.school;
      const courseId = getState().courses.currentlySelectedDropdownCourse?._id;

      const response = await api.put(
        `/schools/${schoolId}/courses/${courseId}/improve-model`,
        { content, userId }
      );
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const fetchSchoolCourses = createAsyncThunk(
  'courses/fetchSchoolCourses',
  async (schoolId, { getState }) => {
    try {
      const response = await api.get(`/schools/${schoolId}/courses`);
      return buildObjectMapFromArray(response.data.courses);
    } catch (error) {
      handleRequestError(error);
    }
  }
);

export const fetchAllCourses = createAsyncThunk(
  'courses/fetchAllCourses',
  async (_, { getState }) => {
    try {
      const response = await api.get(`/courses`);
      return buildObjectMapFromArray(response.data.courses);
    } catch (error) {
      handleRequestError(error);
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    // The `courses` object maps each `courseId` key to a course object.
    // Example: { "courseId1": courseObject1, "courseId2": courseObject2}
    courses: {},
    currentlySelectedDropdownCourse: null, // course object
    loading: false,
    error: null, // string message
  },
  reducers: {
    setCoursesError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentlySelectedDropdownCourse: (state, action) => {
      state.currentlySelectedDropdownCourse = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSchoolCourse.pending, handlePending)
      .addCase(fetchSchoolCourse.fulfilled, (state, action) => {
        state.courses[action.payload._id] = action.payload;
        handleLoading(state, false);
      })
      .addCase(fetchSchoolCourse.rejected, handleRejected)
      .addCase(fetchSchoolCourses.pending, handlePending)
      .addCase(fetchSchoolCourses.fulfilled, (state, action) => {
        state.courses = { ...state.courses, ...action.payload };
        handleLoading(state, false);
      })
      .addCase(fetchSchoolCourses.rejected, handleRejected)
      .addCase(fetchAllCourses.pending, handlePending)
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        handleLoading(state, false);
      })
      .addCase(fetchAllCourses.rejected, handleRejected);
  },
});

export const { setCoursesError, setCurrentlySelectedDropdownCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;

/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - https://redux.js.org/usage/deriving-data-selectors
 * - Other general Redux docs
 * - ChatSection GPT
 * - Stack Overflow / Google
 */
