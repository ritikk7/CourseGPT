const { getDatabaseFeedbackInfo } = require('../data/databaseHelpers');
const { extractKeywordPhrases } = require('../data/groupingHelpers');
const { analyzeFeedback } = require('../data/formatHelpers');

async function getFeedbackAnalysis(req, res) {
  try {
    const data = await getDatabaseFeedbackInfo(req.body.courseId);
    const feedbackData = await analyzeFeedback(data);
    res.status(200).send(feedbackData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFreqAnalysis(req, res) {
  try {
    const groupData = req.body.groupData;
    const freqData = await extractKeywordPhrases(groupData);
    console.log('get analysis');
    console.log(freqData);
    res.status(201).send({ freqData: freqData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getFeedbackAnalysis,
  getFreqAnalysis,
};
