const User = require('../models/user');

async function updateUser(req, res) {
  const userId = req.params.userId;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
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

module.exports = {
  updateUser,
  deleteUser,
};
