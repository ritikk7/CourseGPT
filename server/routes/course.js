const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access schoolId (ie parent route)
const {
  getCourse,
  getCourses,
  createCourse,
} = require('../controllers/course');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.get('/:courseId', getCourse);

router.get('/', getCourses);

router.post('/', createCourse);

module.exports = router;
