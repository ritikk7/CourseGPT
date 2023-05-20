const getMessage = (req, res) => {
  // TODO
  const chatId = req.params.chatId;
  const msgId = req.params.messageId;
  res.send({ data: `Hello get  msg ${msgId} from chat ${chatId}` });
};

const createMessage = (req, res) => {
  // TODO
  const chatId = req.params.chatId;
  res.send({ data: `Hello create message in ${chatId}` });
};

const updateMessage = (req, res) => {
  // TODO
  const chatId = req.params.chatId;
  const msgId = req.params.messageId;
  res.send({ data: `Hello update msg ${msgId} from chat ${chatId}` });
};

const deleteMessage = (req, res) => {
  // TODO
  const chatId = req.params.chatId;
  const msgId = req.params.messageId;
  res.send({ data: `Hello delete msg ${msgId} from chat ${chatId}` });
};

module.exports = {
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
