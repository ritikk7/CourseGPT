const getQaPair = async (req, res) => {
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

const createQaPair = async (req, res) => {
  // TODO
  const courseId = req.params.courseId;
  const chatId = req.params.chatId;
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  res.send({
    data: `Hello create new qaPair with question ${questionId} and answer ${answerId} for chat ${chatId} and course ${courseId}`,
  });
};

const updateQaPair = async (req, res) => {
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

const deleteQaPair = async (req, res) => {
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
