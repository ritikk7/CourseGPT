import React, { useState, useRef, useEffect } from 'react';

const WordCloudChart = () => {
  const [chart, setChart] = useState(null);
  const svg = useRef(null);

  var myWords = [
    'Hello',
    'Everybody',
    'How',
    'Are',
    'You',
    'Today',
    'It',
    'Is',
    'A',
    'Lovely',
    'Day',
    'I',
    'Love',
    'Coding',
    'In',
    'My',
    'Van',
    'Mate',
  ];

  const element = document.getElementById('word-chart');
  useEffect(() => {
    if (chart) {
      if (svg.current && element && element.firstChild) {
        svg.current.removeChild(element.firstChild);
        svg.current.appendChild(chart);
      } else {
        svg.current.appendChild(chart);
      }
    }
  }, [chart]);

  return (
    <div>
      {/* <div id="word-chart" ref={svg} style={{ margin: 'auto' }} /> */}
      Coming Soon
    </div>
  );
};

export default WordCloudChart;
