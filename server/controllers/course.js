const getCourse = async (req, res) => {
  // TODO
  const schoolId = req.params.schoolId;
  const courseId = req.params.courseId;
  res.send({ data: `Hello get course ${courseId} for school ${schoolId}` });
};

const createCourse = async (req, res) => {
  // TODO
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello create new course for ${schoolId}` });
};

const updateCourse = async (req, res) => {
  // TODO
  const courseId = req.params.courseId;
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello update course ${courseId} for school ${schoolId}` });
};

const deleteCourse = async (req, res) => {
  // TODO
  const schoolId = req.params.schoolId;
  const courseId = req.params.courseId;
  res.send({ data: `Hello delete msg ${courseId} for school ${schoolId}` });
};

module.exports = {
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
