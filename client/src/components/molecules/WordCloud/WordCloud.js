import React from 'react';
import ReactWordcloud from 'react-wordcloud';

import { Resizable } from 're-resizable';
import Words from './Words';

const WordCloud = ({ isSidepanelVisible }) => {
  const resizeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px #ddd',
    background: '#f0f0f0',
    marginTop: 64,
  };

  return (
    <Resizable
      size={{
        width: isSidepanelVisible ? 1000 : window.screen.width,
        height: 600,
      }}
      style={resizeStyle}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <ReactWordcloud words={Words} options={{ fontSizes: [24, 48] }} />
      </div>
    </Resizable>
  );
};

export default WordCloud;
