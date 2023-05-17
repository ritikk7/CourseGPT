const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseRequestSchema = new Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseName: { type: String, required: true },
    courseCode: { type: String, required: true },
    department: { type: String, required: true },
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    notified: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const CourseRequest = mongoose.model('CourseRequest', CourseRequestSchema);

module.exports = { CourseRequest };
