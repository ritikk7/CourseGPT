const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access schoolId (ie parent route)
const {
  getCourse,
  getAllCourses,
  createCourse,
} = require('../controllers/course');
const {validateToken} = require("../controllers/auth");

router.use(validateToken);

router.get('/:courseId', getCourse);

router.get('/', getAllCourses)

router.post('/', createCourse);

// router.put('/:courseId', updateCourse);

// router.delete('/:courseId', deleteCourse);

module.exports = router;
