const Embedding = require('../models/embedding');

class EmbeddingCache {
  // cache;
  // lastUpdated;

  constructor() {
    this.cache = {};
    this.lastUpdated = null;
  }

  async getAllByCourse(courseId) {
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
  }

  async create(embeddingData) {
    const newEmbedding = new Embedding(embeddingData);
    await newEmbedding.save();
    this.cache[newEmbedding._id] = new Embedding(embeddingData);
    this.lastUpdated = new Date();

    return newEmbedding;
  }
}
module.exports = { EmbeddingCache: new EmbeddingCache() };
