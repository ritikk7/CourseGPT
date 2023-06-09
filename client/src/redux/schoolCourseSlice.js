import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

const fetchSchool = createAsyncThunk(
  'school/fetchSchool',
  async (schoolId, { dispatch }) => {
    try {
      const response = await api.get(`/schools/${schoolId}`);
      dispatch(setSchool(response.data.school[0]));
      return response.data.school[0];
    } catch (error) {
      console.log('Failed to fetch school');
    }
  }
);

const fetchCourses = createAsyncThunk(
  'school/fetchCourses',
  async ({ firstDropdownValue, event }, { dispatch }) => {
    const promises = [];

    for (let e of event) {
      promises.push(api.get(`/schools/${firstDropdownValue}/courses/${e}`));
    }

    try {
      const results = await Promise.all(promises);
      const courses = results.map(r => r.data.course[0]);
      dispatch(setCourses(courses));
      if (courses.length > 0) {
        dispatch(setSelectedCourse(courses[0]));
      }
      return courses;
    } catch (error) {
      console.log('Failed to fetch courses');
    }
  }
);

const setCourse = createAsyncThunk(
  'school/setCourse',
  async ({ schoolId, courseId }, { dispatch }) => {
    try {
      const response = await api.get(
        `/schools/${schoolId}/courses/${courseId}`
      );
      const course = response.data.course[0];

      if (course) {
        dispatch(setSelectedCourse(course));
      }
      return course;
    } catch (error) {
      console.log('Failed to fetch courses');
    }
  }
);

const schoolCourseSlice = createSlice({
  name: 'schoolCourse',
  initialState: {
    school: null,
    courses: [],
    selectedCourse: null,
  },
  reducers: {
    setSchool: (state, action) => {
      state.school = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSchool.fulfilled, (state, action) => {
        state.school = action.payload;
      })
      .addCase(fetchSchool.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.classes = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export { fetchSchool, fetchCourses, setCourse };
export const { setSchool, setCourses, setSelectedCourse } =
  schoolCourseSlice.actions;
export default schoolCourseSlice.reducer;
