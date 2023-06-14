import { createSelector } from "@reduxjs/toolkit";

const schoolSelector = state => state.schools.schools;
const coursesSelector = state => state.courses.courses;

export const schoolsWithCoursesSelector = createSelector(
  [schoolSelector, coursesSelector],
  (schools, courses) => {
    const schoolsWithCourses = {};

    for (const school of Object.values(schools)) {
      const schoolWithCourses = { ...school, courses: {} };
      for (const courseId of school.courses) {
        schoolWithCourses.courses[courseId] = { ...courses[courseId] };
      }
      schoolsWithCourses[school._id] = schoolWithCourses;
    }

    return schoolsWithCourses;
  }
);

/*
Example Output:
{
  schoolId1: {
    _id: schoolId1,
    name: UBC,
    location: Vancouver,
    type: University,
    website: www,
    logo: www,
    courses: {
      courseId1: coursesObject1,
      courseId2: coursesObject2
    }
  },
    schoolId2: {
    _id: schoolId2,
    name: KPU,
    location: Vancouver,
    type: College? University? Wtf are they?,
    website: www,
    logo: www,
    courses: {
      courseId3: coursesObject3,
      courseId4: coursesObject4
    }
  }
}
*/
