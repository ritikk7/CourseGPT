import { createSelector } from "@reduxjs/toolkit";

const userFavouritesSelector = state => state.user.favourites;
const coursesSelector = state => state.courses.courses;

export const userFavoriteCoursesSelector = createSelector(
  [userFavouritesSelector, coursesSelector],
  (userFavourites, courses) => {
    const favoriteCourses = {};

    for (const courseId of userFavourites) {
      if (courses[courseId]) {
        favoriteCourses[courseId] = courses[courseId];
      }
    }

    return favoriteCourses;
  }
);
