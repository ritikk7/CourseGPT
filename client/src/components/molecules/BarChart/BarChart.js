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
import faker from 'faker';

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
      text: 'Sentiment Analysis of the 5 Most Asked Questions',
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

const labels = ['Cats', 'Focus', 'question', 'April', 'Exam'];

const data = {
  labels,
  datasets: [
    {
      label: 'Average Sentiment',
      data: labels.map(
        () => faker.datatype.number({ min: 0, max: 1000 }) / 1000
      ),
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Median Sentiment',
      data: labels.map(
        () => faker.datatype.number({ min: 0, max: 1000 }) / 1000
      ),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 1',
    },
  ],
};

const BarChart = () => {
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
