import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { updateUser } from "./userSlice";

// State Handlers
const handleLoading = (state, loadingStatus) => {
  state.loading = loadingStatus;
  state.error = null;
};
const handlePending = (state) => {
  handleLoading(state, true);
}
const handleRejected = (state, action) => {
  state.error = action.error.message;
  state.loading = false;
};

// Helpers
const handleRequestError = (error) => {
  throw error.response?.data?.error || error.message;
};

// Async Functions
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

export const fetchAllSchools = createAsyncThunk(
  "schools/fetchAllSchools",
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

const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    // The `schools` object maps each `schoolId` key to a school object.
    // Example: { "schoolId1": schoolObject1, "schoolId2": schoolObject2}
    schools: {},
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

      .addCase(fetchSchool.pending, handlePending)
      .addCase(fetchSchool.fulfilled, (state, action) => {
        state.schools[action.payload._id] = action.payload;
        handleLoading(state, false);
      })
      .addCase(fetchSchool.rejected, handleRejected)
      .addCase(fetchAllSchools.pending, handlePending)
      .addCase(fetchAllSchools.fulfilled, (state, action) => {
        state.schools = action.payload;
        handleLoading(state, false);
      })
      .addCase(fetchAllSchools.rejected, handleRejected)

      // userSlice actions
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
 * - https://redux.js.org/usage/deriving-data-selectors
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
