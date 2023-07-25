const User = require('../models/user');
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

async function getUserMessages(req, res) {
  try {
    // const chatId = req.params.chatId;
    const userId = req.params.userId;
    const search = req.query.search;
    // let course = req.query.course;
    if (!search || search === '') {
      res
        .status(422)
        .json({
          error: true,
          message: 'Missing or empty search query parameter',
        });
    }
    // if (!course || course === '') {
    //   course = [];
    // }
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
      // {
      //   $limit:
      //     6,
      // },
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

module.exports = {
  updateUser,
  deleteUser,
  getUserMessages,
};
