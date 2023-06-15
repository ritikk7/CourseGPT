const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access schoolId (ie parent route)
const {
  createCourse, getSchoolCourse, getSchoolCourses,
} = require('../controllers/course');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.get('/:courseId', getSchoolCourse);

router.get('/', getSchoolCourses);

router.post('/', createCourse);

module.exports = router;
