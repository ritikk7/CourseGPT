const express = require('express');
const router = express.Router();
const {
  updateUser,
  deleteUser,
  searchUserMessages,
} = require('../controllers/user');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUser);

router.get('/:userId/messages', searchUserMessages);

module.exports = router;
