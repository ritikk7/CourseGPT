const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    chat: { type: Schema.Types.ObjectId, ref: 'ChatSection' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['user', 'system'] },
    content: { type: String },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
