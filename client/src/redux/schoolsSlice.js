import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { updateUser } from "./userSlice";

const handleRequestError = (error) => {
  throw error.response?.data?.error ? error.response.data.error : error.message;
};


// Async
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
      handleRequestError(error);
    }
  }
);

export const fetchUserSchool = createAsyncThunk(
  "schools/fetchUserSchool",
  async (_, { getState }) => {
    try {
      const schoolId = getState().user.school;
      const response = await api.get(`/schools/${schoolId}`);

      return response.data.school;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

// Helpers
export const fetchSchool = createAsyncThunk(
  "schools/fetchSchool",
  async (schoolId, { getState }) => {
    try {
      const response = await api.get(`/schools/${schoolId}`);
      return response.data.school;
    } catch (error) {
      handleRequestError(error);
    }
  }
);

const updateStateLoading = (state, loadingStatus) => {
  state.loading = loadingStatus;
  state.error = null;
};

const schoolsSlice = createSlice({
  name: "school",
  initialState: {
    // The `school` object maps `schoolId` keys to a school.
    // Example: { "schoolId1": schoolObject1, "schoolId2": schoolObject2, }
    schools: {},
    userSchool: null, // school object
    loading: false,
    error: null // string error
  },
  reducers: {
    setUserSchool: (state, action) => {
      state.userSchool = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => updateStateLoading(state, true))
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.schools = action.payload;
        updateStateLoading(state, false);
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.error = action.error.message;
        updateStateLoading(state, false);
      })
      .addCase(fetchUserSchool.pending, (state) => updateStateLoading(state, true))
      .addCase(fetchUserSchool.fulfilled, (state, action) => {
        state.userSchool = action.payload;
        updateStateLoading(state, false);
      })
      .addCase(fetchUserSchool.rejected, (state, action) => {
        state.error = action.error.message;
        updateStateLoading(state, false);
      })
      .addCase(fetchSchool.pending, (state) => updateStateLoading(state, true))
      .addCase(fetchSchool.fulfilled, (state, action) => {
        state.schools[action.payload._id] = action.payload;
        updateStateLoading(state, false);
      })
      .addCase(fetchSchool.rejected, (state, action) => {
        state.error = action.error.message;
        updateStateLoading(state, false);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.school) {
          state.userSchool = state.schools[action.payload.school] || null;
        }
      });
  }
});



export const { setUserSchool, setError } = schoolsSlice.actions;
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
