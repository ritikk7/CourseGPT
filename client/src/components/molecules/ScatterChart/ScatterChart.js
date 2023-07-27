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
import faker from 'faker';

// https://react-chartjs-2.js.org/examples/scatter-chart/
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: 'Sentiment',
      data: Array.from({ length: 100 }, () => ({
        x: faker.datatype.number({ min: 0, max: 100 }),
        y: faker.datatype.number({ min: 0, max: 100 }) / 100,
      })),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const ScatterChart = () => {
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
