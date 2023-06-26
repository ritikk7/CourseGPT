const Course = require('../models/course');
const School = require('../models/school');
const {
  createEmbeddings,
  addContentToCourseTrainingData,
  createEmbeddingsForAllFiles,
} = require('../gpt/createEmbeddings');

async function getSchoolCourse(req, res) {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSchoolCourses(req, res) {
  try {
    const schoolId = req.params.schoolId;
    const courses = await Course.find({ school: schoolId });

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllCourses(req, res) {
  try {
    const courses = await Course.find({});

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createCourse(req, res) {
  try {
    const schoolId = req.params.schoolId;
    const newCourse = new Course({
      courseName: req.body.courseName || req.body.courseCode,
      courseCode: req.body.courseCode,
      department:
        req.body.department || req.body.courseCode.match(/^[a-zA-Z]+/)[0],
      school: schoolId,
      promptTemplates: req.body.promptTemplates || [],
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

async function improveModel(req, res) {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate('school');

    await addContentToCourseTrainingData(course, req.body.content);
    await createEmbeddingsForAllFiles(course);

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message + error.stack });
  }
}

module.exports = {
  getSchoolCourse,
  getSchoolCourses,
  getAllCourses,
  createCourse,
  improveModel,
};
