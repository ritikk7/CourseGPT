// embeddingBasedSearch.js

const scipy = require('scipy');
const fs = require('fs');
var DataFrame = require('dataframe-js').DataFrame;

const embeddingsPath = "./embeddings"

// relatedness function that calculates the distance of two embeddings
const defaultRelatednessFn = (x, y) => 1 - scipy.spatial.distance.cosine(x, y);

// javascript equivalent of the python zip() function
// Takes multiple arrays as arguments and returns a new array of tuples, 
// where each tuple contains the corresponding elements from the input arrays. 
// The resulting array will have a length equal to the minimum length of the input arrays.
const zip = (...arrays) => {
    const minLength = Math.min(...arrays.map(arr => arr.length));
    const result = [];
  
    for (let i = 0; i < minLength; i++) {
      result.push(arrays.map(arr => arr[i]));
    }

    return result;
}

// read the embeddings csv file and return a dataframe to use
// TODO: make this function expandable to multiple files
function readEmbeddingsCSV(path) {
    var dataframe = null;
    const files = fs.readdirSync(path);
  
    files.forEach((filename) => {
        DataFrame.fromCSV(`${path}/${filename}`)
        .then(df => {
            dataframe = df;
        })
        .catch(err=>{
            console.log(err);
        });
    });
    return dataframe;
  }
  

// Returns a list of strings and relatednesses, sorted from most related to least.
async function stringsRankedByRelatedness(openai, embedding_model, query, relatednessFn = defaultRelatednessFn, topN = 100) {
    let df = readEmbeddingsCSV(embeddingsPath);
    const queryEmbeddingResponse = await openai.createEmbedding({ model: embedding_model, input: query });
    const queryEmbedding = queryEmbeddingResponse.data[0].embedding;
    const stringsAndRelatednesses = df.map(row => {

      const embedding = row.get('embedding');
      const relatedness = relatednessFn(queryEmbedding, embedding);
      return [row.get('text'), relatedness];
    });

    stringsAndRelatednesses.sort((a, b) => b[1] - a[1]);
    const [strings, relatednesses] = zip(...stringsAndRelatednesses);
    return [strings.slice(0, topN), relatednesses.slice(0, topN)];
}

module.exports = { stringsRankedByRelatedness };