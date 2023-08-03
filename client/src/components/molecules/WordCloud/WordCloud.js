import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, Center } from '@chakra-ui/react';
import { Chart } from 'chart.js';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';
import Legend from '../Legend/Legend';

const WordCloud = () => {
  const isSidePanelVisible = useSelector(state => state.ui.isSidePanelVisible);
  const sidePanelLength = 262;
  const colorScheme = ['#c7003c', '#ff9412', '#52b788', '#0073b5', '#3c2394'];
  const wordCloudData = useSelector(state => state.feedbackData.wordCloudData);

  useEffect(() => {
    const ctx = document.getElementById('word-cloud').getContext('2d');
    Chart.register(WordCloudController, WordElement);
    const chart = new Chart(ctx, {
      type: 'wordCloud',
      data: {
        labels: wordCloudData.map(d => d.text),
        datasets: [
          {
            label: '',
            data: wordCloudData.map(d => 10 + d.value * 10),
            color: wordCloudData.map((d, index) => colorScheme[index % 5]),
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
          height="500px"
        />
      </Center>
    </div>
  );
};

export default WordCloud;
