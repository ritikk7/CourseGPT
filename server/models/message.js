const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    chat: { type: Schema.Types.ObjectId, ref: 'Chat'},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    senderType: { type: String, enum: ['User', 'CourseGPT']},
    content: { type: String},
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
