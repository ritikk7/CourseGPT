import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

// https://react-chartjs-2.js.org/examples/scatter-chart/
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Average Sentiment',
      },
    },
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Frequency of Question Feedback',
      },
    },
  },
};

const ScatterChart = () => {
  const scatterChartData = useSelector(
    state => state.feedbackData.scatterChartData
  );
  const data = {
    datasets: [
      {
        label: 'Sentiment',
        data: scatterChartData,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <div
      style={{
        padding: '56px 48px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Scatter options={options} data={data} />
    </div>
  );
};

export default ScatterChart;
