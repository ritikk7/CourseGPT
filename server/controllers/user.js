const User = require("../models/user");

async function getUser(req, res) {
  // TODO
  const userId = req.params.userId;
  //const user = await User.findById(userId);
  res.send({ data: `Hello get usr ${userId}` });
}

async function createUser(req, res) {
  // TODO
  //const newUser = new User(req.body);
  //const createdUser = await newUser.save();
  res.send({ data: `Hello post usr` });
}

async function updateUser(req, res) {
  // TODO
  const userId = req.params.userId;
  const updates = req.body;
  //const updatedUser = await User.findByIdAndUpdate(userId, updates);
  res.send({ data: `Hello put usr ${userId} ${updates}` });
}

async function deleteUser(req, res) {
  // TODO
  const userId = req.params.userId;
  //const deletedUser = await User.findByIdAndDelete(userId);
  res.send({ data: `Hello delete usr ${userId}` });
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
