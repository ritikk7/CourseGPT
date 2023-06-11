/**
 * Might not need these routes, as qaPairs will be built and used only by the backend
 */

const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access chatId (ie parent route)
const {
  getQaPair,
  createQaPair,
  updateQaPair,
  deleteQaPair,
} = require('../controllers/qaPair');
const { validateToken } = require('../controllers/auth');

// router.use(validateToken);

router.get('/:qaPairId', getQaPair);

router.post('/', createQaPair);

router.put('/:qaPairId', updateQaPair);

router.delete('/:qaPairId', deleteQaPair);

module.exports = router;
