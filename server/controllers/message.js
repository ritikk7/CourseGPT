const Chat = require('../models/chat');
const Message = require('../models/message');
const qaPair = require('./qaPair');
const { ask } = require('../gpt/ask');

async function getAllMessages(req, res) {
  // TODO
  const chatId = req.params.chatId;
  const messages = await Message.find({ chat: chatId });
  res.status(200).json({ messages });
}

async function getMessage(req, res) {
  // TODO
  const chatId = req.params.chatId;
  const msgId = req.params.messageId;
  res.send({ data: `Hello get  msg ${msgId} from chat ${chatId}` });
}

async function createUserMessage(req, res) {
  try {
    const chatId = req.params.chatId;
    const userId = req.params.userId;
    const userInputMessage = req.body.content;
    const message = new Message({
      chat: chatId,
      user: userId,
      role: 'user',
      content: userInputMessage,
    });
    const newUserMessage = await message.save();

    const chat = await Chat.findById(chatId);
    chat.messages.push(newUserMessage._id);
    await chat.save();

    res.status(201).json({ message: newUserMessage });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' + error.message });
  }
}

async function getGptResponse(req, res) {
  try {
    const chatId = req.params.chatId;
    const userId = req.params.userId;
    const userMessageObject = req.body;

    const chatGPTResponse = await ask(userMessageObject.content, chatId);

    const gptMessage = new Message({
      chat: chatId,
      user: userId,
      role: 'system',
      content: chatGPTResponse,
    });

    const newGptMessage = await gptMessage.save();

    let chat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: newGptMessage._id } },
      { new: true }
    );

    await qaPair.createQaPair({
      course: chat.course,
      chat: chatId,
      question: userMessageObject._id,
      answer: newGptMessage._id,
    });

    res.status(201).json({ message: newGptMessage });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong ' + error.message + error + error.stack,
    });
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
  createUserMessage,
  updateMessage,
  deleteMessage,
  getAllMessages,
  getGptResponse,
};
