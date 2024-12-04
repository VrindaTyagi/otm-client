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

// Transform the data into a format suitable for Recharts

// Calculate the minimum weight for the Y-axis starting point

const WeightLineChart = ({ grahpData, yAxisKey }) => {
  const minValue = grahpData
    ? Math.min(...grahpData.map((data) => data[yAxisKey]))
    : 0;
  return (
    <>
      {grahpData?.length > 0 ? (
        <ResponsiveContainer width={150} height={90}>
          <LineChart
            data={grahpData}
            margin={{ top: 10, right: 0, left: 20, bottom: 10 }}
          >
            <XAxis
              hide
              dataKey="week"
              label={{ value: 'Week', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              hide // Hide the Y-axis if needed
              label={{
                value: 'Weight (kg)',
                angle: -90,
                position: 'insideLeft',
              }}
            />

            <Line
              type="monotone"
              dataKey={yAxisKey}
              stroke={
                grahpData[0][yAxisKey] <=
                grahpData[grahpData?.length - 1][yAxisKey]
                  ? '#5ECC7B'
                  : '#FA5757'
              }
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default WeightLineChart;
