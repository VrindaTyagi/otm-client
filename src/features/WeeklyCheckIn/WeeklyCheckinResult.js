import React, { useRef } from 'react';
import { FaHome } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../Profile/apiProfileClient';
import { capitalizeFirstLetter } from '../../utils';
import WeightLineChart from './Component/Chart';
import domtoimage from 'dom-to-image';
import { GiNightSleep } from 'react-icons/gi';
import { IoIosNutrition } from 'react-icons/io';
import { MdArrowDropDown } from 'react-icons/md';
import { MdArrowDropUp } from 'react-icons/md';

const WeeklyCheckinResult = ({ setScreen, week, weeklyReport }) => {
  const navigate = useNavigate();
  const userProfilePicture = JSON.parse(
    localStorage?.getItem('profilePicture'),
  );
  const name = JSON.parse(localStorage.getItem('user'))['name'];

  const summaryRef = useRef(null);

  const weightLiftedComapre = () => {
    const latest = weeklyReport?.last8WeekWeightLifted[0]?.totalWeightLifted;
    const secondLatest =
      weeklyReport?.last8WeekWeightLifted[1]?.totalWeightLifted;

    return latest - secondLatest;
  };
  const numbersColor = [
    //Give UI to our stress /nutrition etc levels.
    {
      bg: 'bg-[rgba(250,87,87,0.20)]',
      text: 'text-[#FA5757]',
    },
    {
      bg: 'bg-[rgba(206,138,71,0.20)]',
      text: 'text-[#CE8A47]',
    },
    {
      bg: 'bg-[rgba(245,197,99,0.20)]',
      text: 'text-[#F5C563]',
    },
    {
      bg: 'bg-[rgba(148,176,48,0.08)]',
      text: 'text-[#94B030]',
    },
    {
      bg: 'bg-[rgba(94,204,123,0.20)]',
      text: 'text-[#5ECC7B]',
    },
  ];

  const captureAndShareToWhatsApp = async () => {
    //function to take screenshot of our result screen and later share it.
    if (summaryRef.current) {
      try {
        // Capture screenshot
        const dataUrl = await domtoimage.toPng(summaryRef.current);

        // Create share text
        const shareText = `  Check out my weekly checkin report!`;

        // Check if Web Share API is supported
        if (navigator.share) {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'workout-summary.png', {
            type: 'image/png',
          });

          await navigator.share({
            text: shareText,
            files: [file],
          });
        } else {
          // Fallback for desktop browsers
          const encodedText = encodeURIComponent(shareText);
          const whatsappUrl = `https://web.whatsapp.com/send?text=${encodedText}`;
          window.open(whatsappUrl, '_blank');
        }

        // console.log('summary share tracking initiated');
        // mixpanel.track('Workout Summary Shared', {
        //   device_type: getDeviceType(),
        // });
      } catch (error) {
        console.error('Error capturing or sharing screenshot:', error);
      }
    }
  };

  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];

  const caiptalInitial = capitalizeFirstLetter(fullName);

  async function getMemberData(code) {
    try {
      const res = await axiosClient.get(`/profile`, {
        params: { code: code },
      });
      if (res.data.profilePicture) {
        localStorage.setItem(
          'profilePicture',
          JSON.stringify(res.data.profilePicture),
        );
      } else {
        localStorage.setItem('profilePicture', JSON.stringify(''));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  if (!userProfilePicture && userProfilePicture !== '') {
    getMemberData(code);
  }

  return (
    <div>
      <img
        src="/assets/weekly-checkin-intro-bg.svg"
        className="absolute top-0 -z-50 w-full  brightness-75 saturate-150 filter  "
        alt="background"
      />
      <div className="relative h-screen overflow-y-scroll bg-black-opacity-65 px-[15px] pb-[110px] pt-[100px] ">
        <div>
          <div className=" absolute right-[16px] top-10 z-[110] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
            <RxCross1 onClick={() => navigate('/')} className="" />
          </div>
          <div className="flex justify-between">
            <div>
              <div className="w-fit rounded   bg-white-opacity-08 px-[6px]  text-[14px] font-extralight text-blue"></div>
              <h5 className="mt-[2px] text-[20px] leading-[32px] text-offwhite">
                Hi {name}, <br /> Here’s your week in Numbers
              </h5>
            </div>
            <div className="h-[40px] min-w-[40px]">
              {' '}
              {userProfilePicture ? (
                <img
                  loading="lazy"
                  src={userProfilePicture}
                  className="h-[40px] w-[40px] rounded-lg object-cover"
                  alt="img"
                />
              ) : (
                <div className="flex h-[53px] w-[53px] items-center justify-center rounded-xl bg-black-opacity-45 text-3xl text-white">
                  {caiptalInitial}
                </div>
              )}
            </div>
          </div>

          <div
            ref={summaryRef}
            className="mt-[24px] flex h-full flex-col gap-2 bg-none"
          >
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
                  grahpData={weeklyReport?.last4WeekConsistency}
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
                      {weeklyReport?.last8WeekWeightLifted[0]?.totalWeightLifted.toFixed(
                        0,
                      )}{' '}
                      {weeklyReport?.weightUnit}
                    </span>{' '}
                    Total weight lifted this week
                    {weightLiftedComapre() !== 0 && (
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
                  grahpData={weeklyReport?.last8WeekWeightLifted}
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
                    <p className="font-futura text-[18px] leading-[19px] text-blue"></p>
                    <p className="font-sfpro text-[10px] text-white-opacity-50">
                      steps per day
                    </p>
                  </div>
                </div>
                <WeightLineChart
                  grahpData={weeklyReport?.last4WeekStepCount}
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
                      <div className="flex items-center ">
                        <div className="perfect-week mt-2 flex w-fit items-center rounded">
                          <img src="assets/star.svg" alt="" />
                          <span className="mx-0.5  text-xs font-[700] -tracking-[0.36px] text-[#4a3e1d] ">
                            Perfect Week x{weeklyReport?.perfectWeek?.streak}
                          </span>
                        </div>
                      </div>
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
                              !Number(weeklyReport?.energyLevelLastWeek)) && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                You rated {weeklyReport?.energyLevelThisWeek}{' '}
                                out of 5 on stress level. Let's aim for a higher
                                score
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
                          !Number(weeklyReport?.stressLevelsLastWeek)) && (
                          <div className="font-sfpro text-[12px] text-offwhite">
                            You rated {weeklyReport?.stressLevelsThisWeek} out
                            of 5 on stress level. Let's aim for a lower score
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
                              !Number(weeklyReport?.sleepQualityLastWeek)) && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                You rated {weeklyReport?.sleepQualityThisWeek}{' '}
                                out of 5 on stress level. Let's aim for a higher
                                score
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
                            !Number(weeklyReport?.nutritionRatingLastWeek)) && (
                            <div className="font-sfpro text-[12px] text-offwhite">
                              You rated {weeklyReport?.nutritionRatingThisWeek}{' '}
                              out of 5 on stress level. Let's aim for a higher
                              score
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
            {weeklyReport?.last8WeekWeightHistory > 0 && (
              <div className=" flex flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                    {' '}
                    <img src="/assets/weight-machine.svg" alt="graph" />
                    Weight callomparison
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
                        {weeklyReport?.last8WeekWeightHistory[0]?.weight}{' '}
                        {weeklyReport?.weightUnit}
                      </span>{' '}
                    </p>
                    {weeklyReport?.last8WeekWeightHistory[1]?.weight && (
                      <div className="flex items-center gap-1">
                        <div className="flex w-fit items-center  rounded-[3px] bg-[rgba(245,197,99,0.2)] px-1 py-[2px] font-sfpro text-[12px] text-yellow">
                          {weeklyReport?.last8WeekWeightHistory[0]?.weight -
                            weeklyReport?.last8WeekWeightHistory[1]?.weight >
                          0 ? (
                            <MdArrowDropUp />
                          ) : (
                            <MdArrowDropDown />
                          )}
                          {Math.abs(
                            weeklyReport?.last8WeekWeightHistory[0]?.weight -
                              weeklyReport?.last8WeekWeightHistory[1]?.weight,
                          )}{' '}
                          {weeklyReport?.weightUnit}
                        </div>
                        <p className="font-sfpro text-[10px] text-white-opacity-50">
                          since last week
                        </p>
                      </div>
                    )}
                  </div>
                  {weeklyReport?.last8WeekWeightHistory.length > 1 && (
                    <WeightLineChart
                      grahpData={weeklyReport?.last8WeekWeightHistory}
                      yAxisKey={'weight'}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-[100] flex w-full gap-2 px-4 pb-[36px]">
        <button
          onClick={() => navigate('/home')}
          className="flex w-[114px] items-center justify-center rounded-lg bg-graySecond font-sfpro text-[18px] font-medium leading-[25px]"
        >
          <FaHome size={32} />
        </button>
        <button
          onClick={() => captureAndShareToWhatsApp()}
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
