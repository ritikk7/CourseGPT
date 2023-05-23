const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access chatId (ie parent route)

const {
    getQaPair,
    createQaPair,
    updateQaPair,
    deleteQaPair,
} = require('../controllers/qaPair');

router.get('/:qaPairId', (req, res) => {
    getQaPair(req, res);
});

router.post('/', (req, res) => {
    createQaPair(req, res); //may not need this
});

router.put('/:qaPairId', (req, res) => {
    updateQaPair(req, res);
});

router.delete('/:qaPairId', (req, res) => {
    deleteQaPair(req, res);
});

module.exports = router;
