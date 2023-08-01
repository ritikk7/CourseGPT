const express = require('express');
const router = express.Router();
const { updateUser, deleteUser } = require('../controllers/user');
const { validateToken } = require('../controllers/auth');

router.use(validateToken);

router.patch('/', updateUser);

router.delete('/', deleteUser);

module.exports = router;
