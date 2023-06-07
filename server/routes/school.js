const express = require('express');
const router = express.Router();
const {
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool,
} = require('../controllers/school');
const {validateToken} = require("../controllers/auth");

router.use(validateToken);

router.get('/:schoolId', getSchool);

router.post('/', createSchool);

router.put('/:schoolId', updateSchool);

router.delete('/:schoolId', deleteSchool);

module.exports = router;
