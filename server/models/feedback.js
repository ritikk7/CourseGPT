const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    qaPair: { type: Schema.Types.ObjectId, ref: 'QAPair', required: true },
    rating: { type: Boolean, required: true },
    comment: { type: String, default: '' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
