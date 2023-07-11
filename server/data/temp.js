require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');

// const plotly_heatmap = {data:[], layout:{}};
const input_threshold = 0.5;
// const output_resultshtml = "";
// const analyzing_text = true;

// want to make a hashmap of question: {feedback}
async function onClickAnalyzeSentences(sentences) {
  const list_sentences = [];
  const questionAndFeedback = {};
  sentences.forEach(sentence => {
    list_sentences.push(sentence[2].content);
    questionAndFeedback[sentence[2].content] = sentence[0];
  });

  console.log('on click function');

  let embeddings = await get_embeddings(list_sentences);

  console.log('temp 2');

  let cosine_similarity_matrix = cosine_matrix(embeddings.arraySync());
  // console.log('temp 3');

  let groups = form_groups(cosine_similarity_matrix);
  const toReturn = [];

  for (let i in groups) {
    let associatedFeedback = '';
    for (let j in groups[i]) {
      associatedFeedback += questionAndFeedback[j] + ' ';
    }
    // Example question, length of array (for weightings), feedback for question group
    toReturn.push([
      questionAndFeedback[i][0],
      groups[i].length,
      associatedFeedback,
    ]);
  }

  console.log(toReturn[0]);
  console.log(toReturn);

  return toReturn;

  //   analyzeSentiment(toReturn)
}

async function get_embeddings(list_sentences) {
  console.log('embeddings');

  use.load().then(model => {
    console.log('model here');

    model.embed(list_sentences).then(embeddings => {
      console.log('embeddings done');

      return embeddings;
    });
  });
}

function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

function similarity(a, b) {
  var magnitudeA = Math.sqrt(dot(a, a));
  var magnitudeB = Math.sqrt(dot(b, b));
  if (magnitudeA && magnitudeB) return dot(a, b) / (magnitudeA * magnitudeB);
  return 0;
}

function cosine_matrix(matrix) {
  console.log('temp 3');
  let cosine_similarity_matrix = [];
  for (let i = 0; i < matrix.length; i++) {
    let row = [];
    for (let j = 0; j < i; j++) {
      row.push(cosine_similarity_matrix[j][i]);
    }
    row.push(1);
    for (let j = i + 1; j < matrix.length; j++) {
      row.push(similarity(matrix[i], matrix[j]));
    }
    cosine_similarity_matrix.push(row);
  }
  return cosine_similarity_matrix;
}

// eslint-disable-next-line max-statements
function form_groups(cosine_similarity_matrix) {
  let dict_keys_in_group = {};
  let groups = [];

  for (let i = 0; i < cosine_similarity_matrix.length; i++) {
    var this_row = cosine_similarity_matrix[i];
    for (let j = i; j < this_row.length; j++) {
      if (i != j) {
        let sim_score = cosine_similarity_matrix[i][j];
        if (sim_score > input_threshold) {
          let group_num;

          if (!(i in dict_keys_in_group)) {
            group_num = groups.length;
            dict_keys_in_group[i] = group_num;
          } else {
            group_num = dict_keys_in_group[i];
          }
          if (!(j in dict_keys_in_group)) {
            dict_keys_in_group[j] = group_num;
          }

          if (groups.length <= group_num) {
            groups.push([]);
          }
          groups[group_num].push(i);
          groups[group_num].push(j);
        }
      }
    }
  }

  let return_groups = [];
  for (var i in groups) {
    return_groups.push(Array.from(new Set(groups[i])));
  }

  console.log(return_groups);
  return return_groups;
}

async function analyzeSentiment(questionGroups) {}

module.exports = {
  onClickAnalyzeSentences,
};

/** Reference Links:
- https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder
- https://github.com/jinglescode/textual-similarity-universal-sentence-encoder
- https://bensonruan.com/twitter-sentiment-analysis-with-tensorflowjs/
- Tensorflow docs
 */
