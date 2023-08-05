import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Legend from '../Legend/Legend';
import styles from './BubbleChart.module.css';
import { useSelector } from 'react-redux';

const BubbleChart = () => {
  const [bubbleChart, setBubbleChart] = useState(null);
  const svg = useRef(null);
  const colorScheme = ['#ed475b', '#f59749', '#d5f252', '#18c7be', '#3f48c4'];
  const bubbleChartData = useSelector(
    state => state.feedbackData.bubbleChartData
  );

  // https://observablehq.com/@d3/bubble-chart/2?intent=fork
  const prepareGraph = () => {
    const width = window.screen.width;
    const height = 700;
    const margin = 1;
    const name = d => d.id?.split('.').pop();
    const names = d => name(d)?.split(/(?=[A-Z][a-z])|\s+/g);

    const format = d3.format(',d');

    var color = d3
      .scaleThreshold()
      .domain([0.2, 0.4, 0.6, 0.8])
      .range(colorScheme);

    const pack = d3
      .pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(3);

    const root = pack(
      d3.hierarchy({ children: bubbleChartData }).sum(d => d.value)
    );

    const svg = d3
      .create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-margin, -margin, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')
      .attr('text-anchor', 'middle');

    const node = svg
      .append('g')
      .selectAll()
      .data(root.leaves())
      .join('g')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .on('mouseout', () => {
        d3.selectAll('.nvtooltip').remove();
      });

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    node
      .append('circle')
      .attr('fill', d => color(d.data.sentiment))
      .attr('r', d => d.r)
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(
            `${d.data.id}<br>${format(d.value)}<br>Sentiment: ${
              d.data.sentiment
            }`
          )
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(200).style('opacity', 0);
      });

    const text = node.append('text').attr('clip-path', d => `circle(${d.r})`);

    text
      .selectAll()
      .data(d => names(d.data))
      .join('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
      .text(d => d);

    text
      .append('tspan')
      .attr('x', 0)
      .attr('y', d => `${names(d.data).length / 2 + 0.35}em`)
      .attr('fill-opacity', 0.7)
      .text(d => format(d.value));

    const chart = Object.assign(svg.node(), {});
    setBubbleChart(chart);
  };

  useEffect(() => {
    prepareGraph();
  }, []);

  const element = document.getElementById('chart-container');
  useEffect(() => {
    if (bubbleChart) {
      if (svg.current && element && element.firstChild) {
        svg.current.removeChild(element.firstChild);
        svg.current.appendChild(bubbleChart);
      } else {
        svg.current.appendChild(bubbleChart);
      }
    }
  }, [bubbleChart]);

  return (
    <div className={styles.fade}>
      <Legend colorScheme={colorScheme} />
      <div id="chart-container" ref={svg} style={{ margin: 'auto' }} />
    </div>
  );
};

export default BubbleChart;
