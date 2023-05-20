const express = require('express');
const router = express.Router();

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

router.get('/api/users/:userId', (req, res) => {
  getUser(req, res);
});

router.post('/api/users', (req, res) => {
  createUser(req, res);
});

router.put('/api/users/:userId', (req, res) => {
  updateUser(req, res);
});

router.delete('/api/users/:userId', (req, res) => {
  deleteUser(req, res);
});

module.exports = router;
