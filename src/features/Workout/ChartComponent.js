import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useState } from 'react';
import { BarChart } from './BarChart';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

Chart.register(CategoryScale);

export default function ChartComponent({ data }) {
  const { loadHistory, personalRecord, lastUsedLoadUnit } = data;

  const weightUnitConversion = loadHistory.map((item) => {
    if (!item.weightUnit) {
      if (lastUsedLoadUnit === 'LBS') {
        return item.load * 2.2;
      }
      if (lastUsedLoadUnit === 'KG') {
        return item.load;
      } else return null;
    }
    if (item.weightUnit) {
      if (item.weightUnit === 'KG' && lastUsedLoadUnit === 'LBS') {
        return item.load * 2;
      }
      if (item.weightUnit === 'LBS' && lastUsedLoadUnit === 'KG') {
        return item.load / 2;
      }
      if (item.weightUnit === lastUsedLoadUnit) {
        return item.load;
      } else return null;
    } else return null;
  });

  const lastOccurrenceIndex = loadHistory
    .map((entry) => entry.load)
    .lastIndexOf(personalRecord);

  const [chartData, setChartData] = useState({
    labels: loadHistory.map(({ date }) => {
      const dateObject = new Date(date);
      const month = dateObject.getMonth().toString(); // Adding 1 because getMonth returns zero-based index
      const day = dateObject.getDate().toString().padStart(2, '0');
      const formattedDate = `${day} ${monthNames[month]}`;
      return formattedDate;
    }),
    datasets: [
      {
        label: '',
        data: weightUnitConversion,
        backgroundColor: loadHistory.map((data, index, array) => {
          const isLastOccurrenceOfPR =
            lastOccurrenceIndex === index && data.load === personalRecord;
          return isLastOccurrenceOfPR ? '#DDF988' : '#89899D';
        }),
        borderColor: 'black',
        borderSkipped: false,
        barThickness: 10,
      },
    ],
  });

  return (
    <div>
      <BarChart
        chartData={chartData}
        maxValue={personalRecord}
        lastUsedLoadUnit={lastUsedLoadUnit}
      />
    </div>
  );
}
