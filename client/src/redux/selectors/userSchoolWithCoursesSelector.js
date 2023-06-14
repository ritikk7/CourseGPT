import { createSelector } from "@reduxjs/toolkit";

const userSchool = state => state.user.school;
const schools = state => state.schools.schools;

const courses = state => state.courses.courses

export const userSchoolWithCoursesSelector = createSelector(
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
/*
Example Output:
{
  _id: userSchoolId,
  name: UBC,
  location: Vancouver,
  type: University,
  website: www,
  logo: www,
  courses: {
    courseId1: {
      _id: courseId1,
      name: CSXX1,
      instructor: Prof. Smith,
      school: UBC,
      ...otherCourseProperties
    },
    courseId2: {
      _id: courseId2,
      name: CSXX2,
      instructor: Dr. Doe,
      school: UBC,
      ...otherCourseProperties
    }
  }
}
*/
