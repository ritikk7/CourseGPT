const DataFrame = require('dataframe-js').DataFrame;
const similarity = require('compute-cosine-similarity');
const { resolve } = require('path');
const fs = require('fs');
const defaultRelatednessFn = (x, y) => similarity(x, y);

async function readEmbeddingsCSV(absolutePath) {
  return await DataFrame.fromCSV(absolutePath);
}

function removeSpacesAndLowercase(str) {
  return str.replace(/\s/g, '').toLowerCase();
}

async function readEmbeddingsFromDirectory(schoolCode, courseCode) {
  const directoryPath = resolve(
    __dirname,
    'embeddings/',
    schoolCode,
    courseCode
  );
  const files = fs.readdirSync(directoryPath);
  const dataFrames = await Promise.all(
    files.map(file => {
      console.log(`${directoryPath}/${file}`);
      return readEmbeddingsCSV(`${directoryPath}/${file}`);
    })
  );
  const firstDf = dataFrames[0];
  return dataFrames.reduce((df1, df2) => df1.union(df2), firstDf);
}

async function stringsRankedByRelatedness(
  embedding_model,
  query,
  course,
  openai,
  relatednessFn = defaultRelatednessFn,
  topN = 100
) {
  const betterSchoolCode = removeSpacesAndLowercase(course.school.name);
  const betterCourseCode = removeSpacesAndLowercase(course.courseCode);
  const queryEmbeddingResponse = await openai.createEmbedding({
    model: embedding_model,
    input: query,
  });
  const queryEmbedding = queryEmbeddingResponse.data.data[0].embedding;
  let df;

  try {
    console.log(
      `Reading embeddings for ${betterSchoolCode}/${betterCourseCode}`
    );
    df = await readEmbeddingsFromDirectory(betterSchoolCode, betterCourseCode);
  } catch (error) {
    console.error(`Failed to read embeddings: ${error}`);
    return [];
  }

  let relatednessesDf = df.map(row => {
    if (!row.get('embedding')) {
      console.log(row);
    } else {
      try {
        const embedding = JSON.parse(row.get('embedding'));
        const relatedness = relatednessFn(queryEmbedding, embedding);
        return row.set('embedding', relatedness);
      } catch (error) {
        console.error(error);
      }
    }
  });

  let relatednessesSortedDf = relatednessesDf
    .sortBy('embedding', true)
    .slice(0, topN);

  return relatednessesSortedDf.toArray('text');
}

module.exports = { stringsRankedByRelatedness };
