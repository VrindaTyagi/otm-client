import React, { useEffect, useState } from 'react';
import WeeklyCheckinConsistency from './WeeklyCheckinConsistency';
import { FaArrowRight } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../../components';

const WeeklyCheckinSecondaryIntro = ({
  setScreen,
  setWeek,
  code,
  weeklyReviewLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const [statsData, setStatsData] = useState(null);

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
    return `Week ${startDay}-${endDay} ${startMonth}`;
  }

  useEffect(() => {
    if (statsData) {
      setWeek(statsData?.week);
    }
  }, [statsData]);

  useEffect(() => {
    setLoading(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/stats?memberCode=${code}`,
          {
            memberCode: 'PRAN',
          },
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
      <img
        loading="lazy"
        src="assets/Movement-Frame.png"
        className="absolute left-0 top-0 -z-10 h-full w-full saturate-150"
        alt="background"
      />
      <div className=" absolute right-6 top-10 z-[110] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
        <RxCross1 onClick={() => navigate('/')} className="" />
      </div>
      {weeklyReviewLoading === true || loading === true ? (
        <Loader />
      ) : (
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
                {statsData?.last8WeekConsistency &&
                  statsData?.last8WeekConsistency.length > 0 && (
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
                          {statsData?.last8WeekConsistency[0].count}
                        </span>{' '}
                        workout last week
                      </p>
                      <WeeklyCheckinConsistency
                        last8WeekConsistency={statsData?.last8WeekConsistency}
                        suggestedWorkoutPerWeek={4}
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
                {statsData?.totalWeightLiftedLastWeek &&
                statsData?.totalWeightLiftedLastWeek > 0 ? (
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
                  </div>
                ) : (
                  <></>
                )}
                {statsData?.perfectWeek?.isPerfectWeek && (
                  <div className=" rounded-lg bg-black-opacity-40 px-[16px] py-[9px]">
                    <div className="flex gap-1  text-[15px] font-semibold text-offwhite">
                      {' '}
                      <img
                        loading="lazy"
                        src="/assets/achievement-logo.svg"
                        alt="achievement"
                      />
                      Perfect Streak
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
                      You have unlocked perfect streak.
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
      )}
    </div>
  );
};

export default WeeklyCheckinSecondaryIntro;
