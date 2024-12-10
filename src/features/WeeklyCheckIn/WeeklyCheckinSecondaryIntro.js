import React from 'react';
import WeeklyCheckinConsistency from './WeeklyCheckinConsistency';
import { FaArrowRight } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components';

const WeeklyCheckinSecondaryIntro = ({
  setScreen,
  weeklyReviewLoading,
  loading,
  statsData,
}) => {
  function convertToWeekFormat(input) {
    // Ensure the input is a string
    if (typeof input !== 'string') {
      console.error('Input must be a string');
      return 'Invalid Date Format';
    }

    // Match the pattern to extract the parts (handles single-digit dates too)
    const regex = /^(\d{1,2}[A-Za-z]+)-(\d{1,2}[A-Za-z]+)-(\d{4})$/;
    const match = input.match(regex);

    if (!match) {
      console.error(
        "Input format is incorrect. Expected format: 'DDMMM-DDMMM-YYYY'. Received:",
        input,
      );
      return 'Invalid Date Format';
    }

    const [_, start, end, year] = match;

    // Extract day and month for the start and end
    const startDay = start.match(/^\d+/)?.[0]; // Extract digits
    const startMonth = start.match(/[A-Za-z]+$/)?.[0]; // Extract letters

    const endDay = end.match(/^\d+/)?.[0]; // Extract digits
    const endMonth = end.match(/[A-Za-z]+$/)?.[0]; // Extract letters

    if (!startDay || !startMonth || !endDay || !endMonth) {
      console.error('Unable to parse start or end date from input:', input);
      return 'Invalid Date Format';
    }

    // Combine into the desired format
    return `Week ${startDay}${startMonth} - ${endDay}${endMonth} `;
  }

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
      <img
        loading="lazy"
        src="assets/Movement-Frame.png"
        className="absolute left-0 top-0 -z-10 h-full w-full saturate-150"
        alt="background"
      />
      <div className=" absolute right-6 top-10 z-[110] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
        <RxCross1 onClick={() => navigate('/')} className="" />
      </div>
      {weeklyReviewLoading === false && loading === false ? (
        <>
          {' '}
          <div className="flex w-screen flex-col items-center justify-center px-[16px] pt-[35%]">
            <div className="rounded-lg bg-black-opacity-40 px-2 py-[2px] text-[20px] text-blue">
              {statsData?.week && convertToWeekFormat(statsData?.week)}
            </div>
            <h3 className="my-[26px] font-sfpro text-[32px] font-medium leading-[40px] text-blue">
              A quick glance at your performance
            </h3>
            <div className="flex w-full gap-2">
              <div className="flex w-full flex-col gap-2">
                {statsData?.last8WeekConsistency && (
                  <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
                    <div className="flex gap-1 text-[15px] font-semibold text-offwhite">
                      {' '}
                      <img src="/assets/bar-graph-logo.svg" alt="graph" />
                      {/* <img loading="lazy" src="/assets/line-graph-logo.svg" /> */}
                      Consistency
                    </div>
                    <p className="mb-[5px] flex items-center gap-1 text-[10px] text-offwhite">
                      {' '}
                      <span className="font-futura text-[32px]   leading-[40px] text-blue">
                        {statsData?.last8WeekConsistency[0]?.count
                          ? statsData?.last8WeekConsistency[0]?.count
                          : 0}
                      </span>{' '}
                      workout
                      {statsData?.last8WeekConsistency[0]?.count === 1 &&
                        's'}{' '}
                      last week
                    </p>
                    <WeeklyCheckinConsistency
                      last8WeekConsistency={statsData?.last8WeekConsistency}
                      suggestedWorkoutPerWeek={statsData?.frequncy}
                    />
                  </div>
                )}
                {statsData?.metconIntensity &&
                  statsData?.metconIntensity > 0 && (
                    <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
                      <div className="flex gap-1  text-[15px] font-semibold text-offwhite ">
                        {' '}
                        <img
                          loading="lazy"
                          src="/assets/line-graph-logo.svg"
                          alt="line-graph"
                        />
                        Metcon Intensity
                      </div>
                      <div className="font-futura text-[32px]   leading-[40px] text-blue">
                        {statsData?.metconIntensity}
                      </div>
                    </div>
                  )}
              </div>
              <div className="flex w-full flex-col gap-2">
                {
                  <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
                    <div className="flex gap-1  text-[15px] font-semibold text-offwhite ">
                      {' '}
                      <img
                        loading="lazy"
                        src="/assets/muscle-logo.svg"
                        alt="muscle-logo"
                      />
                      Volume
                    </div>
                    <div className="font-futura text-[32px]   leading-[40px] text-blue">
                      {statsData?.totalWeightLiftedThisWeek?.toFixed(0)}{' '}
                      {statsData?.totalWeightLiftedUnit}
                    </div>

                    {statsData?.totalWeightLiftedThisWeek !==
                    statsData?.totalWeightLiftedLastWeek ? (
                      <div className="flex flex-wrap items-center gap-1">
                        <div
                          className={`flex w-fit  items-center gap-1 rounded-[3px] px-1 py-[2px] font-sfpro text-[12px] ${
                            statsData?.totalWeightLiftedThisWeek -
                              statsData?.totalWeightLiftedLastWeek >
                            0
                              ? 'bg-green-opacity-12 text-green '
                              : 'bg-red-opacity-12 text-red'
                          } `}
                        >
                          {statsData?.totalWeightLiftedThisWeek -
                            statsData?.totalWeightLiftedLastWeek >
                          0 ? (
                            <img
                              src="/assets/upArrow.svg"
                              className="h-[11px] w-[11px]"
                              alt="shoe"
                            />
                          ) : (
                            <img
                              src="/assets/downArrow.svg"
                              className="h-[11px] w-[11px]"
                              alt="shoe"
                            />
                          )}
                          {statsData?.totalWeightLiftedThisWeek -
                            statsData?.totalWeightLiftedLastWeek}{' '}
                          {statsData?.totalWeightLiftedUnit}
                        </div>
                        <p className="font-sfpro text-[10px] text-white-opacity-50">
                          {statsData?.totalWeightLiftedThisWeek -
                            statsData?.totalWeightLiftedLastWeek >
                          0
                            ? 'more'
                            : 'less'}{' '}
                          than last week
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                }
                {statsData?.perfectWeek?.isPerfectWeek ? (
                  <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
                    <div className="flex gap-1  text-[15px] font-semibold text-offwhite">
                      {' '}
                      <img
                        loading="lazy"
                        src="/assets/achievement-logo.svg"
                        alt="achievement"
                      />
                      Perfect Week
                    </div>

                    <div className="mt-1 font-sfpro text-[14px]   text-offwhite">
                      {statsData?.perfectWeek?.streak > 0 && (
                        <div className="mb-2 flex items-center">
                          <div className="perfect-week mt-2 flex w-fit items-center rounded">
                            <img src="assets/star.svg" alt="" />
                            <span className="mx-0.5  text-xs font-[700] -tracking-[0.36px] text-[#4a3e1d]">
                              Perfect Week x{statsData?.perfectWeek?.streak}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="mt-2 font-sfpro text-[12px] text-offwhite">
                        You unlocked a perfect week badge this week.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
                    {' '}
                    <div className="flex gap-1  text-[15px] font-semibold text-offwhite">
                      {' '}
                      <img
                        loading="lazy"
                        src="/assets/achievement-logo.svg"
                        alt="achievement"
                      />
                      Perfect Week
                    </div>
                    <div className=" mt-3 flex items-center gap-2 text-[10px] text-offwhite">
                      {' '}
                      No streak unlocked
                    </div>
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
            className="absolute  bottom-0 mx-4 mb-[36px] flex  items-center justify-center gap-1 rounded-lg bg-white py-[14px] font-sfpro text-lg leading-[26px] text-black"
          >
            Next <FaArrowRight />
          </button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WeeklyCheckinSecondaryIntro;
