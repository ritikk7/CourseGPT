const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access chatId (ie parent route)
const {
  getMessage,
  createUserMessage,
  updateMessage,
  deleteMessage,
  getAllMessages,
} = require('../controllers/message');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.get('/:messageId', getMessage);

router.get('/', getAllMessages);

router.post('/', createUserMessage);

router.put('/:messageId', updateMessage);

router.delete('/:messageId', deleteMessage);

module.exports = router;
