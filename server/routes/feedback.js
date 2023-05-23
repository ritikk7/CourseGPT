const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access schoolId (ie parent route)

const {
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedback');

router.get('/:feedbackId', (req, res) => {
  getFeedback(req, res);
});

router.post('/', (req, res) => {
  createFeedback(req, res);
});

router.put('/:feedbackId', (req, res) => {
  updateFeedback(req, res);
});

router.delete('/:feedbackId', (req, res) => {
  deleteFeedback(req, res);
});

module.exports = router;
