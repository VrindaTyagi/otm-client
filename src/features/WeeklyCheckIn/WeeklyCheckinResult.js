import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

const WeeklyCheckinResult = ({ setScreen }) => {
  const profilePicture = localStorage.getItem('profilePicture');
  console.log(profilePicture);
  return (
    <div>
      <img
        src="/assets/weekly-checkin-intro-bg.svg"
        className="absolute top-0 -z-50 w-full  brightness-75 saturate-150 filter  "
        alt="background"
      />
      <div className="bg-black-opacity-71 h-screen overflow-y-scroll px-[15px] pb-[110px] pt-[100px] ">
        <div className="flex">
          <div>
            <div className="w-fit rounded  bg-white-opacity-08 px-[6px]  text-[14px] font-extralight text-blue">
              Week 11-17 Nov
            </div>
            <h5 className="mt-[2px] text-[20px] leading-[32px] text-offwhite">
              Hi Vrinda, <br /> Here’s your week in Numbers
            </h5>
          </div>
          {profilePicture.length === 0 ? (
            <img src={profilePicture} className="" alt="DP" />
          ) : (
            <div></div>
          )}
        </div>

        <div className="mt-[24px] flex flex-col gap-2">
          <div className=" flex flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex grow gap-2 text-[15px] font-semibold text-offwhite">
                {' '}
                <img src="/assets/bar-graph-logo.svg" alt="graph" />
                workouts completed this week
              </div>
              <p className="text-[10px] text-white-opacity-50">last 4 weeks</p>
            </div>
            <p className="ml-[20px] flex items-center gap-1 text-[10px] text-offwhite">
              {' '}
              <span className="font-futura text-[58px]   leading-[40px] text-blue">
                4
              </span>{' '}
              workout last week
            </p>
            <div className="flex items-center gap-1">
              <img src="/assets/target-icon.svg" alt="target" />
              <p className="font-sfpro text-[10px] text-floYellow">target</p>
              <p className="font-futura text-[18px] leading-[19px] text-blue">
                6
              </p>
              <p className="font-sfpro text-[10px] text-white-opacity-50">
                workouts per week
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex grow gap-2 text-[15px] font-semibold text-offwhite">
                {' '}
                <img src="/assets/weight-icon.svg" alt="graph" />
                weight lifted
              </div>
              <p className="text-[10px] text-white-opacity-50">last 4 weeks</p>
            </div>
            <p className=" flex flex-col gap-1 text-[10px] text-offwhite">
              {' '}
              <span className="font-futura text-[25px]   leading-[27px] text-blue">
                400KGs
              </span>{' '}
              Total weight lifted this week
              <div className="flex items-center gap-1">
                <div className="flex w-fit  items-center gap-1 rounded-[3px] bg-green-opacity-12 px-1 py-[2px] font-sfpro text-[12px] text-green">
                  <img
                    src="/assets/upArrow.svg"
                    className="h-[11px] w-[11px]"
                    alt="shoe"
                  />
                  32kg
                </div>
                <p className="font-sfpro text-[10px] text-white-opacity-50">
                  more than last week
                </p>
              </div>
            </p>
          </div>

          <div className=" flex flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                {' '}
                <img src="/assets/shoe-icon.svg" alt="graph" />
                average steps
              </div>
              <p className="text-[10px] text-white-opacity-50">last 1 week</p>
            </div>
            <p className=" flex flex-col  text-[10px] text-offwhite">
              {' '}
              <span className="font-futura text-[25px]   leading-[27px] text-blue">
                12km
              </span>{' '}
              <div className="flex items-center gap-1">
                10{' '}
                <span className="font-sfpro text-[10px] text-white-opacity-50">
                  steps more than last week
                </span>
              </div>
            </p>
            <div className="flex items-center gap-1">
              <img src="/assets/target-icon.svg" alt="target" />
              <p className="font-sfpro text-[10px] text-floYellow">target</p>
              <p className="font-futura text-[18px] leading-[19px] text-blue">
                10k
              </p>
              <p className="font-sfpro text-[10px] text-white-opacity-50">
                steps per day
              </p>
            </div>
          </div>

          <div className=" flex min-h-[113px] flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                {' '}
                <img src="/assets/star-icon.svg" alt="graph" />
                perfect week streak
              </div>
              <p className="text-[10px] text-white-opacity-50">last 4 weeks</p>
            </div>
            {/* <p className="ml-[20px] flex items-center gap-1 text-[10px] text-offwhite">
              {' '}
              <span className="font-futura text-[58px]   leading-[40px] text-blue">
                4
              </span>{' '}
              workout last week
            </p>
            <div className="flex items-center gap-1">
              <img src="/assets/st-icon.svg" alt="target" />
              <p className="font-sfpro text-[10px] text-floYellow">target</p>
              <p className="font-futura text-[18px] leading-[19px] text-blue">
                6
              </p>
              <p className="font-sfpro text-[10px] text-white-opacity-50">
                workouts per week
              </p>
            </div> */}
          </div>
          <div className="flex justify-between gap-2">
            <div className=" flex grow flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex flex-col  justify-between ">
                <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/leaf-yellow-logo.svg" alt="graph" />
                  stress levels
                </div>
                <img
                  src={'./assets/Feeling-happy2.svg'}
                  alt="Ecstatic"
                  className={`h-[45px] w-[45px] `}
                />
              </div>
            </div>

            <div className=" flex grow flex-col rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between ">
                <div className="flex grow items-center gap-1 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img
                    src="/assets/heart-icon.png"
                    alt="graph"
                    className="h-[15px] w-[15px]"
                  />
                  mood level
                </div>
              </div>
              <img
                src={'./assets/Feeling-happy.svg'}
                alt="Ecstatic"
                className={`h-[45px] w-[45px] `}
              />
            </div>
          </div>

          <div className=" flex flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                {' '}
                <img src="/assets/weight-machine.svg" alt="graph" />
                weight comparison
              </div>
              <p className="text-[10px] text-white-opacity-50">last 4 weeks</p>
            </div>
            <p className=" mb-1 mt-[10px] flex items-center gap-1 text-[10px] text-offwhite">
              {' '}
              <span className="font-futura text-[32px]   leading-[40px] text-blue">
                82Kgs
              </span>{' '}
              workout last week
            </p>
            <div className="flex items-center gap-1">
              <div className="flex w-fit  items-center gap-1 rounded-[3px] bg-green-opacity-12 px-1 py-[2px] font-sfpro text-[12px] text-green">
                320 Gms
              </div>
              <p className="font-sfpro text-[10px] text-white-opacity-50">
                since
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-[100] flex w-full gap-2 px-4 pb-[36px]">
        <button className="flex w-[114px] items-center justify-center rounded-lg bg-graySecond font-sfpro text-[18px] font-medium leading-[25px]">
          <FaHome size={32} />
        </button>
        <button
          onClick={() => setScreen('resultLoading')}
          className="flex grow items-center justify-center gap-1 rounded-lg bg-white py-[14px] font-sfpro text-lg leading-[26px] text-black"
        >
          Share with coach{' '}
          <span className="text-lack text-[18px]">
            <FiUpload />
          </span>
        </button>
      </div>
    </div>
  );
};

export default WeeklyCheckinResult;
