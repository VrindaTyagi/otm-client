import React from 'react';
import WeeklyCheckinConsistency from './WeeklyCheckinConsistency';
import { FaArrowRight } from 'react-icons/fa6';

const WeeklyCheckinSecondaryIntro = ({ setScreen }) => {
  const last8WeekConsistency = [
    {
      week: '18Nov-24Nov-2024',
      count: 6,
    },
    {
      week: '18Nov-24Nov-2024',
      count: 2,
    },
    {
      week: '18Nov-24Nov-2024',
      count: 0,
    },
    {
      week: '18Nov-24Nov-2024',
      count: 7,
    },
    {
      week: '18Nov-24Nov-2024',
      count: 8,
    },
    {
      week: '18Nov-24Nov-2024',
      count: 3,
    },
    {
      week: '18Nov-24Nov-2024',
      count: 0,
    },
    {
      week: '18Nov-24Nov-2024',
      count: 4,
    },
  ];

  return (
    <div className="h-screen w-screen">
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
                  4
                </span>{' '}
                workout last week
              </p>
              <WeeklyCheckinConsistency
                last8WeekConsistency={last8WeekConsistency}
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
                45
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
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
                132
              </div>
            </div>
            <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
              <div className="flex gap-1 text-[15px] font-semibold text-offwhite">
                {' '}
                <img
                  loading="lazy"
                  src="/assets/achievement-logo.svg"
                  alt="achievement"
                />
                PR achievement
              </div>
              <div className="font-futura text-[32px]   leading-[40px] text-blue">
                132kg
              </div>
            </div>
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
