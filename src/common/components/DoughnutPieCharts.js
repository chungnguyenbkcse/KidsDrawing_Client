import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutPieCharts(props) {
    return <Doughnut data={props.data} height="200px"
    width="200px" options={{ maintainAspectRatio: false }}/>;
}