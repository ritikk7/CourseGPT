import { createSelector } from '@reduxjs/toolkit';

const userFavouritesSelector = state => state.user.favourites;
const coursesSelector = state => state.courses.courses;

export const userFavouriteCoursesSelector = createSelector(
  [userFavouritesSelector, coursesSelector],
  (userFavourites, courses) => {
    const favoriteCourses = {};

    for (const courseId of userFavourites) {
      if (courses[courseId]) {
        favoriteCourses[courseId] = { ...courses[courseId] };
      }
    }

    return favoriteCourses;
  }
);
/*
Example Output:
{
  favouriteCourseId1: {
    _id: favouriteCourseId1,
    name: CSXX1,
    instructor: Prof. Smith,
    school: UBC,
    ...otherCourseProperties
  },
  favouriteCourseId2: {
    _id: favouriteCourseId2,
    name: CSXX2,
    instructor: Dr. Doe,
    school: UBC,
    ...otherCourseProperties
  }
}
*/
