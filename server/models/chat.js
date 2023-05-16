const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = { Chat };
