import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

export async function initializeTensorflow() {
  await tf.ready();
}

export async function getEmbeddings(list_sentences) {
  const model = await use.load();
  return await model.embed(list_sentences);
}

export function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

export function similarity(a, b) {
  const magnitudeA = Math.sqrt(dot(a, a));
  const magnitudeB = Math.sqrt(dot(b, b));
  if (magnitudeA && magnitudeB) {
    return dot(a, b) / (magnitudeA * magnitudeB);
  } else {
    return false;
  }
}

export function cosineSimilarityMatrix(matrix) {
  const cosineSimilarityMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    const row = [];
    for (let j = 0; j < i; j++) {
      row.push(cosineSimilarityMatrix[j][i]);
    }
    row.push(1);
    for (let j = i + 1; j < matrix.length; j++) {
      row.push(similarity(matrix[i], matrix[j]));
    }
    cosineSimilarityMatrix.push(row);
  }
  return cosineSimilarityMatrix;
}

export function formGroups(cosineSimilarityMatrix, listSentences) {
  const dictKeysInGroup = {};
  const groups = [];

  for (let i = 0; i < cosineSimilarityMatrix.length; i++) {
    const thisRow = cosineSimilarityMatrix[i];
    for (let j = i; j < thisRow.length; j++) {
      if (i !== j) {
        const simScore = cosineSimilarityMatrix[i][j];

        if (simScore > 0.5) {
          let groupNum;

          if (!(i in dictKeysInGroup)) {
            groupNum = groups.length;
            dictKeysInGroup[i] = groupNum;
          } else {
            groupNum = dictKeysInGroup[i];
          }
          if (!(j in dictKeysInGroup)) {
            dictKeysInGroup[j] = groupNum;
          }

          if (groups.length <= groupNum) {
            groups.push([]);
          }
          groups[groupNum].push(i);
          groups[groupNum].push(j);
        }
      }
    }
  }

  const groupData = groups.map(group => [...new Set(group)]);
  const returnGroups = [];
  for (let i in groupData) {
    let temp = [];
    for (let j in groupData[i]) {
      const index = groupData[i][j];
      if (index >= 0 && index < listSentences.length) {
        temp.push(listSentences[index]);
      }
    }
    returnGroups.push(temp);
  }

  return returnGroups;
}

/*
Useful links that I referenced:
- Tensorflow JS docs (ex: https://www.tensorflow.org/js/guide/nodejs)
- https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder
- https://github.com/jinglescode/demos/tree/master/src/app/components/nlp-sentence-encoder
- https://github.com/jinglescode/textual-similarity-universal-sentence-encoder
- https://bensonruan.com/twitter-sentiment-analysis-with-tensorflowjs/
- https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Entities-Keywords-Extraction/Hotel%20Reviews%20Analysis%20-%20Entities%20and%20Keywords.ipynb
- https://cloud.ibm.com/docs/natural-language-understanding?topic=natural-language-understanding-additional-resources
*/
