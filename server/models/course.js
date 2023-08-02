const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseName: { type: String },
  courseCode: { type: String, required: true },
  department: { type: String },
  school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
  promptTemplates: [{ type: String }],
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
