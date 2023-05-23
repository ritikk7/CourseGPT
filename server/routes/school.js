const express = require('express');
const router = express.Router(); 

const {
    getSchool,
    createSchool,
    updateSchool,
    deleteSchool,
} = require('../controllers/school');

router.get('/:schoolId', (req, res) => {
    getSchool(req, res);
});

router.post('/', (req, res) => {
    createSchool(req, res); 
});

router.put('/:schoolId', (req, res) => {
    updateSchool(req, res);
});

router.delete('/:schoolId', (req, res) => {
    deleteSchool(req, res);
});

module.exports = router;