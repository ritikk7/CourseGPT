const getUser = (req, res) => {
  const userId = req.params.userId;
  res.send({ data: `Hello get ${userId}` });
};

const createUser = (req, res) => {
  res.send({ data: `Hello post` });
};

const updateUser = (req, res) => {
  const userId = req.params.userId;
  res.send({ data: `Hello put ${userId}` });
};

const deleteUser = (req, res) => {
  const userId = req.params.userId;
  res.send({ data: `Hello delete ${userId}` });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
