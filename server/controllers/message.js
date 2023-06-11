const Chat = require('../models/chat');
const Message = require('../models/message');

async function getAllMessages(req, res) {
  // TODO
  const chatId = req.params.chatId;

  // const messages = await Message.findAll({ where: { chatId } });
  const messages = await Message.find({ chat: chatId });
  res.status(200).json({ messages });
}

async function getMessage(req, res) {
  // TODO
  const chatId = req.params.chatId;
  const msgId = req.params.messageId;
  res.send({ data: `Hello get  msg ${msgId} from chat ${chatId}` });
}

// TODO: make endpoint for coursegpt later
async function createMessage(req, res) {
  try {
    const chatId = req.params.chatId;
    const userId = req.params.userId;
    const message = new Message({
      chat: chatId,
      user: userId,
      senderType: 'User',
      content: req.body.content,
    });
    const newMessage = await message.save();

    const chat = await Chat.findById(chatId);
    chat.messages.push(newMessage._id);
    await chat.save();

    res.status(201).json({ userMessage: newMessage, gptResponse: '' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

async function updateMessage(req, res) {
  // TODO
  const chatId = req.params.chatId;
  const msgId = req.params.messageId;
  res.send({ data: `Hello update msg ${msgId} from chat ${chatId}` });
}

async function deleteMessage(req, res) {
  // TODO
  const chatId = req.params.chatId;
  const msgId = req.params.messageId;
  res.send({ data: `Hello delete msg ${msgId} from chat ${chatId}` });
}

module.exports = {
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  getAllMessages,
};
