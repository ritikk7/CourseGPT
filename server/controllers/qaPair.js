const QAPair = require('../models/qaPair');

async function getQaPair(qaId) {
  try {
    const QAPair = QAPair.findById(qaId);
    return QAPair;
  } catch (error) {
    throw new Error('got error for some reason');
  }
  // TODO
  // const qaPairId = req.params.qaPairId;
  // const courseId = req.params.courseId;
  // const chatId = req.params.chatId;
  // const questionId = req.params.questionId;
  // const answerId = req.params.answerId;
  // res.send({
  //   data: `Hello get qaPair ${qaPairId} with question ${questionId} and answer ${answerId} for chat ${chatId} and course ${courseId}`,
  // });
}

async function createQaPair(data) {
  try {
    const qaPair = new QAPair(data);
    const savedPair = await qaPair.save();
    return savedPair;
  } catch (e) {
    throw new Error(e.message);
  }
  // TODO
  // const courseId = req.params.courseId;
  // const chatId = req.params.chatId;
  // const questionId = req.params.questionId;
  // const answerId = req.params.answerId;
}

async function updateQaPair(req, res) {
  // TODO
  const qaPairId = req.params.qaPairId;
  const courseId = req.params.courseId;
  const chatId = req.params.chatId;
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  res.send({
    data: `Hello update qaPair ${qaPairId} with question ${questionId} and answer ${answerId} for chat ${chatId} and course ${courseId}`,
  });
}

async function deleteQaPair(req, res) {
  // TODO
  const qaPairId = req.params.qaPairId;
  const courseId = req.params.courseId;
  const chatId = req.params.chatId;
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  res.send({
    data: `Hello delete qaPair ${qaPairId} with question ${questionId} and answer ${answerId} for chat ${chatId} and course ${courseId}`,
  });
}

module.exports = {
  getQaPair,
  createQaPair,
  updateQaPair,
  deleteQaPair,
};
