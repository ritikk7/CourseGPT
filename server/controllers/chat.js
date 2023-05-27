async function getChat(req, res) {
  // TODO
  const userId = req.params.userId;
  const chatId = req.params.chatId;
  res.send({ data: `Hello get chatId ${chatId} for user ${userId}` });
}

async function createChat(req, res) {
  // TODO
  const userId = req.params.userId;
  res.send({ data: `Hello create new chat for user ${userId}` });
}

async function updateChat(req, res) {
  // TODO
  const userId = req.params.userId;
  const chatId = req.params.chatId;
  res.send({ data: `Hello update chatId ${chatId} for user ${userId}` });
}

async function deleteChat(req, res) {
  // TODO
  const userId = req.params.userId;
  const chatId = req.params.chatId;
  res.send({ data: `Hello delete chatId ${chatId} for user ${userId}` });
}

module.exports = {
  getChat,
  createChat,
  updateChat,
  deleteChat,
};
