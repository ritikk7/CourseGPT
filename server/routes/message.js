const express = require('express');
const router = express.Router();

const {
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/message');

router.get('/api/chats/:chatId/messages/:messageId', (req, res) => {
  getMessage(req, res);
});

router.post('/api/chats/:chatId/messages', (req, res) => {
  createMessage(req, res);
});

router.put('/api/chats/:chatId/messages/:messageId', (req, res) => {
  updateMessage(req, res);
});

router.delete('/api/chats/:chatId/messages/:messageId', (req, res) => {
  deleteMessage(req, res);
});

module.exports = router;
