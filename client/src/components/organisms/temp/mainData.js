import React, { useState, useEffect, useRef } from 'react';
import styles from './FeedbackDataModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Button } from '@chakra-ui/react';
import { fetchFeedbackAnalysis } from '../../../redux/feedbackDataSlice';
import MainAnalysisPage from './MainAnalysisPage';
import * as d3 from 'd3';

const FeedbackData = () => {
  const dispatch = useDispatch();
  // This is for a select school/course thing I haven't done yet (can either have all schools/courses selected or specific one)
  const [selectedSchool, setSelectedSchool] = useState(''); // need to add dropdown stuff later
  const [selectedCourse, setSelectedCourse] = useState([]);
  const feedbackData = useSelector(state => state.feedbackData.feedbackInfo);
  const [bubbleChart, setBubbleChart] = useState(null);
  const svg = useRef(null);

  const handleClick = () => {
    dispatch(fetchFeedbackAnalysis());
  };

  const dummyData = [
    { id: 'flare.analytics.cluster.AgglomerativeCluster', value: 3938 },
    { id: 'flare.analytics.cluster.CommunityStructure', value: 3812 },
    { id: 'flare.analytics.cluster.HierarchicalCluster', value: 6714 },
    { id: 'flare.analytics.cluster.MergeEdge', value: 743 },
    { id: 'flare.analytics.graph.BetweennessCentrality', value: 3534 },
    { id: 'flare.analytics.graph.LinkDistance', value: 5731 },
    { id: 'flare.analytics.graph.MaxFlowMinCut', value: 7840 },
    { id: 'flare.analytics.graph.ShortestPaths', value: 5914 },
    { id: 'flare.analytics.graph.SpanningTree', value: 3416 },
    { id: 'flare.analytics.optimization.AspectRatioBanker', value: 7074 },
    { id: 'flare.animate.Easing', value: 17010 },
    { id: 'flare.animate.FunctionSequence', value: 5842 },
    { id: 'flare.animate.interpolate.ArrayInterpolator', value: 1983 },
    { id: 'flare.animate.interpolate.ColorInterpolator', value: 2047 },
    { id: 'flare.animate.interpolate.DateInterpolator', value: 1375 },
    { id: 'flare.animate.interpolate.Interpolator', value: 8746 },
    { id: 'flare.animate.interpolate.MatrixInterpolator', value: 2202 },
    { id: 'flare.animate.interpolate.NumberInterpolator', value: 1382 },
    { id: 'flare.animate.interpolate.ObjectInterpolator', value: 1629 },
    { id: 'flare.animate.interpolate.PointInterpolator', value: 1675 },
  ];

  // https://observablehq.com/@d3/bubble-chart/2?intent=fork
  const renderVisualization = () => {
    // Specify the dimensions of the chart.
    const width = 928;
    const height = width;
    const margin = 1; // to avoid clipping the root circle stroke
    const name = d => d.id.split('.').pop(); // "Strings" of "flare.util.Strings"
    const group = d => d.id.split('.')[1]; // "util" of "flare.util.Strings"
    const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"

    // Specify the number format for values.
    const format = d3.format(',d');

    // Create a categorical color scale.
    const color = d3.scaleOrdinal(d3.schemeTableau10);

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

    // Add a title.
    node.append('title').text(d => `${d.data.id}\n${format(d.value)}`);

    // Add a filled circle.
    node
      .append('circle')
      .attr('fill-opacity', 0.7)
      .attr('fill', d => color(group(d.data)))
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

    const chart = Object.assign(svg.node(), { scales: { color } });
    setBubbleChart(chart);
  };

  useEffect(() => {
    renderVisualization();
    if (svg.current) {
      svg.current.appendChild(bubbleChart);
    }
  }, []);

  return (
    <Box className={styles.container}>
      <Box className={styles.title}>
        {selectedSchool ? (
          <Text>
            Currently looking at the feedback for {selectedCourse.courseCode}:{' '}
            {selectedCourse.courseName} at {selectedSchool.name}
          </Text>
        ) : (
          <Text>Looking at the feedback for all courses and schools</Text>
        )}
      </Box>
      <Box className={styles.title}>
        <Button onClick={handleClick}>Get feedback</Button>
        {feedbackData.length && (
          <MainAnalysisPage
            course={selectedCourse}
            school={selectedSchool}
            data={feedbackData}
          />
        )}
      </Box>
      {bubbleChart && <div ref={svg} />}
    </Box>
  );
};

export default FeedbackData;
