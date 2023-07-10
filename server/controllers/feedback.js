const Feedback = require('../models/feedback');
const QAPair = require('../models/qaPair');
const { getDatabaseFeedbackInfo } = require('../data/helpers');


async function getFeedback(req, res) {
  try {
    const feedback = await Feedback.findById(req.params.feedbackId);
    if (!feedback) {
      throw new Error('oh no');
    }
    res.status(201).send({ feedback: feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// notes: need to do something with feedback here (make useful)
async function getFeedbackAnalysis(req, res) {
  try {
    const feedbackData = await getDatabaseFeedbackInfo(req.body.courseId);
    // do analysis work here
    res.status(201).send({ feedbackData: feedbackData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// notes: need to do something with feedback here (make useful)
async function createFeedback(req, res) {
  try {
    const messageId = req.params.messageId;
    const qaPair = await QAPair.findOne({ answer: messageId }).select('_id');
    if (!qaPair) {
      throw new Error('no qa pair!!!');
    }
    const feedback = new Feedback({
      user: req.params.userId,
      qaPair: qaPair,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    const newFeedback = await feedback.save();
    res.status(201).send({ feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateFeedback(req, res) {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.feedbackId,
      req.body,
      { new: true }
    );
    if (!updatedFeedback) {
      throw new Error('no feedback');
    }

    res.status(201).send({ feedback: updatedFeedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteFeedback(req, res) {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(
      req.params.feedbackId,
      req.body,
      { new: true }
    );
    res.status(201).send({ deletedFeedback: deletedFeedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackAnalysis
};
