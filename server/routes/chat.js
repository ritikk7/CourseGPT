const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getChat,
  createChat,
  updateChat,
  deleteChat,
} = require('../controllers/chat');

router.get('/:chatId', (req, res) => {
  getChat(req, res);
});

router.post('/', (req, res) => {
  createChat(req, res);
});

router.put('/:chatId', (req, res) => {
  updateChat(req, res);
});

router.delete('/:chatId', (req, res) => {
  deleteChat(req, res);
});

module.exports = router;
