const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    message: { type: Schema.Types.ObjectId, ref: 'Message'},
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
