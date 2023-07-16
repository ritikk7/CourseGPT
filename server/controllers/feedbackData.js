const { getDatabaseFeedbackInfo } = require('../data/databaseHelpers');

// notes: need to do something with feedback here (make useful)
async function getFeedbackAnalysis(req, res) {
  try {
    const feedbackData = await getDatabaseFeedbackInfo(req.body.courseId);
    res.status(201).send({ feedbackData: feedbackData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getFeedbackAnalysis,
};
