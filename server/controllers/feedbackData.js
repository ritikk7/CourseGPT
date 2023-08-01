const { getDatabaseFeedbackInfo } = require('../data/databaseHelpers');
const { extractKeywordPhrases } = require('../data/groupingHelpers');
async function getFeedbackAnalysis(req, res) {
  try {
    const feedbackData = await getDatabaseFeedbackInfo(req.body.courseId);
    res.status(201).send({ feedbackData: feedbackData });
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
