const express = require('express');
const router = express.Router();

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

router.get('/:userId', getUser);

router.post('/', createUser);

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

module.exports = router;
