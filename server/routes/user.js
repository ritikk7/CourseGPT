const express = require('express');
const router = express.Router();

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

router.get('/api/user/:id', (req, res) => {
  getUser(req, res);
});

router.post('/api/user', (req, res) => {
  createUser(req, res);
});

router.put('/api/user/:id', (req, res) => {
  updateUser(req, res);
});

router.delete('/api/user/:id', (req, res) => {
  deleteUser(req, res);
});

module.exports = router;
