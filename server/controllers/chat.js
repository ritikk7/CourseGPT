const getChat = (req, res) => {
  // TODO
  const userId = req.params.userId;
  const chatId = req.params.chatId;
  res.send({ data: `Hello get chatId ${chatId} for user ${userId}` });
};

const createChat = (req, res) => {
  // TODO
  const userId = req.params.userId;
  res.send({ data: `Hello create new chat for user ${userId}` });
};

const updateChat = (req, res) => {
  // TODO
  const userId = req.params.userId;
  const chatId = req.params.chatId;
  res.send({ data: `Hello update chatId ${chatId} for user ${userId}` });
};

const deleteChat = (req, res) => {
  // TODO
  const userId = req.params.userId;
  const chatId = req.params.chatId;
  res.send({ data: `Hello delete chatId ${chatId} for user ${userId}` });
};

module.exports = {
  getChat,
  createChat,
  updateChat,
  deleteChat,
};
