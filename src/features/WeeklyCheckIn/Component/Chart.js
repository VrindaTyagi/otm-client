import React from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const WeightLineChart = ({ grahpData, yAxisKey }) => {
  // Calculate the minimum and maximum values in the graph data
  const minValue = grahpData
    ? Math.min(...grahpData.map((data) => data[yAxisKey]))
    : 0;
  const maxValue = grahpData
    ? Math.max(...grahpData.map((data) => data[yAxisKey]))
    : 100;

  // Add buffer to ensure graph fits neatly
  const buffer = (maxValue - minValue) * 0.1; // 10% of range

  return (
    <>
      {grahpData?.length > 0 ? (
        <ResponsiveContainer width={150} height={80}>
          <LineChart data={grahpData} margin={{ left: 20 }}>
            {/* Hide X-axis */}
            <XAxis
              hide
              dataKey="week"
              label={{ value: 'Week', position: 'insideBottom', offset: -5 }}
            />

            {/* Y-axis: Ensure chart stays within container */}
            <YAxis
              hide
              domain={[minValue - buffer, maxValue + buffer]} // Dynamic range
              allowDataOverflow={false} // Prevents clipping
              padding={{ top: 10, bottom: 10 }} // Adds spacing
            />

            {/* Line Graph */}
            <Line
              type="monotone"
              dataKey={yAxisKey}
              stroke={
                grahpData[0][yAxisKey] <=
                grahpData[grahpData?.length - 1][yAxisKey]
                  ? '#5ECC7B'
                  : '#FA5757'
              }
              dot={false} // Removes dots on line
            />
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </>
  );
};

export default WeightLineChart;
