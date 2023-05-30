const express = require('express');
const router = express.Router();

const {
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool,
} = require('../controllers/school');

router.get('/:schoolId', getSchool);

router.post('/', createSchool);

router.put('/:schoolId', updateSchool);

router.delete('/:schoolId', deleteSchool);

module.exports = router;
