const express = require('express');
const router = express.Router();
const { updateUser, deleteUser } = require('../controllers/user');
const { validateToken } = require('../controllers/auth');

// router.use(validateToken);

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

module.exports = router;
