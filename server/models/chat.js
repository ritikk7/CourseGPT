const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    title: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Chat = mongoose.model('ChatSection', ChatSchema);

module.exports = Chat;
