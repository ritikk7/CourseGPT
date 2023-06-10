const School = require('../models/school');

async function getSchool(req, res) {
  try {
    const schoolId = req.params.schoolId;
    const school = await School.find({ _id: schoolId });

    res.status(200).json({ school: school });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllSchools(req, res) {
  try {
    // if (req.body.name) {
    //   const school = await School.find({ name: req.body.name });
    //   res.status(200).json({ school: school });
    //   return;
    // }
    const schools = await School.find();

    res.status(200).json({ schools: schools });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createSchool(req, res) {
  try {
    const newSchool = new School({
      name: req.body.name,
      location: req.body.location,
      type: req.body.type,
      website: req.body.website ? req.body.website : '',
      logo: req.body.logo ? req.body.logo : '',
      courses: [],
    });

    const savedSchool = await newSchool.save();
    res.status(200).json({ school: savedSchool });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateSchool(req, res) {
  try {
    const schoolId = req.params.schoolId;
    const school = await School.find({ _id: schoolId });
    school.courseName = req.body.courseName
      ? req.body.courseName
      : school.courseName;
    school.courseCode = req.body.courseCode
      ? req.body.courseCode
      : school.courseCode;
    school.department = req.body.department
      ? req.body.department
      : school.department;
    school.website = req.body.website ? req.body.website : school.website;
    school.logo = req.body.logo ? req.body.logo : school.logo;

    const savedSchool = await school.save();
    res.status(200).json({ school: savedSchool });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getSchool,
  createSchool,
  getAllSchools,
  updateSchool,
};
