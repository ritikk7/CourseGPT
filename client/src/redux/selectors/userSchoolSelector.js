import { createSelector } from "@reduxjs/toolkit";

const userSchool = state => state.user.school;
const schools = state => state.schools.schools;

const courses = state => state.courses.courses

export const userSchoolSelector = createSelector(
  [userSchool, schools, courses],
  (userSchool, schools, courses) => {
    const userSchoolObject = userSchool ? schools[userSchool] : null;
    if(userSchoolObject) {
      const userSchoolWithCourses = { ...userSchoolObject, courses: {} };
      for (const courseId of userSchoolObject.courses) {
        userSchoolWithCourses.courses[courseId] = { ...courses[courseId] };
      }
      return userSchoolWithCourses;
    }
    return null;
  }
);
