const express = require('express');
const router = express.Router();
const {
  getSchool,
  getAllSchools,
  createSchool,
  updateSchool,
} = require('../controllers/school');
const { validateToken } = require('../controllers/auth');

// router.use(validateToken);

router.get('/:schoolId', getSchool);

router.get('/', getAllSchools);

router.post('/', createSchool);

router.put('/:schoolId', updateSchool);

module.exports = router;
