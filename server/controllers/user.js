const User = require('../models/user');
const mongoose = require('mongoose');

async function updateUser(req, res) {
  const userId = req.user.id;
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
  const userId = req.user.id;
  //const deletedUser = await User.findByIdAndDelete(userId);
  res.send({ data: `Hello delete usr ${userId}` });
}

module.exports = {
  updateUser,
  deleteUser,
};
