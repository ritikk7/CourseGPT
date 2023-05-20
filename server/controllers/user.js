const getUser = (req, res) => {
  // TODO
  const userId = req.params.userId;
  res.send({ data: `Hello get ${userId}` });
};

const createUser = (req, res) => {
  // TODO
  res.send({ data: `Hello post` });
};

const updateUser = (req, res) => {
  // TODO
  const userId = req.params.userId;
  res.send({ data: `Hello put ${userId}` });
};

const deleteUser = (req, res) => {
  // TODO
  const userId = req.params.userId;
  res.send({ data: `Hello delete ${userId}` });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
