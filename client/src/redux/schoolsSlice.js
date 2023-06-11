import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

const fetchSchools = createAsyncThunk(
  "schools/fetchSchools",
  async () => {
    const response = await api.get("/schools");
    return response.data.schools;
  }
);

const fetchSchool = createAsyncThunk(
  "school/fetchSchool",
  async (schoolId) => {
    const response = await api.get(`/schools/${schoolId}`);
    return response.data.school;
  }
);

const schoolsSlice = createSlice({
  name: "school",
  initialState: {
    schools: {},
    userSchool: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export { fetchSchools, fetchSchool };
export default schoolsSlice.reducer;
