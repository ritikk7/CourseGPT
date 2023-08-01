const Chat = require('../models/chat');
const Message = require('../models/message');
const User = require('../models/user');
const { Logger } = require('../util/Logger');

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
    const userId = req.user.id;
    const chats = await Chat.find({ user: userId, deleted: false });
    res.send({ chats });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function createChat(req, res) {
  const userId = req.user.id;
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

async function softDeleteChats(req, res) {
  let filter = req.body.filter;
  filter.user = req.user.id;
  const updates = req.body.updates;

  try {
    await Chat.updateMany(filter, updates);
    const chats = await Chat.find(filter);

    // also set associated messages to deleted
    await Message.updateMany(filter, updates); // duffy will this filter work for the messages?

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

    // also set associated messages to deleted
    const filter = { chat: chatId };
    await Message.updateMany(filter, updates);
    const updatedMessagesFound = await Message.find(filter);

    res.status(200).send({ chat: updatedChat, messages: updatedMessagesFound });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getChat,
  createChat,
  updateChat,
  getChats,
  softDeleteChats,
};
