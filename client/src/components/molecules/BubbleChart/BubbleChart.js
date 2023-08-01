import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Legend from '../Legend/Legend';
import styles from './BubbleChart.module.css';

export const colorScheme = [
  '#ed475b',
  '#f59749',
  '#d5f252',
  '#18c7be',
  '#3f48c4',
];

const BubbleChart = () => {
  const [bubbleChart, setBubbleChart] = useState(null);
  const svg = useRef(null);
  const dummyData = [
    {
      id: 'flare.analytics.cluster.AgglomerativeCluster',
      value: 3938,
      sentiment: 0.5,
    },
    {
      id: 'flare.analytics.cluster.CommunityStructure',
      value: 3812,
      sentiment: 0.8,
    },
    {
      id: 'flare.analytics.cluster.HierarchicalCluster',
      value: 6714,
      sentiment: 1,
    },
    { id: 'flare.analytics.cluster.MergeEdge', value: 743, sentiment: 0.3 },
    {
      id: 'flare.analytics.graph.BetweennessCentrality',
      value: 3534,
      sentiment: 0.1,
    },
    { id: 'flare.analytics.graph.LinkDistance', value: 5731, sentiment: 0.15 },
    { id: 'flare.analytics.graph.MaxFlowMinCut', value: 7840, sentiment: 0.33 },
    { id: 'flare.analytics.graph.ShortestPaths', value: 5914, sentiment: 0.2 },
    { id: 'flare.analytics.graph.SpanningTree', value: 3416, sentiment: 0.88 },
    {
      id: 'flare.analytics.optimization.AspectRatioBanker',
      value: 7074,
      sentiment: 0.56,
    },
    { id: 'flare.animate.Easing', value: 17010, sentiment: 0.49 },
    { id: 'flare.animate.FunctionSequence', value: 5842, sentiment: 0.99 },
    {
      id: 'flare.animate.interpolate.ArrayInterpolator',
      value: 1983,
      sentiment: 0.78,
    },
    {
      id: 'flare.animate.interpolate.ColorInterpolator',
      value: 2047,
      sentiment: 0.18,
    },
    {
      id: 'flare.animate.interpolate.DateInterpolator',
      value: 1375,
      sentiment: 0.13,
    },
    {
      id: 'flare.animate.interpolate.Interpolator',
      value: 8746,
      sentiment: 0.62,
    },
    {
      id: 'flare.animate.interpolate.MatrixInterpolator',
      value: 2202,
      sentiment: 0.47,
    },
    {
      id: 'flare.animate.interpolate.NumberInterpolator',
      value: 1382,
      sentiment: 0.94,
    },
    {
      id: 'flare.animate.interpolate.ObjectInterpolator',
      value: 1629,
      sentiment: 0.5,
    },
    {
      id: 'flare.animate.interpolate.PointInterpolator',
      value: 1675,
      sentiment: 0.3,
    },
    { id: 'Meow', value: 500, sentiment: 0.84 },
    { id: 'Course', value: 12000, sentiment: 0.5 },
    { id: 'UBC', value: 999, sentiment: 0.67 },
  ];

  // https://observablehq.com/@d3/bubble-chart/2?intent=fork
  const prepareGraph = () => {
    // Specify the dimensions of the chart.
    const width = window.screen.width;
    const height = 700;
    const margin = 1; // to avoid clipping the root circle stroke
    const name = d => d.id.split('.').pop(); // "Strings" of "flare.util.Strings"
    const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"

    // Specify the number format for values.
    const format = d3.format(',d');
    //#005161

    // Create a categorical color scale.
    var color = d3
      .scaleThreshold()
      .domain([0.2, 0.4, 0.6, 0.8])
      .range(colorScheme);

    const pack = d3
      .pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(3);

    // Compute the hierarchy from the (flat) data; expose the values
    // for each node; lastly apply the pack layout.
    const root = pack(d3.hierarchy({ children: dummyData }).sum(d => d.value));

    // Create the SVG container.
    const svg = d3
      .create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-margin, -margin, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')
      .attr('text-anchor', 'middle');

    // Place each (leaf) node according to the layout’s x and y values.
    const node = svg
      .append('g')
      .selectAll()
      .data(root.leaves())
      .join('g')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Add a filled circle.
    node
      .append('circle')
      .attr('fill', d => color(d.data.sentiment))
      .attr('r', d => d.r);

    // Add a label.
    const text = node.append('text').attr('clip-path', d => `circle(${d.r})`);

    // Add a tspan for each CamelCase-separated word.
    text
      .selectAll()
      .data(d => names(d.data))
      .join('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
      .text(d => d);

    // Add a tspan for the node’s value.
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
  }, [prepareGraph]);

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
      <div style={{ marginTop: 30 }}>
        <Legend colorScheme={colorScheme} />
      </div>
      <div id="chart-container" ref={svg} style={{ margin: 'auto' }} />
    </div>
  );
};

export default BubbleChart;
