const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    chat: { type: Schema.Types.ObjectId, ref: 'ChatSection' , required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' , required: true},
    role: { type: String, enum: ['user', 'system'] , required: true},
    content: { type: String , required: true},
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
