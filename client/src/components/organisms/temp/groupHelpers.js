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

// async getSimilarity(list_sentences) {
//   this.setState({ analyzing_text: true });

//   const embeddings = await this.getEmbeddings(list_sentences);
//   const cosineSimilarityMatrix = GroupHelpers.cosineSimilarityMatrix(embeddings.arraySync());
//   const groups = GroupHelpers.formGroups(cosineSimilarityMatrix);

//   let htmlGroups = '';
//   for (let i in groups) {
//     htmlGroups += `<br/><b>Group ${parseInt(i) + 1}</b><br/>`;
//     for (let j in groups[i]) {
//       htmlGroups += `${list_sentences[groups[i][j]]}<br/>`;
//     }
//   }

//   this.setState({
//     output_resultshtml: htmlGroups,
//     analyzing_text: false,
//   });
// }

// render() {
//   const { output_resultshtml } = this.state;

//   return (
//     <div>
//       <h1>Sentence Similarity with TensorFlow.js Sentence Encoder</h1>
//       <div>
//         <div dangerouslySetInnerHTML={{ __html: output_resultshtml }}></div>
//       </div>
//     </div>
//   );
// }
