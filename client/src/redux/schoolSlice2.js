import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    // The `school` object maps `schoolId` keys to a school.
    // Example: { "schoolId1": schoolObject1, "schoolId2": schoolObject2, }
    // Every single school object should have their courses array filled in with real objects, rather than id's
    // when the schools are initially loaded, there should be one dispatch, then a loop of dispatches (similar to existing in Home.js)
    // one for populating the schools (normally, with the courses array just with id's)
    // and then a loop that goes and populates the actual course objects for each school
    schools: {},
    // The `userFavourites` object maps `courseId` keys to a course object.
    // Example: { "courseId1": courseObject1, "courseId2": courseObject2 }
    userFavouriteCourses: {},
    currentlySelectedDropdownCourse: null, // course object
    userSchool: null, // school object with the courses array filled in with real objects, rather than id's
    loading: false,
    error: null // string error
  },
  reducers: {}
});



/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
