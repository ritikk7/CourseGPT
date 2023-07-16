import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as GroupHelpers from './groupHelpers'; // Import the backend functions from the separate file

class NlpSentenceEncoderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list_sentences: [],
      input_sentences: '',
      input_threshold: 0.5,
      output_resultshtml: '',
      analyzing_text: false,
    };
  }

  async componentDidMount() {
    await GroupHelpers.initializeTensorflow();

    this.setState(
      {
        input_sentences: `Will it snow tomorrow?
Recently a lot of hurricanes have hit the US
Global warming is real

An apple a day, keeps the doctors away
Eating strawberries is healthy

what is your age?
How old are you?
How are you?

The dog bit Johnny
Johnny bit the dog

The cat ate the mouse
The mouse ate the cat
`,
        input_threshold: 0.5,
      },
      () => {
        this.onClickAnalyzeSentences();
      }
    );
  }

  onClickAnalyzeSentences = async () => {
    const { input_sentences } = this.state;
    const inputSentencesArray = input_sentences.split('\n').filter(Boolean);
    const list_sentences = [...inputSentencesArray];

    this.setState({ list_sentences });

    await this.getSimilarity(list_sentences);
  };

  getEmbeddings = async (list_sentences) => {
    const model = await GroupHelpers.loadModel();
    const embeddings = await GroupHelpers.getEmbeddings(model, list_sentences);
    return embeddings;
  };

  cosineSimilarityMatrix = (matrix) => {
    const cosineSimilarityMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      const row = [];
      for (let j = 0; j < i; j++) {
        row.push(cosineSimilarityMatrix[j][i]);
      }
      row.push(1);
      for (let j = i + 1; j < matrix.length; j++) {
        row.push(GroupHelpers.similarity(matrix[i], matrix[j]));
      }
      cosineSimilarityMatrix.push(row);
    }
    return cosineSimilarityMatrix;
  };

  formGroups = (cosineSimilarityMatrix) => {
    const dictKeysInGroup = {};
    const groups = [];

    for (let i = 0; i < cosineSimilarityMatrix.length; i++) {
      const thisRow = cosineSimilarityMatrix[i];
      for (let j = i; j < thisRow.length; j++) {
        if (i !== j) {
          const simScore = cosineSimilarityMatrix[i][j];

          if (simScore > this.state.input_threshold) {
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

    const returnGroups = groups.map((group) => [...new Set(group)]);

    return returnGroups;
  };

  async getSimilarity(list_sentences) {
    this.setState({ analyzing_text: true });

    const embeddings = await this.getEmbeddings(list_sentences);
    const cosineSimilarityMatrix = this.cosineSimilarityMatrix(embeddings.arraySync());
    const groups = this.formGroups(cosineSimilarityMatrix);

    let htmlGroups = '';
    for (let i in groups) {
      htmlGroups += `<br/><b>Group ${parseInt(i) + 1}</b><br/>`;
      for (let j in groups[i]) {
        htmlGroups += `${list_sentences[groups[i][j]]}<br/>`;
      }
    }

    this.setState({
      output_resultshtml: htmlGroups,
      analyzing_text: false,
    });
  }

  render() {
    const { output_resultshtml } = this.state;

    return (
      <div>
        <h1>Sentence Similarity with TensorFlow.js Sentence Encoder</h1>
        <div>
          <div dangerouslySetInnerHTML={{ __html: output_resultshtml }}></div>
        </div>
      </div>
    );
  }
}

export default NlpSentenceEncoderComponent;




    // if (groups && groups.length > 0) {  
    // htmlGroups = (
    //   <>
    //     {groups.map((group, i) => (
    //       <React.Fragment key={i}>
    //         <br />
    //         <b>Group {parseInt(i) + 1}</b>
    //         <br />
    //         {group.map((index) => (
    //           <React.Fragment key={index}>
    //             {list_sentences[index]}
    //             <br />
    //           </React.Fragment>
    //         ))}
    //       </React.Fragment>
    //     ))}
    //   </>
    // );
            // }

                    {/* {htmlGroups} */}
