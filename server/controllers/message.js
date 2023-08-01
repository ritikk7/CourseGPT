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

// search all user messages
// params: userId
// queries: search [required], course [optional]
async function searchUserMessages(req, res) {
  try {
    const userId = req.user.id;
    const search = req.query.search;
    if (!search || search === '') {
      return res.status(422).json({
        error: true,
        message: 'Missing or empty search query parameter',
      });
    }
    const agg = [
      {
        $search: {
          index: 'messages',
          text: {
            query: search,
            path: 'content',
            fuzzy: {},
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
          user: 1,
          chat: 1,
          content: 1,
          updatedAt: 1,
          senderType: 1,
          highlights: {
            $meta: 'searchHighlights',
          },
        },
      },
    ];

    const aggregate = await Message.aggregate(agg);

    // retrieve each message's course ID and attach to the aggregate results
    await Promise.all(
      aggregate.map(async result => {
        const chat = await Chat.findById(result.chat);
        const courseId = chat.course;
        result.course = courseId;
        return result;
      })
    );

    res.status(200).json(aggregate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
}

async function createUserMessage(req, res) {
  try {
    const chatId = req.params.chatId;
    const userId = req.user.id;
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
    const userId = req.user.id;
    const userMessageObject = req.body;

    let chatGPTResponse;
    if (userMessageObject.content.toLowerCase().includes('ignore')) {
      chatGPTResponse =
        "Potential security risk detected in your input. Please do not use words that might interfere with the AI's operations and try again with another question.";
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

async function createChatTitle(req, res) {
  try {
    const chatId = req.params.chatId;
    let updatedChat = await Chat.findById(chatId).populate('messages');
    let userMessageContent;
    let chatGptResponseContent;
    let messageIds = [];

    for (let i = 0; i < updatedChat.messages.length; i++) {
      // only ever executed when there are two messages - one user and one gpt
      let message = updatedChat.messages[i];
      if (message.role === 'user') {
        userMessageContent = message.content;
      } else {
        chatGptResponseContent = message.content;
      }
      messageIds.push(message._id);
    }

    if (!updatedChat.title) {
      updatedChat.title = await generateChatTitle(
        userMessageContent,
        chatGptResponseContent
      );
    }

    await updatedChat.save();

    // The frontend expects just a list of id's not the populated messages
    updatedChat.messages = messageIds;

    res.status(201).json({ chat: updatedChat });
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
  createChatTitle,
  searchUserMessages,
};
