const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmbeddingSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    submissionId: { type: String }, // id to link embeddings created from the same text submission
    text: { type: String },
    embedding: [{ type: Number }],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

EmbeddingSchema.index({ course: 1 });

const Embedding = mongoose.model('Embedding', EmbeddingSchema);

module.exports = Embedding;
