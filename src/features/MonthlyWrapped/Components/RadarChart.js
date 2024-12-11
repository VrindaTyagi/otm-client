import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  convertMonthlySkillPoint,
  getPreviousAndPreviousToPreviousMonth,
} from '../utils';

export default function RadarChart({ radarChartData }) {
  const { currMonthSkillPoint, prevMonthSkillPoint, bestSkill } =
    radarChartData;
  const currentMonthData = convertMonthlySkillPoint(currMonthSkillPoint);
  const prevMonthData = convertMonthlySkillPoint(prevMonthSkillPoint);
  const [previousMonthName, previousToPreviousMonthName] =
    getPreviousAndPreviousToPreviousMonth();

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  );

  // scaling the unit based on the max value in the input data, so that the graph doesn't go out of the box
  const maxScaleUnit =
    (Math.floor(Math.max(...currentMonthData, ...prevMonthData) / 5) + 1) * 5;

  const data = {
    labels: ['Endurance', 'Pull', 'Squat', 'Core', 'Push'],
    datasets: [
      {
        label: 'Current Month',
        data: currentMonthData,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(94, 204, 123, 1)',
        borderWidth: 2,
        borderJoinStyle: 'miter',
        pointRadius: 0, // Remove circular points
        pointHoverRadius: 0, // Remove hover effect on points
      },
      {
        label: 'Previous Month',
        data: prevMonthData,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(126, 135, 239, 1)',
        borderWidth: 2,
        borderJoinStyle: 'miter',
        pointRadius: 0, // Remove circular points
        pointHoverRadius: 0, // Remove hover effect on points
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      r: {
        min: 0,
        max: maxScaleUnit,
        grid: {
          display: false,
        },
        ticks: {
          display: false, // hide scale labels
        },
        pointLabels: {
          display: false, // hide point labels
        },
        angleLines: {
          display: false,
          borderDash: [5, 5], // dotted line
          lineWidth: 1,
          color: [
            'rgba(219, 112, 147, 1)',
            'rgba(175, 198, 232, 1)',
            'rgba(253, 231, 168, 1)',
            'rgba(143, 216, 170, 1)',
            'rgba(116, 172, 209, 1)',
          ],
        },
      },
    },
  };
  return (
    <div className="bar-chart-style flex h-[100%] max-h-[457px] w-[100%] max-w-[326px] flex-col items-start justify-between px-4 pb-3">
      <div className="flex w-full flex-row items-center justify-between">
        <img
          src="/assets/fire_radar_chart.svg"
          alt="star"
          height={74}
          width={74}
          className="relative right-[10px]"
        />
        <div
          className="flex w-fit flex-col items-start justify-center gap-1 text-[15px]"
          style={{ fontWeight: 600, letterSpacing: '0.292px' }}
        >
          <p className="text-[#7E87EF]">{previousToPreviousMonthName}</p>
          <p className="text-[#5ECC7B]">{previousMonthName}</p>
        </div>
      </div>
      <div
        className="flex h-[250px] w-full flex-col items-center justify-center bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${'/assets/radar_chart_bg.svg'})` }}
      >
        <Radar
          data={data}
          options={options}
          className="relative left-[7px] top-[10px]"
        />
      </div>
      <p
        className="bar-chart-text text-start text-[#ffffff42]"
        style={{ marginBlock: '1em' }}
      >
        <span className="text-[#7E87EF]">{bestSkill},&nbsp;</span> is your
        strongest element of fitness
      </p>
    </div>
  );
}
