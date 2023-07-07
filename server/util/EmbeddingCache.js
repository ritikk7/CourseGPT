const Embedding = require('../models/embedding');

class EmbeddingCache {
  // cache;
  // lastUpdated;

  constructor() {
    this.cache = {};
    this.lastUpdated = {};
  }

  async getAllByCourse(courseId) {
    const now = new Date();

    if (
      !this.cache[courseId] ||
      (this.lastUpdated[courseId] &&
        this.lastUpdated[courseId] < this.cache[courseId][0].updatedAt)
    ) {
      this.cache[courseId] = await Embedding.find({ course: courseId });
      this.lastUpdated[courseId] = now;
    }

    return this.cache[courseId];
  }

  async create(embeddingData) {
    const newEmbedding = new Embedding(embeddingData);
    await newEmbedding.save();

    if (!this.cache[newEmbedding.course]) {
      this.cache[newEmbedding.course] = [];
    }

    this.cache[newEmbedding.course].push(newEmbedding);
    this.lastUpdated[newEmbedding.course] = new Date();

    return newEmbedding;
  }
}

module.exports = { EmbeddingCache: new EmbeddingCache() };
