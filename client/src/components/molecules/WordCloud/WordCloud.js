import React, { useEffect } from 'react';
import words from './Words';
import { useSelector } from 'react-redux';
import { Text, Center } from '@chakra-ui/react';
import { Chart } from 'chart.js';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';

const WordCloud = () => {
  const isSidePanelVisible = useSelector(state => state.ui.isSidePanelVisible);
  const sidePanelLength = 262;

  useEffect(() => {
    const ctx = document.getElementById('word-cloud').getContext('2d');
    Chart.register(WordCloudController, WordElement);
    const chart = new Chart(ctx, {
      type: 'wordCloud',
      data: {
        labels: words.map(d => d.key),
        datasets: [
          {
            label: '',
            data: words.map(d => 10 + d.value * 10),
          },
        ],
      },
      options: {
        title: {
          display: false,
          text: 'Chart.js Word Cloud',
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, []);

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
        <canvas
          id="word-cloud"
          width={
            isSidePanelVisible
              ? window.screen.width - sidePanelLength
              : window.screen.width
          }
          height="600px"
        />
      </Center>
    </div>
  );
};

export default WordCloud;
