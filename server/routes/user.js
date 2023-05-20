const express = require('express');
const router = express.Router();

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

router.get('/:userId', (req, res) => {
  getUser(req, res);
});

router.post('/', (req, res) => {
  createUser(req, res);
});

router.put('/:userId', (req, res) => {
  updateUser(req, res);
});

router.delete('/:userId', (req, res) => {
  deleteUser(req, res);
});

module.exports = router;
