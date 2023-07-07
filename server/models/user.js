const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    type: {
      type: String,
      enum: ['Student', 'Professor', 'Admin', 'Developer'],
      default: 'Student',
    },
    profilePicture: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    chats: [{ type: Schema.Types.ObjectId, ref: 'ChatSection' }],
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    selectedCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);
const User = mongoose.model('User', UserSchema);

module.exports = User;
