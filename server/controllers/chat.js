const Chat = require('../models/chat');

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
  try {
    const chat = new Chat({
      users: userId,
      messages: [],
      course: req.body.course,
    });
    await chat.save();
    res.status(201).send({ chat: chat });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function updateChat(req, res) {
  // TODO
  const userId = req.params.userId;
  const chatId = req.params.chatId;
  res.send({ data: `Hello update chatId ${chatId} for user ${userId}` });

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).send({ error: 'Chat not found' });
    }
    const { messages, course, deleted } = req.body;
    chat.messages = messages;
    chat.course = course;
    chat.deleted = deleted;
    const updatedChat = await chat.save();
    res.status(200).send({ updatedChat: updatedChat });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function deleteChat(req, res) {
  // TODO
  const userId = req.params.userId;
  const chatId = req.params.chatId;
  res.send({ data: `Hello delete chatId ${chatId} for user ${userId}` });

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).send({ error: 'Chat not found' });
    }
    await chat.remove();
    res.status(200).send({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getChat,
  createChat,
  updateChat,
  deleteChat,
};
