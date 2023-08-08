const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmbeddingSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    submissionId: { type: String, required: true }, // id to link embeddings created from the same text submission
    text: { type: String, required: true },
    embedding: [{ type: Number }],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

EmbeddingSchema.index({ course: 1 });

const Embedding = mongoose.model('Embedding', EmbeddingSchema);

module.exports = Embedding;
