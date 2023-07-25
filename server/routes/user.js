const express = require('express');
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getUserMessages,
} = require('../controllers/user');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUser);

router.get('/:userId/messages', getUserMessages);

module.exports = router;
