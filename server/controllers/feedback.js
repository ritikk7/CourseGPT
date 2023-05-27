async function getFeedback(req, res) {
  // TODO
  const userId = req.params.userId;
  const messageId = req.params.messageId;
  const feedbackId = req.params.feedbackId;
  res.send({
    data: `Hello get feedback ${feedbackId} for message ${messageId} from user ${userId}`,
  });
}

async function createFeedback(req, res) {
  // TODO
  const userId = req.params.userId;
  const messageId = req.params.messageId;
  res.send({
    data: `Hello create new feedback with user ${userId} and message ${messageId}`,
  });
}

async function updateFeedback(req, res) {
  // TODO
  const userId = req.params.userId;
  const messageId = req.params.messageId;
  const feedbackId = req.params.feedbackId;
  res.send({
    data: `Hello update feedback${feedbackId} for message ${messageId} from user ${userId}`,
  });
}

async function deleteFeedback(req, res) {
  // TODO
  const userId = req.params.userId;
  const messageId = req.params.messageId;
  const feedbackId = req.params.feedbackId;
  res.send({
    data: `Hello delete feedback${feedbackId} for message ${messageId} from user ${userId}`,
  });
}

module.exports = {
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
