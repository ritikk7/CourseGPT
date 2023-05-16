const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QAPairSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
  answer: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
});

const QAPair = mongoose.model('QAPair', QAPairSchema);

module.exports = { QAPair };
