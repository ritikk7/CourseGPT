const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access schoolId (ie parent route)

const {
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/course');

router.get('/:courseId', (req, res) => {
    getCourse(req, res);
});

router.post('/', (req, res) => {
  createCourse(req, res); 
});

router.put('/:courseId', (req, res) => {
    updateCourse(req, res);
});

router.delete('/:courseId', (req, res) => {
    deleteCourse(req, res);
});

module.exports = router;