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

const Embedding = mongoose.model('Embedding', EmbeddingSchema);

let EmbeddingCache = {
  cache: {},
  lastUpdated: null,

  getAllByCourse: async function (courseId) {
    const now = new Date();
    let found = Object.values(this.cache).filter(
      embedding => String(embedding.course) === String(courseId)
    );

    if (
      !found.length ||
      (this.lastUpdated && this.lastUpdated < found[0].updatedAt)
    ) {
      found = await Embedding.find({ course: courseId });
      for (const embedding of found) {
        this.cache[embedding._id] = embedding;
      }
      this.lastUpdated = now;
    }

    return found;
  },

  create: async function (embeddingData) {
    const newEmbedding = new Embedding(embeddingData);
    await newEmbedding.save();
    this.cache[newEmbedding._id] = new Embedding(embeddingData);
    this.lastUpdated = new Date();

    return newEmbedding;
  },
};

module.exports = { Embedding, EmbeddingCache };
