import { createSelector } from "@reduxjs/toolkit";

const schoolSelector = state => state.schools.schools;
const coursesSelector = state => state.courses.courses;

export const schoolsWithCoursesSelector = createSelector(
  [schoolSelector, coursesSelector],
  (schools, courses) => {
    const schoolsWithCourses = {};

    for (const school in schools) {
      const schoolWithCourses = { ...school, courses: {} };
      for (const courseId of school.courses) {
        schoolWithCourses.courses[courseId] = courses[courseId];
      }
      schoolsWithCourses[school._id] = schoolWithCourses;
    }

    return schoolsWithCourses;
  }
);
