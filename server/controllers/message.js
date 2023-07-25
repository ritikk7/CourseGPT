const Chat = require('../models/chat');
const Message = require('../models/message');
const qaPair = require('./qaPair');
const { ask } = require('../gpt/ask');
const { generateChatTitle } = require('../gpt/openAI');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function getAllMessages(req, res) {
  const chatId = req.params.chatId;
  const messages = await Message.find({ chat: chatId });
  res.status(200).json({ messages });
}

async function searchMessages(req, res) {
  try {
    // const chatId = req.params.chatId;
    const userId = req.params.userId;
    const search = req.query.search;
    if (!search || search === '') {
      res
        .status(422)
        .json({
          error: true,
          message: 'Missing or empty search query parameter',
        });
    }
    // const page = parseInt(req.query.page) - 1 || 0;
    // const limit = parseInt(req.query.limit) || 5;
    // let sort = req.query.sort || 'updatedAt';
    // let course = req.query.course || "";
    const agg = [
      {
        $search: {
          index: 'messages',
          text: {
            query: search,
            path: 'content',
          },
          highlight: {
            path: 'content',
          },
        },
      },
      {
        $match: {
          user: new ObjectId(userId),
          deleted: false,
        },
      },
      {
        $project: {
          chat: 1,
          user: 1,
          content: 1,
          _id: 1,
          highlights: {
            $meta: 'searchHighlights',
          },
        },
      },
      {
        $limit: 6,
      },
      // {
      //   $count:
      //     "content",
      // },
    ];

    const aggregate = await Message.aggregate(agg);
    console.log(aggregate);
    res.status(200).json(aggregate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
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

    let chatGPTResponse;
    if(userMessageObject.content.toLowerCase().includes("ignore")) {
      chatGPTResponse = "Potential security risk detected in your input. Please do not use words that might interfere with the AI's operations and try again with another question.";
    } else {
      chatGPTResponse = await ask(userMessageObject.content, chatId);
    }

    const gptMessage = new Message({
      chat: chatId,
      user: userId,
      role: 'system',
      content: chatGPTResponse,
    });

    const newGptMessage = await gptMessage.save();

    let chat = await Chat.findById(chatId);
    chat.messages.push(newGptMessage._id);

    if (!chat.title) {
      chat.title = await generateChatTitle(
        userMessageObject.content,
        chatGPTResponse
      );
    }

    await chat.save();

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

module.exports = {
  createUserMessage,
  getAllMessages,
  getGptResponse,
  searchMessages,
};
