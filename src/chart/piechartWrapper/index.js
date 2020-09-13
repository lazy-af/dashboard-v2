import PieChartWrapper from './PieChart.wrapper';

import React from 'react'
const pieChartColorScheme = ["lightgreen", "lightblue", "pink", "orange"];

const PieChart = () => {
    return <PieChartWrapper width={300}
    height={300}
    colorScheme={pieChartColorScheme}
    legend
    legendLength={100} />
}

export default PieChart;