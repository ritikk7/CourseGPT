const { getDatabaseFeedbackInfo } = require('../data/databaseHelpers');
const { analyzeFeedback } = require('../data/formatHelpers');

async function getFeedbackAnalysis(req, res) {
  try {
    const data = await getDatabaseFeedbackInfo(req.body.courseId);
    const feedbackData = await analyzeFeedback(data);
    res.status(200).send(feedbackData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getFeedbackAnalysis,
};
