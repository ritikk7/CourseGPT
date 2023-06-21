const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getChat,
  createChat,
  updateChat,
  getChats,
  updateChats,
} = require('../controllers/chat');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.get('/:chatId', getChat);

router.post('/', createChat);

router.get('/', getChats);

router.patch('/:chatId', updateChat); // for setting deleted = true

router.patch('/', updateChats); // for setting deleted = true

module.exports = router;
