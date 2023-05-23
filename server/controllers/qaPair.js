const getQaPair = (req, res) => {
  // TODO
  const qaPairId = req.params.qaPairId;
  const courseId = req.params.courseId;
  const chatId = req.params.chatId;
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  res.send({
    data: `Hello get qaPair ${qaPairId} with question ${questionId} and answer ${answerId} for chat ${chatId} and course ${courseId}`,
  });
};

const createQaPair = (req, res) => {
  // TODO
  const courseId = req.params.courseId;
  const chatId = req.params.chatId;
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  res.send({
    data: `Hello create new qaPair with question ${questionId} and answer ${answerId} for chat ${chatId} and course ${courseId}`,
  });
};

const updateQaPair = (req, res) => {
  // TODO
  const qaPairId = req.params.qaPairId;
  const courseId = req.params.courseId;
  const chatId = req.params.chatId;
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  res.send({
    data: `Hello update qaPair ${qaPairId} with question ${questionId} and answer ${answerId} for chat ${chatId} and course ${courseId}`,
  });
};

const deleteQaPair = (req, res) => {
  // TODO
  const qaPairId = req.params.qaPairId;
  const courseId = req.params.courseId;
  const chatId = req.params.chatId;
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  res.send({
    data: `Hello dekete qaPair ${qaPairId} with question ${questionId} and answer ${answerId} for chat ${chatId} and course ${courseId}`,
  });
};

module.exports = {
  getQaPair,
  createQaPair,
  updateQaPair,
  deleteQaPair,
};
