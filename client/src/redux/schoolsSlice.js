import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { updateUser } from "./userSlice";

export const fetchSchools = createAsyncThunk(
  "schools/fetchSchools",
  async (_, { getState }) => {
    try {
      const response = await api.get("/schools");
      const schools = response.data.schools;
      const schoolsById = {};
      for (let school of schools) {
        schoolsById[school._id] = school;
      }
      return schoolsById;
    } catch (error) {
      throw error.response?.data?.error ? error.response.data.error : error.message;
    }
  }
);


export const fetchSchool = createAsyncThunk(
  "schools/fetchSchool",
  async (schoolId, { getState }) => {
    try {
      const response = await api.get(`/schools/${schoolId}`);
      return response.data.school;
    } catch (error) {
      throw error.response?.data?.error ? error.response.data.error : error.message;
    }
  }
);

const schoolsSlice = createSlice({
  name: "school",
  initialState: {
    // The `school` object maps `schoolId` keys to a school.
    // Example: { "schoolId1": schoolObject1, "schoolId2": schoolObject2, }
    schools: {},
    userSchool: null
  },
  reducers: {
    setUserSchool: (state, action) => {
      state.userSchool = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.schools = action.payload;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.school) {
          const userSchoolId = action.payload.school;
          if (state.schools[userSchoolId]) {
            state.userSchool = state.schools[userSchoolId];
          } else {
            state.userSchool = null;
          }
        }
      });
  }
});

export const { setUserSchool } = schoolsSlice.actions;
export default schoolsSlice.reducer;


/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
