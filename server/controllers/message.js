const { ask } = require('../api/ask');
const Chat = require('../models/chat');
const Message = require('../models/message');
const qaPair = require('./qaPair');

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
      senderType: 'User',
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

    const chat = await Chat.findById(chatId);
    let chatGPTResponse = 'Hello this is CourseGPT!';

    try {
      console.log(userMessageObject);
      chatGPTResponse = await ask(userMessageObject.content, chat.course._id);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status + error.response.data);
      } else {
        console.log(error.message);
      }
    }

    const gptMessage = new Message({
      chat: chatId,
      user: userId,
      senderType: 'CourseGPT',
      content: chatGPTResponse,
    });

    const newGptMessage = await gptMessage.save();
    chat.messages.push(newGptMessage._id);
    await chat.save();

    await qaPair.createQaPair({
      course: chat.course,
      chat: chatId,
      question: userMessageObject._id,
      answer: newGptMessage._id,
    });

    res.status(201).json({ message: newGptMessage });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' + error.message });
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
