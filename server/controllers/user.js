const User = require('../models/user');
const Chat = require('../models/chat');
const Message = require('../models/message');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function updateUser(req, res) {
  const userId = req.params.userId;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    res.send({ user: updatedUser });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update user' });
  }
}

async function deleteUser(req, res) {
  // TODO
  const userId = req.params.userId;
  //const deletedUser = await User.findByIdAndDelete(userId);
  res.send({ data: `Hello delete usr ${userId}` });
}

// search all user messages
// params: userId
// queries: search [required], course [optional]
async function searchUserMessages(req, res) {
  try {
    const userId = req.params.userId;
    const search = req.query.search;
    if (!search || search === '') {
      return res.status(422)
        .json({
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
            fuzzy: {}
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
    await Promise.all(aggregate.map(async (result) => {
      const chat = await Chat.findById(result.chat);
      const courseId = chat.course;
      result.course = courseId;
      return result;
    }));
    
    res.status(200).json(aggregate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
}

module.exports = {
  updateUser,
  deleteUser,
  searchUserMessages,
};
