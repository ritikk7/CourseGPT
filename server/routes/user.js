const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/user');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.patch('/', updateUser);

module.exports = router;
