const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: '' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    settings: {
      theme: { type: String, enum: ['Dark', 'Light'], default: 'Light' },
      //...
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
