const express = require('express');
const router = express.Router();
const {
  getSchool,
  getAllSchools,
} = require('../controllers/school');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.get('/:schoolId', getSchool);

router.get('/', getAllSchools);

module.exports = router;
