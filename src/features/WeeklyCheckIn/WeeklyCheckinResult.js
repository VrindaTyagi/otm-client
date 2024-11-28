import React, { useRef } from 'react';
import { FaHome } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../Profile/apiProfileClient';
import { capitalizeFirstLetter } from '../../utils';
import WeightLineChart from './Component/Chart';
import domtoimage from 'dom-to-image';

const WeeklyCheckinResult = ({ setScreen }) => {
  const navigate = useNavigate();
  const userProfilePicture = JSON.parse(
    localStorage?.getItem('profilePicture'),
  );

  const summaryRef = useRef(null);

  const numbersColor = [
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
              <div className="w-fit rounded  bg-white-opacity-08 px-[6px]  text-[14px] font-extralight text-blue">
                Week 11-17 Nov
              </div>
              <h5 className="mt-[2px] text-[20px] leading-[32px] text-offwhite">
                Hi Vrinda, <br /> Here’s your week in Numbers
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
            className="mt-[24px] flex h-full flex-col gap-2 bg-transparent"
          >
            <div className=" relative flex flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-2 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/bar-graph-logo.svg" alt="graph" />
                  workouts completed this week
                </div>
                <p className="text-[10px] text-white-opacity-50">
                  last 4 weeks
                </p>
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
              <div className="absolute -right-3 top-6">
                <WeightLineChart />
              </div>
            </div>

            <div className="relative flex flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-2 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/weight-icon.svg" alt="graph" />
                  weight lifted
                </div>
                <p className="text-[10px] text-white-opacity-50">
                  last 4 weeks
                </p>
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
              <div className="absolute -right-3 top-6">
                <WeightLineChart />
              </div>
            </div>

            <div className="relative flex flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
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
              <div className="absolute -right-3 top-6">
                <WeightLineChart />
              </div>
            </div>

            <div className=" flex min-h-[113px] flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/star-icon.svg" alt="graph" />
                  perfect week streak
                </div>
                <p className="text-[10px] text-white-opacity-50">
                  last 4 weeks
                </p>
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
            <div className="flex flex-col justify-between gap-2">
              <div className="flex gap-2">
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
                        className={`border-box flex h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${numbersColor[1].bg}`}
                      >
                        <p
                          className={`font-futura text-[32px]  ${`${numbersColor[1].text}`}`}
                        >
                          1
                        </p>
                      </div>
                      <div className="text-[10px] text-offwhite">
                        {`You rated 3 out of 5 on stress level. Let's aim for a lower score`}
                        {`You have rated a lower score than last week.Keep Going!`}
                        {`You have rated a higher score than last week.Let's aim for lower score`}
                        {`You have rated the same as last week.Let's keep going!`}
                      </div>
                    </div>
                  </div>
                </div>

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
                      className={`border-box flex  h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${numbersColor[1].bg}`}
                    >
                      <p
                        className={`font-futura text-[32px]  ${`${numbersColor[1].text}`}`}
                      >
                        1
                      </p>
                    </div>
                    <div className="text-[10px] text-offwhite">
                      {`You rated 3 out of 5 on stress level. Let's aim for a lower score`}
                      {`You have rated a lower score than last week.Keep Going!`}
                      {`You have rated a higher score than last week.Let's aim for lower score`}
                      {`You have rated the same as last week.Let's keep going!`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className=" flex w-1/2 grow  flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                  <div className="flex flex-col  justify-between ">
                    <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                      {' '}
                      <img src="/assets/leaf-yellow-icon.svg" alt="graph" />
                      Sleep levels
                    </div>
                    <div className="mt-2 flex gap-3">
                      {' '}
                      <div
                        className={`border-box flex h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${numbersColor[1].bg}`}
                      >
                        <p
                          className={`font-futura text-[32px]  ${`${numbersColor[1].text}`}`}
                        >
                          1
                        </p>
                      </div>
                      <div className="text-[10px] text-offwhite">
                        {`You rated 3 out of 5 on stress level. Let's aim for a lower score`}
                        {`You have rated a lower score than last week.Keep Going!`}
                        {`You have rated a higher score than last week.Let's aim for lower score`}
                        {`You have rated the same as last week.Let's keep going!`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex w-1/2 grow  flex-col rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                  <div className="flex items-center justify-between ">
                    <div className="flex grow items-center gap-1 text-[15px] font-semibold text-offwhite">
                      {' '}
                      <img
                        src="/assets/heart-icon.png"
                        alt="graph"
                        className="h-[15px] w-[15px]"
                      />
                      Nutrition level
                    </div>
                  </div>
                  <div className="mt-2 flex gap-3">
                    {' '}
                    <div
                      className={`border-box flex h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${numbersColor[1].bg}`}
                    >
                      <p
                        className={`font-futura text-[32px]  ${`${numbersColor[1].text}`}`}
                      >
                        1
                      </p>
                    </div>
                    <div className="text-[10px] text-offwhite">
                      {`You rated 3 out of 5 on stress level. Let's aim for a lower score`}
                      {`You have rated a lower score than last week.Keep Going!`}
                      {`You have rated a higher score than last week.Let's aim for lower score`}
                      {`You have rated the same as last week.Let's keep going!`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/weight-machine.svg" alt="graph" />
                  weight comparison
                </div>
                <p className="text-[10px] text-white-opacity-50">
                  last 4 weeks
                </p>
              </div>
              <p className=" mb-1 mt-[10px] flex items-center gap-1 text-[10px] text-offwhite">
                {' '}
                <span className="font-futura text-[32px]   leading-[40px] text-blue">
                  82Kgs
                </span>{' '}
                workout last week
              </p>
              <div className="flex items-center gap-1">
                <div className="flex w-fit items-center gap-1 rounded-[3px] bg-[rgba(245,197,99,0.2)] px-1 py-[2px] font-sfpro text-[12px] text-yellow">
                  320 Gms
                </div>
                <p className="font-sfpro text-[10px] text-white-opacity-50">
                  since
                </p>
              </div>
            </div>
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
