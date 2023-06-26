const DataFrame = require('dataframe-js').DataFrame;
const similarity = require('compute-cosine-similarity');
const { resolve } = require('path');
const defaultRelatednessFn = (x, y) => similarity(x, y);

async function readEmbeddingsCSV(filename) {
  const absolutePath = resolve(__dirname, 'embeddings/', filename);
  return await DataFrame.fromCSV(absolutePath);
}

function removeSpacesAndLowercase(str) {
  return str.replace(/\s/g, '').toLowerCase();
}

async function stringsRankedByRelatedness(
  embedding_model,
  query,
  course,
  openai,
  relatednessFn = defaultRelatednessFn,
  topN = 100
) {
  const betterCourseCode = removeSpacesAndLowercase(course.courseCode);
  const embeddingsFileName = `${betterCourseCode}withEmbeddings.csv`;
  const queryEmbeddingResponse = await openai.createEmbedding({
    model: embedding_model,
    input: query,
  });
  const queryEmbedding = queryEmbeddingResponse.data.data[0].embedding;
  let df = await readEmbeddingsCSV(embeddingsFileName);

  let relatednessesDf = df.map(row => {
    const embedding = JSON.parse(row.get('embedding'));
    const relatedness = relatednessFn(queryEmbedding, embedding);
    return row.set('embedding', relatedness);
  });

  let relatednessesSortedDf = relatednessesDf
    .sortBy('embedding', true)
    .slice(0, topN);

  return relatednessesSortedDf.toArray('text');
}

module.exports = { stringsRankedByRelatedness };
