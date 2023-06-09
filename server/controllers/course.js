const Course = require('../models/course');
const School = require('../models/school');

async function getCourse(req, res) {
  try {
    const courseId = req.params.courseId;
    const course = await Course.find({ _id: courseId });

    res.status(200).json({ course: course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllCourses(req, res) {
  try {
    if (req.body.courseName) {
      const course = await Course.find({ courseName: req.body.courseName });
      res.status(200).json({ course: course });
      return;
    }

    const schoolId = req.params.schoolId;
    const courses = await Course.find({ school: schoolId });

    res.status(200).json({ courses: courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createCourse(req, res) {
  try {
    const schoolId = req.params.schoolId;
    const newCourse = new Course({
      courseName: req.body.courseName,
      courseCode: req.body.courseCode,
      department: req.body.department,
      school: schoolId,
      promptTemplates: [],
    });

    const savedCourse = await newCourse.save();
    const school = await School.findById(schoolId);
    school.courses.push(savedCourse);
    await school.save();

    res.status(200).json({ course: savedCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCourse,
  getAllCourses,
  createCourse,
};
