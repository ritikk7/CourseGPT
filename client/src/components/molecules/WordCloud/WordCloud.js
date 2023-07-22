import React from 'react';
import ReactWordcloud from 'react-wordcloud';

import { Resizable } from 're-resizable';
import Words from './Words';
import { useSelector } from 'react-redux';

const WordCloud = () => {
  const resizeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
  };

  const isSidePanelVisible = useSelector(state => state.ui.isSidePanelVisible);

  return (
    <Resizable
      size={{
        width: isSidePanelVisible
          ? window.screen.width - 262
          : window.screen.width,
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
