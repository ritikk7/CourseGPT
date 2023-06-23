const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    qaPair: { type: Schema.Types.ObjectId, ref: 'QAPair' },
    rating: { type: Boolean, required: true },
    comment: { type: String, default: '' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
