const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
});

const School = mongoose.model('School', SchoolSchema);

module.exports = { School };
