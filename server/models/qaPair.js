const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QAPairSchema = new Schema(
  {
    chat: { type: Schema.Types.ObjectId, ref: 'ChatSection' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    question: { type: Schema.Types.ObjectId, ref: 'Message' },
    answer: { type: Schema.Types.ObjectId, ref: 'Message' },
    keywords: { type: [String], default: [] },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const QAPair = mongoose.model('QAPair', QAPairSchema);

module.exports = QAPair;
