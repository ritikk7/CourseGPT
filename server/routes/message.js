const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access chatId (ie parent route)
const {
  createUserMessage,
  getAllMessages,
  getGptResponse,
} = require('../controllers/message');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.get('/', getAllMessages);

router.post('/', createUserMessage);
router.post('/gpt-response', getGptResponse);

module.exports = router;
