import StackBarChartWrapper from './StackBarChart.wrapper';
import React from 'react';
const stackBarChartColorScheme = ["lightgreen", "lightblue", "pink", "orange"];

const StackBarChart = () => {
    return <StackBarChartWrapper  
    width={400} 
    height={200} 
    xAxisLabel="X-Axis Label -->"
    legend 
    legendWidth={100}
    colorScheme={stackBarChartColorScheme} />
}

export default StackBarChart;