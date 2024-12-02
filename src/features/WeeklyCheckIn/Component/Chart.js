import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = {
  last8WeekWeightHistory: [50, 40, 10, 34, 30, 55, 56, 57],
};

// Transform the data into a format suitable for Recharts
const formattedData = data.last8WeekWeightHistory.map((weight, index) => ({
  week: index + 1, // X-axis points (index + 1 to make it 1-based)
  weight, // Y-axis points
}));

// Calculate the minimum weight for the Y-axis starting point
const minWeight = Math.min(...data.last8WeekWeightHistory);

const WeightLineChart = () => {
  return (
    <ResponsiveContainer width={150}>
      <LineChart
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          hide
          dataKey="week"
          label={{ value: 'Week', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          hide
          domain={[minWeight, 'dataMax']} // Start from the lowest value
          label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightLineChart;
