import React from 'react';
import WeightLineChart from './Component/Chart';
import { GiNightSleep } from 'react-icons/gi';
import { IoIosNutrition } from 'react-icons/io';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const ShareWeeklyCheckinScreen = ({
  weeklyReport,
  summaryRef,
  weightLiftedComapre,
  numbersColor,
  formatToK,
  reverseArray,
  week,
  userProfilePicture,
  caiptalInitial,
}) => {
  const navigate = useNavigate();
  const fullName = JSON.parse(localStorage?.getItem('user'))['name'];
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
  return (
    <div ref={summaryRef} className="bg-black">
      <div className="relative h-screen  bg-black-opacity-65 px-[15px] pb-[110px] pt-[100px] ">
        <div>
          <div className=" absolute right-[16px] top-10 z-[110] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
            <RxCross1 onClick={() => navigate('/')} className="" />
          </div>
          <div className="flex justify-between">
            <div>
              <div className="w-fit rounded   bg-white-opacity-08 px-[6px]  text-[14px] font-extralight text-blue">
                {week ? convertToWeekFormat(week) : 'Week Data Unavailable'}
              </div>
              <h5 className="mt-[2px] text-[20px] leading-[32px] text-offwhite">
                Hi {fullName ? fullName : ''}, <br /> Here’s your week in
                Numbers
              </h5>
            </div>
          </div>

          <div className="mt-[24px] flex h-full flex-col gap-2 bg-none">
            <div className=" relative flex flex-col justify-between rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-2 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/bar-graph-logo.svg" alt="graph" />
                  Workouts completed this week
                </div>
                <p className="absolute right-3 text-[10px] text-white-opacity-50">
                  last 4 weeks
                </p>
              </div>
              <div className=" flex justify-between">
                <div className=" mt-3 flex flex-col gap-3">
                  <p className="ml-[20px] flex items-center gap-1 text-[10px] text-offwhite">
                    {' '}
                    <span className="font-futura text-[58px]   leading-[40px] text-blue">
                      {weeklyReport?.last4WeekConsistency[0]?.count
                        ? weeklyReport?.last4WeekConsistency[0]?.count
                        : 0}
                    </span>{' '}
                    workout last week
                  </p>
                  <div className="flex items-center gap-1">
                    <img src="/assets/target-icon.svg" alt="target" />
                    <p className="font-sfpro text-[10px] text-floYellow">
                      target
                    </p>
                    <p className="font-futura text-[18px] leading-[19px] text-blue">
                      {weeklyReport?.targetConsistency}
                    </p>
                    <p className="font-sfpro text-[10px] text-white-opacity-50">
                      workouts per week
                    </p>
                  </div>
                </div>
                <WeightLineChart
                  grahpData={
                    weeklyReport?.last4WeekConsistency &&
                    reverseArray(weeklyReport?.last4WeekConsistency)
                  }
                  yAxisKey={'count'}
                />
              </div>
            </div>

            <div className="relative flex flex-col justify-between rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-2 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/weight-icon.svg" alt="graph" />
                  Weight lifted
                </div>
                <p className="absolute right-3 text-[10px] text-white-opacity-50">
                  last 8 weeks
                </p>
              </div>
              <div className=" flex justify-between">
                <div className=" mt-3 flex flex-col gap-3">
                  <p className=" flex flex-col gap-1 text-[10px] text-offwhite">
                    {' '}
                    <span className="font-futura text-[25px]   leading-[27px] text-blue">
                      {weeklyReport?.last8WeekWeightLifted[0]?.totalWeightLifted?.toFixed(
                        0,
                      )}{' '}
                      {weeklyReport?.weightUnit}
                    </span>{' '}
                    Total weight lifted this week
                    {weeklyReport?.last8WeekWeightLifted[0]
                      ?.totalWeightLifted !==
                      weeklyReport?.last8WeekWeightLifted[1]
                        ?.totalWeightLifted && (
                      <div className="flex items-center gap-1">
                        <div
                          className={`flex w-fit  items-center gap-1 rounded-[3px] px-1 py-[2px] font-sfpro text-[12px] ${
                            weightLiftedComapre() > 0
                              ? 'bg-green-opacity-12 text-green '
                              : 'bg-red-opacity-12 text-red'
                          } `}
                        >
                          {weightLiftedComapre() > 0 ? (
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
                          {weightLiftedComapre().toFixed(0)}{' '}
                          {weeklyReport?.weightUnit}
                        </div>
                        <p className="font-sfpro text-[10px] text-white-opacity-50">
                          {weightLiftedComapre() > 0 ? 'more' : 'less'} than
                          last week
                        </p>
                      </div>
                    )}
                  </p>
                </div>
                <WeightLineChart
                  grahpData={
                    weeklyReport?.last8WeekWeightLifted &&
                    reverseArray(weeklyReport?.last8WeekWeightLifted)
                  }
                  yAxisKey={'totalWeightLifted'}
                />
              </div>
            </div>

            <div className="relative  flex flex-col justify-between rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/shoe-icon.svg" alt="graph" />
                  Average steps
                </div>
                <p className="absolute right-3 text-[10px] text-white-opacity-50">
                  last 4 week
                </p>
              </div>
              <div className=" flex justify-between">
                <div className=" mt-3 flex flex-col gap-3">
                  <p className=" flex flex-col  text-[10px] text-offwhite">
                    {' '}
                    <span className="font-futura text-[25px]   leading-[27px] text-blue">
                      {weeklyReport?.last4WeekStepCount[0].steps} Steps
                    </span>{' '}
                    {weeklyReport?.last4WeekStepCount[1].steps > 0 &&
                      Number(weeklyReport?.last4WeekStepCount[0].steps) -
                        Number(weeklyReport?.last4WeekStepCount[1].steps) !==
                        0 && (
                        <div className="flex items-center gap-1">
                          {Math.abs(
                            Number(weeklyReport?.last4WeekStepCount[0].steps) -
                              Number(weeklyReport?.last4WeekStepCount[1].steps),
                          )}
                          <span className="font-sfpro text-[10px] text-white-opacity-50">
                            steps more than{' '}
                            {Number(weeklyReport?.last4WeekStepCount[0].steps) -
                              Number(
                                weeklyReport?.last4WeekStepCount[1].steps,
                              ) >
                            0
                              ? 'more'
                              : 'less'}{' '}
                            week
                          </span>
                        </div>
                      )}
                  </p>
                  <div className="flex items-center gap-1">
                    <img src="/assets/target-icon.svg" alt="target" />
                    <p className="font-sfpro text-[10px] text-floYellow">
                      target
                    </p>
                    <p className="font-futura text-[18px] leading-[19px] text-blue">
                      {weeklyReport?.targetStepCount &&
                        formatToK(weeklyReport?.targetStepCount)}
                    </p>
                    <p className="font-sfpro text-[10px] text-white-opacity-50">
                      steps per day
                    </p>
                  </div>
                </div>
                <WeightLineChart
                  grahpData={
                    weeklyReport?.last4WeekStepCount &&
                    reverseArray(weeklyReport?.last4WeekStepCount)
                  }
                  yAxisKey={'steps'}
                />
              </div>
            </div>

            {weeklyReport?.perfectWeek?.isPerfectWeek === true && (
              <div className=" flex min-h-[113px] flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                    {' '}
                    <img src="/assets/star-icon.svg" alt="graph" />
                    Perfect week streak
                  </div>
                </div>
                {weeklyReport?.perfectWeek?.isPerfectWeek === true &&
                  weeklyReport?.perfectWeek?.streak === 0 && (
                    <div className="mt-2 font-sfpro text-[12px] text-offwhite">
                      You Unlocked a perfect week badge this week.
                    </div>
                  )}
                {weeklyReport?.perfectWeek?.isPerfectWeek === true &&
                  weeklyReport?.perfectWeek?.streak > 0 && (
                    <div>
                      {weeklyReport?.perfectWeek?.streak > 1 && (
                        <div className="flex items-center ">
                          <div className="perfect-week mt-2 flex w-fit items-center rounded">
                            <img src="assets/star.svg" alt="" />
                            <span className="mx-0.5  text-xs font-[700] -tracking-[0.36px] text-[#4a3e1d] ">
                              Perfect Week x{weeklyReport?.perfectWeek?.streak}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-2 font-sfpro text-[12px] text-offwhite">
                        You Unlocked a perfect week badge this week.Keep
                        crushing your workout to maintain your streak.
                      </div>
                    </div>
                  )}

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
            )}
            {weeklyReport?.energyLevelThisWeek === 0 &&
            weeklyReport?.sleepQualityThisWeek === 0 &&
            weeklyReport?.nutritionRatingThisWeek === 0 &&
            weeklyReport?.stressLevelsThisWeek === 0 ? (
              <></>
            ) : (
              <div className="flex flex-col justify-between gap-2">
                <div className="flex gap-2">
                  {weeklyReport?.energyLevelThisWeek &&
                  weeklyReport?.energyLevelThisWeek > 0 ? (
                    <div className=" flex w-1/2 grow flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                      <div className="flex flex-col  justify-between ">
                        <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                          {' '}
                          <img src="/assets/leaf-yellow-icon.svg" alt="graph" />
                          Energy level
                        </div>
                        <div className="mt-2 flex gap-3">
                          {' '}
                          <div
                            className={`border-box flex h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${
                              numbersColor[
                                Number(weeklyReport?.energyLevelThisWeek) - 1
                              ].bg
                            }`}
                          >
                            <p
                              className={`font-futura text-[32px]  ${`${
                                numbersColor[
                                  Number(weeklyReport?.energyLevelThisWeek) - 1
                                ].text
                              }`}`}
                            >
                              {weeklyReport?.energyLevelThisWeek}
                            </p>
                          </div>
                          <div className="text-[10px] text-offwhite">
                            {(Number(weeklyReport?.energyLevelLastWeek) === 0 ||
                              !Number(weeklyReport?.energyLevelLastWeek)) &&
                              Number(weeklyReport?.energyLevelThisWeek) < 5 && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  You rated {weeklyReport?.energyLevelThisWeek}{' '}
                                  out of 5 on energy level. Let's aim for a
                                  higher score
                                </div>
                              )}

                            {(Number(weeklyReport?.energyLevelLastWeek) === 0 ||
                              !Number(weeklyReport?.energyLevelLastWeek)) &&
                              Number(weeklyReport?.energyLevelThisWeek) ===
                                5 && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  You rated {weeklyReport?.energyLevelThisWeek}{' '}
                                  out of 5 on energy level. Keep going!
                                </div>
                              )}
                            {Number(weeklyReport?.energyLevelLastWeek) > 0 &&
                              Number(weeklyReport?.energyLevelLastWeek) >
                                Number(weeklyReport?.energyLevelThisWeek) && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  You have rated a lower score than last week.
                                  Let's aim for higher score
                                </div>
                              )}
                            {Number(weeklyReport?.energyLevelLastWeek) > 0 &&
                              Number(weeklyReport?.energyLevelLastWeek) <
                                Number(weeklyReport?.energyLevelThisWeek) && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  You have rated a higher score than last
                                  week.Keep Going!
                                </div>
                              )}
                            {Number(weeklyReport?.energyLevelLastWeek) ===
                              Number(weeklyReport?.energyLevelThisWeek) && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                You have rated the same as last week.Let's keep
                                going!
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {weeklyReport?.stressLevelsThisWeek &&
                  weeklyReport?.stressLevelsThisWeek > 0 ? (
                    <div className=" flex w-1/2 grow  flex-col rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                      <div className="flex items-center justify-between ">
                        <div className="flex grow items-center gap-1 text-[15px] font-semibold text-offwhite">
                          {' '}
                          <img
                            src="/assets/heart-icon.png"
                            alt="graph"
                            className="h-[15px] w-[15px]"
                          />
                          Stress level
                        </div>
                      </div>
                      <div className="mt-2 flex gap-3">
                        {' '}
                        <div
                          className={`border-box flex  h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${
                            numbersColor[
                              Number(weeklyReport?.stressLevelsThisWeek) - 1
                            ].bg
                          }`}
                        >
                          <p
                            className={`font-futura text-[32px]  ${`${
                              numbersColor[
                                Number(weeklyReport?.stressLevelsThisWeek) - 1
                              ].text
                            }`}`}
                          >
                            {weeklyReport?.stressLevelsThisWeek}
                          </p>
                        </div>
                        {(Number(weeklyReport?.stressLevelsLastWeek) === 0 ||
                          !Number(weeklyReport?.stressLevelsLastWeek)) &&
                          Number(weeklyReport?.stressLevelsThisWeek) > 1 && (
                            <div className="font-sfpro text-[12px] text-offwhite">
                              You rated {weeklyReport?.stressLevelsThisWeek} out
                              of 5 on stress level. Let's aim for a lower score
                            </div>
                          )}
                        {(Number(weeklyReport?.stressLevelsLastWeek) === 0 ||
                          !Number(weeklyReport?.stressLevelsLastWeek)) &&
                          Number(weeklyReport?.stressLevelsThisWeek) === 1 && (
                            <div className="font-sfpro text-[12px] text-offwhite">
                              You rated {weeklyReport?.stressLevelsThisWeek} out
                              of 5 on stress level. Keep going
                            </div>
                          )}
                        {Number(weeklyReport?.stressLevelsLastWeek) >
                          Number(weeklyReport?.stressLevelsThisWeek) && (
                          <div className="font-sfpro text-[12px] text-offwhite">
                            You have rated a higher score than last week. Let's
                            aim for lower score
                          </div>
                        )}
                        {Number(weeklyReport?.stressLevelsLastWeek) !== 0 &&
                          Number(weeklyReport?.stressLevelsLastWeek) <
                            Number(weeklyReport?.stressLevelsThisWeek) && (
                            <div className="font-sfpro text-[12px] text-offwhite">
                              You have rated a lower score than last week.Keep
                              Going!
                            </div>
                          )}
                        {Number(weeklyReport?.stressLevelsLastWeek) ===
                          Number(weeklyReport?.stressLevelsThisWeek) && (
                          <div className="font-sfpro text-[12px] text-offwhite">
                            You have rated the same as last week.Let's keep
                            going!
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex gap-2">
                  {weeklyReport?.sleepQualityThisWeek &&
                  weeklyReport?.sleepQualityThisWeek > 0 ? (
                    <div className=" flex w-1/2 grow  flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                      <div className="flex flex-col  justify-between ">
                        <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                          {' '}
                          <GiNightSleep className="text-floYellow" />
                          Sleep level
                        </div>
                        <div className="mt-2 flex gap-3">
                          {' '}
                          <div
                            className={`border-box flex h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${
                              numbersColor[
                                Number(weeklyReport?.sleepQualityThisWeek) - 1
                              ].bg
                            }`}
                          >
                            <p
                              className={`font-futura text-[32px]  ${`${
                                numbersColor[
                                  Number(weeklyReport?.sleepQualityThisWeek) - 1
                                ].text
                              }`}`}
                            >
                              {weeklyReport?.sleepQualityThisWeek}
                            </p>
                          </div>
                          <div className="text-[10px] text-offwhite">
                            {(Number(weeklyReport?.sleepQualityLastWeek) ===
                              0 ||
                              !Number(weeklyReport?.sleepQualityLastWeek)) &&
                              Number(weeklyReport?.sleepQualityThisWeek) <
                                5 && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  You rated {weeklyReport?.sleepQualityThisWeek}{' '}
                                  out of 5 on sleep level. Let's aim for a
                                  higher score
                                </div>
                              )}
                            {(Number(weeklyReport?.sleepQualityLastWeek) ===
                              0 ||
                              !Number(weeklyReport?.sleepQualityLastWeek)) &&
                              Number(weeklyReport?.sleepQualityThisWeek) ===
                                5 && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  You rated {weeklyReport?.sleepQualityThisWeek}{' '}
                                  out of 5 on sleep level. Keep going
                                </div>
                              )}
                            {Number(weeklyReport?.sleepQualityLastWeek) > 0 &&
                              Number(weeklyReport?.sleepQualityLastWeek) >
                                Number(weeklyReport?.sleepQualityThisWeek) && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  You have rated a lower score than last week.
                                  Let's aim for higher score
                                </div>
                              )}
                            {Number(weeklyReport?.sleepQualityLastWeek) > 0 &&
                              Number(weeklyReport?.sleepQualityLastWeek) <
                                Number(weeklyReport?.sleepQualityThisWeek) && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  You have rated a higher score than last
                                  week.Keep Going!
                                </div>
                              )}
                            {Number(weeklyReport?.sleepQualityLastWeek) ===
                              Number(weeklyReport?.sleepQualityThisWeek) && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                You have rated the same as last week.Let's keep
                                going!
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  {weeklyReport?.nutritionRatingThisWeek &&
                  weeklyReport?.nutritionRatingThisWeek > 0 ? (
                    <div className=" flex w-1/2 grow  flex-col rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                      <div className="flex items-center justify-between ">
                        <div className="flex grow items-center gap-1 text-[15px] font-semibold text-offwhite">
                          {' '}
                          <IoIosNutrition className="text-floYellow" />
                          Nutrition level
                        </div>
                      </div>
                      <div className="mt-2 flex gap-3">
                        {' '}
                        <div
                          className={`border-box flex h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${
                            numbersColor[
                              Number(weeklyReport?.nutritionRatingThisWeek) - 1
                            ].bg
                          }`}
                        >
                          <p
                            className={`font-futura text-[32px]  ${`${
                              numbersColor[
                                Number(weeklyReport?.nutritionRatingThisWeek) -
                                  1
                              ].text
                            }`}`}
                          >
                            {weeklyReport?.nutritionRatingThisWeek}
                          </p>
                        </div>
                        <div className="text-[10px] text-offwhite">
                          {(Number(weeklyReport?.nutritionRatingLastWeek) ===
                            0 ||
                            !Number(weeklyReport?.nutritionRatingLastWeek)) &&
                            Number(weeklyReport?.nutritionRatingThisWeek) <
                              5 && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                You rated{' '}
                                {weeklyReport?.nutritionRatingThisWeek} out of 5
                                on nutrition level. Let's aim for a higher score
                              </div>
                            )}

                          {(Number(weeklyReport?.nutritionRatingLastWeek) ===
                            0 ||
                            !Number(weeklyReport?.nutritionRatingLastWeek)) &&
                            Number(weeklyReport?.nutritionRatingThisWeek) ===
                              5 && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                You rated{' '}
                                {weeklyReport?.nutritionRatingThisWeek} out of 5
                                on nutrition level. Keep going
                              </div>
                            )}
                          {Number(weeklyReport?.nutritionRatingLastWeek) > 0 &&
                            Number(weeklyReport?.nutritionRatingLastWeek) >
                              Number(weeklyReport?.nutritionRatingThisWeek) && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                You have rated a lower score than last week.
                                Let's aim for higher score
                              </div>
                            )}
                          {Number(weeklyReport?.nutritionRatingLastWeek) > 0 &&
                            Number(weeklyReport?.nutritionRatingLastWeek) <
                              Number(weeklyReport?.nutritionRatingThisWeek) && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                You have rated a higher score than last
                                week.Keep Going!
                              </div>
                            )}
                          {Number(weeklyReport?.nutritionRatingLastWeek) ===
                            Number(weeklyReport?.nutritionRatingThisWeek) && (
                            <div className="font-sfpro text-[12px] text-offwhite">
                              You have rated the same as last week.Let's keep
                              going!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
            {weeklyReport?.userLast8WeekWeightHistory.length > 0 && (
              <div className=" flex flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                    {' '}
                    <img src="/assets/weight-machine.svg" alt="graph" />
                    Weight comparison
                  </div>
                  <p className="text-[10px] text-white-opacity-50">
                    last 8 weeks
                  </p>
                </div>
                <div className="flex justify-between gap-3">
                  <div>
                    <p className=" mb-1 mt-[10px] flex items-center gap-1 text-[10px] text-offwhite">
                      {' '}
                      <span className="font-futura text-[32px]   leading-[40px] text-blue">
                        {weeklyReport?.userLast8WeekWeightHistory[0]?.weight}{' '}
                        {weeklyReport?.weightUnit}
                      </span>{' '}
                    </p>
                    {weeklyReport?.userLast8WeekWeightHistory[1]?.weight ? (
                      <div className="flex items-center gap-1">
                        <div className="flex w-fit items-center  rounded-[3px] bg-[rgba(245,197,99,0.2)] px-1 py-[2px] font-sfpro text-[12px] text-yellow">
                          {weeklyReport?.userLast8WeekWeightHistory[0]?.weight -
                            weeklyReport?.userLast8WeekWeightHistory[1]
                              ?.weight >
                          0 ? (
                            <MdArrowDropUp />
                          ) : (
                            <MdArrowDropDown />
                          )}
                          {Math.abs(
                            weeklyReport?.userLast8WeekWeightHistory[0]
                              ?.weight -
                              weeklyReport?.userLast8WeekWeightHistory[1]
                                ?.weight,
                          )}{' '}
                          {weeklyReport?.weightUnit}
                        </div>
                        <p className="font-sfpro text-[10px] text-white-opacity-50">
                          since last week
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {weeklyReport?.userLast8WeekWeightHistory.length > 1 && (
                    <WeightLineChart
                      grahpData={
                        weeklyReport?.userLast8WeekWeightHistory &&
                        reverseArray(weeklyReport?.userLast8WeekWeightHistory)
                      }
                      yAxisKey={'weight'}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareWeeklyCheckinScreen;
