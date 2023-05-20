const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ['University', 'College', 'High School'],
      required: true,
    },
    website: { type: String, default: '' },
    logo: { type: String, default: '' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const School = mongoose.model('School', SchoolSchema);

module.exports = { School };
