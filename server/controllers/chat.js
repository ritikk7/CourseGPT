const Chat = require('../models/chat');
const User = require('../models/user');

async function getChat(req, res) {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId);
    res.send({ chat });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function getChats(req, res) {
  try {
    const userId = req.params.userId;
    const chats = await Chat.find({ user: userId, deleted: false });
    res.send({ chats });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function createChat(req, res) {
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

async function updateChats(req, res) {
  const filter = req.body.filter;
  const updates = req.body.updates;

  try {
    await Chat.updateMany(filter, updates);
    const chats = await Chat.find(filter);
    res.status(200).send({ chats });
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
      res.status(404).send({ error: 'ChatSection not found' });
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
  getChats,
  updateChats,
};
