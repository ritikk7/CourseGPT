const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
