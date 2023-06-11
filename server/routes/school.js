const express = require('express');
const router = express.Router();
const {
  getSchool,
  getSchools,
} = require('../controllers/school');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.get('/:schoolId', getSchool);

router.get('/', getSchools);

module.exports = router;
