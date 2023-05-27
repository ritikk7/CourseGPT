async function getCourse(req, res) {
  // TODO
  const schoolId = req.params.schoolId;
  const courseId = req.params.courseId;
  res.send({ data: `Hello get course ${courseId} for school ${schoolId}` });
}

async function createCourse(req, res) {
  // TODO
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello create new course for ${schoolId}` });
}

async function updateCourse(req, res) {
  // TODO
  const courseId = req.params.courseId;
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello update course ${courseId} for school ${schoolId}` });
}

async function deleteCourse(req, res) {
  // TODO
  const schoolId = req.params.schoolId;
  const courseId = req.params.courseId;
  res.send({ data: `Hello delete msg ${courseId} for school ${schoolId}` });
}

module.exports = {
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
