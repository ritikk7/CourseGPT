const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmbeddingSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  submissionId: { type: String }, // id to link together embeddings created from the same text submission
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

  getById: async function(id) {
    if (!this.cache[id]) {
      this.cache[id] = await Embedding.findById(id);
    }

    return this.cache[id];
  },

  getAllByCourse: async function(courseId) {
    let found = Object.values(this.cache).filter(embedding => String(embedding.course) === String(courseId));

    if (!found.length) {
      found = await Embedding.find({ course: courseId });
      if (found.length) {
        found.forEach(embedding => {
          this.cache[embedding._id] = embedding;
        });
      }
    }

    return found;
  },

  create: async function(embeddingData) {
    const newEmbedding = new Embedding(embeddingData);
    await newEmbedding.save();
    this.cache[newEmbedding._id] = newEmbedding;

    return newEmbedding;
  },

  delete: async function(id) {
    delete this.cache[id];
    return await Embedding.findByIdAndRemove(id);
  }
}

module.exports = { Embedding, EmbeddingCache };
