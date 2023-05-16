const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true },
  department: { type: String, required: true },
  school: { type: Schema.Types.ObjectId, ref: 'School' }, // reference to a school instance
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = { Course };
