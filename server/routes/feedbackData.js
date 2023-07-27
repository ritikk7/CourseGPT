const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access schoolId (ie parent route)
const {
  getFeedbackAnalysis,
  getFreqAnalysis,
} = require('../controllers/feedbackData');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.post('/groups', getFreqAnalysis);

router.get('/', getFeedbackAnalysis);

module.exports = router;
