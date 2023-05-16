const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  senderType: { type: String, enum: ['User', 'CourseGPT'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message };
