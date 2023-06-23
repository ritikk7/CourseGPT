const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access schoolId (ie parent route)
const { getAllCourses } = require('../controllers/course');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.get('/courses', getAllCourses);

module.exports = router;
