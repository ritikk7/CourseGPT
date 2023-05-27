async function getSchool(req, res) {
  // TODO
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello get school ${schoolId}` });
}

async function createSchool(req, res) {
  // TODO
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello create school in ${schoolId}` });
}

async function updateSchool(req, res) {
  // TODO
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello update school ${schoolId}` });
}

async function deleteSchool(req, res) {
  // TODO (need to delete associated courses when this happens)
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello delete school ${schoolId}` });
}

module.exports = {
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool,
};
