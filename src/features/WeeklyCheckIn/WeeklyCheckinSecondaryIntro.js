import React, { useEffect, useState } from 'react';
import WeeklyCheckinConsistency from './WeeklyCheckinConsistency';
import { FaArrowRight } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WeeklyCheckinSecondaryIntro = ({ setScreen }) => {
  const [loading, setLoading] = useState(false);
  const [statsData, setStatsData] = useState(null);

  const input = '11Nov-17Dec-2024';

  function convertToWeekFormat(input) {
    // Split the input string by "-"
    const [start, end, year] = input.split('-');

    // Extract the day and month parts from start and end
    const startDay = start.slice(0, 2);
    const startMonth = start.slice(2);

    const endDay = end.slice(0, 2);
    const endMonth = end.slice(2);

    // Combine into the desired format
    return `Week ${startDay}-${endDay} ${startMonth}${
      endMonth !== startMonth ? `-${endMonth}` : ''
    }`;
  }

  const result = convertToWeekFormat(input);

  useEffect(() => {
    setLoading(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/stats`,
        );
        if (res.data) {
          setStatsData(res.data.data[0]);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
      <div className=" absolute right-6 top-10 z-[110] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
        <RxCross1 onClick={() => navigate('/')} className="" />
      </div>
      <img
        loading="lazy"
        src="assets/Movement-Frame.png"
        className="absolute left-0 top-0 -z-10 h-full w-full saturate-150"
        alt="background"
      />
      <div className="flex w-screen flex-col items-center justify-center px-[16px] pt-[35%]">
        <div className="rounded-lg bg-black-opacity-40 px-2 py-[2px] text-[20px] text-blue">
          Week 11-17 Nov
        </div>
        <h3 className="my-[26px] font-sfpro text-[32px] font-medium leading-[40px] text-blue">
          A quick glance at your performance
        </h3>
        <div className="flex w-full gap-2">
          <div className="flex w-full flex-col gap-2">
            <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
              <div className="flex gap-1 text-[15px] font-semibold text-offwhite">
                {' '}
                <img src="/assets/bar-graph-logo.svg" alt="graph" />
                {/* <img loading="lazy" src="/assets/line-graph-logo.svg" /> */}
                consistency
              </div>
              <p className="mb-[5px] flex items-center gap-1 text-[10px] text-offwhite">
                {' '}
                <span className="font-futura text-[32px]   leading-[40px] text-blue">
                  {statsData?.last8WeekConsistency[1].count}
                </span>{' '}
                workout last week
              </p>
              <WeeklyCheckinConsistency
                last8WeekConsistency={statsData?.last8WeekConsistency}
                suggestedWorkoutPerWeek={4}
              />
            </div>
            <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
              <div className="flex gap-1 text-[15px] font-semibold text-offwhite ">
                {' '}
                <img
                  loading="lazy"
                  src="/assets/line-graph-logo.svg"
                  alt="line-graph"
                />
                metcon intensity
              </div>
              <div className="font-futura text-[32px]   leading-[40px] text-blue">
                {statsData?.metconIntensity}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            {statsData?.volume && (
              <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
                <div className="flex gap-1 text-[15px] font-semibold text-offwhite ">
                  {' '}
                  <img
                    loading="lazy"
                    src="/assets/muscle-logo.svg"
                    alt="muscle-logo"
                  />
                  volume
                </div>
                <div className="font-futura text-[32px]   leading-[40px] text-blue">
                  {statsData?.volume}
                </div>
              </div>
            )}
            {statsData?.streak && (
              <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
                <div className="flex gap-1 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img
                    loading="lazy"
                    src="/assets/achievement-logo.svg"
                    alt="achievement"
                  />
                  Perfect Week Streak
                </div>
                <div className="font-futura text-[32px]   leading-[40px] text-blue"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setScreen('questionnaire')}
        style={{
          width: '-webkit-fill-available',
        }}
        className="absolute bottom-0 mx-4 mb-[36px] flex  items-center justify-center gap-1 rounded-lg bg-white py-[14px] font-sfpro text-lg leading-[26px] text-black"
      >
        Next <FaArrowRight />
      </button>
    </div>
  );
};

export default WeeklyCheckinSecondaryIntro;
