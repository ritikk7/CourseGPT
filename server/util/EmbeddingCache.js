const Embedding = require('../models/embedding');

class EmbeddingCache {
  // cache;
  // lastUpdated;

  constructor() {
    this.cache = {};
    this.lastUpdated = {};
  }

  async getAllByCourse(courseId) {
    // this variable is to catch cases where the user trained the model (added embeddings) before asking any questions.
    // (asking questions is what would pull all the embeddings from the database)
    let embeddingsCreatedBeforeQuestionsWereAsked =
      this.lastUpdated[courseId] &&
      this.lastUpdated[courseId].setMilliseconds(0) <=
        this.cache[courseId][0].createdAt.setMilliseconds(0);

    if (!this.cache[courseId] || embeddingsCreatedBeforeQuestionsWereAsked) {
      this.cache[courseId] = await Embedding.find({ course: courseId });
      this.lastUpdated[courseId] = new Date();
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
