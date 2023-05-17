const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QAPairSchema = new Schema({
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  question: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
  answer: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
  keywords: [{ type: String, required: true }],
},
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const QAPair = mongoose.model('QAPair', QAPairSchema);

module.exports = { QAPair };
