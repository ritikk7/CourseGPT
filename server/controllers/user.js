const getUser = (req, res) => {
  // TODO
  const userId = req.params.userId;
  res.send({ data: `Hello get usr ${userId}` });
};

const createUser = (req, res) => {
  // TODO
  res.send({ data: `Hello post usr` });
};

const updateUser = (req, res) => {
  // TODO
  const userId = req.params.userId;
  res.send({ data: `Hello put usr ${userId}` });
};

const deleteUser = (req, res) => {
  // TODO
  const userId = req.params.userId;
  res.send({ data: `Hello delete usr ${userId}` });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
