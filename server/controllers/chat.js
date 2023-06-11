const Chat = require('../models/chat');
const User = require('../models/user');

async function getChat(req, res) {
  // TODO
  const userId = req.params.userId;
  const chatId = req.params.chatId;
  res.send({ data: `Hello get chatId ${chatId} for user ${userId}` });
}

async function createChat(req, res) {
  // TODO
  const userId = req.params.userId;
  try {
    const chat = new Chat({
      user: userId,
      messages: [],
      course: req.body.course,
    });
    const newChat = await chat.save();
    const user = await User.findById(userId);
    if (!user) {
      res.status(500).send({ error: 'There is no such user!' });
    }
    user.chats.push(newChat._id);
    await user.save();

    res.status(201).send({ chat: newChat });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function updateChat(req, res) {
  const chatId = req.params.chatId;
  const updates = req.body;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).send({ error: 'Chat not found' });
    }

    const updatedChat = await Chat.findByIdAndUpdate(chatId, updates, {
      new: true,
    });

    res.status(200).send({ chat: updatedChat });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getChat,
  createChat,
  updateChat,
};
