import { createSelector } from "@reduxjs/toolkit";

const userSelector = state => state.user;

const coursesSelector = state => state.courses.courses;

export const userFavoriteCoursesSelector = createSelector(
  [userSelector, coursesSelector],
  (user, courses) => {
    const favoriteCourses = {};

    for (const courseId of user.favourites) {
      if (courses[courseId]) {
        favoriteCourses[courseId] = courses[courseId];
      }
    }

    return favoriteCourses;
  }
);
