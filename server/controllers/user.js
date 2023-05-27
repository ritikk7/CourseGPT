const User = require("../models/user");
const getUser = async (req, res) => {
  // TODO
  const userId = req.params.userId;
  //const user = await User.findById(userId);
  res.send({data: `Hello get usr ${userId}`});
};

const createUser = async (req, res) => {
  // TODO
  //const newUser = new User(req.body);
  //const createdUser = await newUser.save();
  res.send({ data: `Hello post usr` });
};

const updateUser = async (req, res) => {
  // TODO
  const userId = req.params.userId;
  const updates = req.body;
  //const updatedUser = await User.findByIdAndUpdate(userId, updates);
  res.send({ data: `Hello put usr ${userId} ${updates}` });
};

const deleteUser = async (req, res) => {
  // TODO
  const userId = req.params.userId;
  //const deletedUser = await User.findByIdAndDelete(userId);
  res.send({ data: `Hello delete usr ${userId}` });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
