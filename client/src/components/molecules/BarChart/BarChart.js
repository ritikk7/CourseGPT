import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Sentiment Analysis of the Most Asked Questions',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: false,
    },
  },
};

const BarChart = () => {
  const barChartInfo = useSelector(state => state.feedbackData.barChartData);

  const data = {
    labels: barChartInfo[0],
    datasets: [
      {
        label: 'Average Sentiment',
        data: barChartInfo[1],
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
      },
      {
        label: 'Median Sentiment',
        data: barChartInfo[2],
        backgroundColor: 'rgb(53, 162, 235)',
        stack: 'Stack 1',
      },
    ],
  };

  return (
    <div
      style={{
        padding: '48px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
