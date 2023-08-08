const School = require('../models/school');

async function createSchool(req, res) {
  try {
    const newSchool = new School({
      name: req.body.name,
      location: req.body.location || '',
      type: req.body.type || 'University',
      website: req.body.website || '',
      logo: req.body.logo || '',
      courses: [],
    });

    const savedSchool = await newSchool.save();
    res.status(200).json({ school: savedSchool });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function getSchool(req, res) {
  try {
    const schoolId = req.params.schoolId;
    const school = await School.findById(schoolId);

    res.status(200).json({ school });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function getAllSchools(req, res) {
  try {
    const schools = await School.find({});

    res.status(200).json({ schools: schools });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getSchool,
  createSchool,
  getAllSchools,
};
