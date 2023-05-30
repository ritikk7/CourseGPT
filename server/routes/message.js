const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access chatId (ie parent route)

const {
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/message');

router.get('/:messageId', getMessage);

router.post('/', createMessage);

router.put('/:messageId', updateMessage);

router.delete('/:messageId', deleteMessage);

module.exports = router;
