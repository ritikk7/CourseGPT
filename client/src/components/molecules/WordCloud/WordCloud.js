import React from 'react';
import ReactWordcloud from 'react-wordcloud';

import { Resizable } from 're-resizable';
import Words from './Words';
import { useSelector } from 'react-redux';
import { Text, Center } from '@chakra-ui/react';

const WordCloud = () => {
  const resizeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
  };

  const isSidePanelVisible = useSelector(state => state.ui.isSidePanelVisible);

  return (
    <div>
      <Text
        fontSize="xl"
        textAlign="center"
        fontWeight="bold"
        color="black"
        m="auto"
        mt="30px"
      >
        Top Words From The Last 100 Questions
      </Text>
      <Center>
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
      </Center>
    </div>
  );
};

export default WordCloud;
