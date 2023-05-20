const express = require('express');
const router = express.Router();

const {
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/message');

router.get('/:messageId', (req, res) => {
  getMessage(req, res);
});

router.post('/', (req, res) => {
  createMessage(req, res); //may not need this
});

router.put('/:messageId', (req, res) => {
  updateMessage(req, res);
});

router.delete('/:messageId', (req, res) => {
  deleteMessage(req, res);
});

module.exports = router;
