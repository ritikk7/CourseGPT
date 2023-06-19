// embeddingBasedSearch.js
const fs = require('fs');
var DataFrame = require('dataframe-js').DataFrame;
var similarity = require( 'compute-cosine-similarity' );

const embeddingsPath = './api/embeddings';

// relatedness function that calculates the distance of two embeddings
const defaultRelatednessFn = (x, y) => similarity( x, y );

// read the embeddings csv file and return a dataframe to use
// TODO: make this function expandable to multiple files
function readEmbeddingsCSV(path) {
    const files = fs.readdirSync(path);
    const filename = files[0];
    let filePath = `${__dirname}/embeddings/${filename}`;

    return DataFrame.fromCSV(filePath);
}
  

// Returns a list of strings and relatednesses, sorted from most related to least.
async function stringsRankedByRelatedness(embedding_model, query, openai, relatednessFn = defaultRelatednessFn, topN = 100) {
    const queryEmbeddingResponse = await openai.createEmbedding({ model: embedding_model, input: query });
    const queryEmbedding = queryEmbeddingResponse.data.data[0].embedding;
    let df = await readEmbeddingsCSV(embeddingsPath);
    
    let relatednessesDf = df.map(row => {
      const embedding = JSON.parse(row.get('embedding'));
      const relatedness = relatednessFn(queryEmbedding, embedding);
      return row.set('embedding', relatedness);
    });

    let relatednessesSortedDf = relatednessesDf.sortBy('embedding', true).slice(0, topN);
    return relatednessesSortedDf.toArray('text');
}

module.exports = { stringsRankedByRelatedness };