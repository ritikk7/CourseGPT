const { ask } = require('../api/ask');
const Chat = require('../models/chat');
const Message = require('../models/message');


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

// TODO: make endpoint for coursegpt later
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
    
    // TODO: implement proper error handling and return proper meesages
    let chatGPTResponse = "Hello this is CourseGPT!";
    try{
      chatGPTResponse = await ask(userInputMessage);
    } catch (error) { // poor error handling here, just for debugging purposes for now
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

    const chat = await Chat.findById(chatId);

    chat.messages.push(newUserMessage._id);
    chat.messages.push(newGptMessage._id);
    await chat.save();

    res.status(201).json({ userMessage: newUserMessage, gptResponse: newGptMessage });
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
};
