import mixpanel from 'mixpanel-browser';
import React, { useEffect, useState } from 'react';
import Stories from 'react-insta-stories';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { axiosClient } from './apiClient';
import BarChart from './Components/BarChart';
import Overview from './Components/Overview';
import RadarChart from './Components/RadarChart';
import {
  getCurrentYear,
  getPreviousMonth,
  getPreviousMonthYear,
} from './utils';

function MainPage() {
  const todayDate = getPreviousMonthYear();
  const [currentMonthNumber, currentMonthName] = getPreviousMonth();
  const currentYear = getCurrentYear();
  const userName = JSON.parse(localStorage.getItem('user'))['name'];
  const userCode = JSON.parse(localStorage.getItem('user'))['code'];
  const navigate = useNavigate();

  const [barChartData, setBarChartData] = useState(null);
  const [radarChartData, setRadarChartData] = useState(null);
  const [weightInfoData, setWeightInfoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  function closePage() {
    navigate('/');
  }

  function fetchMonthlyWrappedData() {
    setLoading(true);
    axiosClient
      .get(`?user=${userCode}&month=${currentMonthNumber}&year=${currentYear}`)
      .then((res) => {
        mixpanel.track('Monthly wrapped opened');
        if (Object.keys(res?.data?.data?.wrapped).length === 0) {
          setErrorMsg('Your wrapped data was not found');
        }
        const {
          rank,
          totalWorkout,
          perfectWeeks,
          totalWeeks,
          workoutByDay,
          bestDay,
          fitnessScore,
          fitnessScoreChange,
          currMonthSkillPoint,
          prevMonthSkillPoint,
          bestSkill,
          weightInfo,
        } = res?.data?.data?.wrapped;
        const { lifted, imgUrl, caption } = weightInfo;
        setBarChartData((prev) => {
          return {
            rank: rank,
            totalWorkout: totalWorkout,
            totalWeeks: totalWeeks,
            perfectWeeks: perfectWeeks,
            workoutByDay: workoutByDay,
            bestDay: bestDay,
          };
        });
        setRadarChartData((prev) => {
          return {
            fitnessScore: fitnessScore,
            fitnessScoreChange: fitnessScoreChange,
            currMonthSkillPoint: currMonthSkillPoint,
            prevMonthSkillPoint: prevMonthSkillPoint,
            bestSkill: bestSkill,
          };
        });
        setWeightInfoData((prev) => {
          return {
            lifted: lifted,
            imgUrl: imgUrl,
            caption: caption,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchMonthlyWrappedData();
  }, []);

  const stories = [
    {
      content: ({ action, isPaused }) => {
        return (
          <div className="mt-[50px] flex h-[100%] w-full flex-col items-center justify-start gap-[100px] bg-transparent px-2">
            <h2
              className="text-[23px] text-white/80"
              style={{
                lineHeight: '49.87px',
                letterSpacing: '0.46px',
                fontWeight: 600,
              }}
            >
              {userName}
            </h2>
            <div className="relative bottom-[100px] h-[200px] w-[350px]">
              <img src="/assets/star_fire_streak.png" alt="star" />
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <h1
                className="text-[47px] text-white/80"
                style={{
                  textAlign: 'center',
                  fontWeight: 600,
                  lineHeight: '49.87px',
                  letterSpacing: '0.935px',
                }}
              >
                Monthly Wrapped
              </h1>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.23)',
                  textAlign: 'center',
                  fontSize: '23.225px',
                  fontWeight: 600,
                  letterSpacing: '0.464px',
                }}
              >
                Insights into the reflection of your month
              </p>
            </div>
          </div>
        );
      },
    },
    {
      content: ({ action, isPaused }) => {
        return (
          <div className="mt-[50px] flex h-[100%] w-full flex-col items-center justify-start gap-5 bg-transparent px-4">
            <h2
              className="text-[23px] text-white/80"
              style={{
                lineHeight: '49.87px',
                letterSpacing: '0.46px',
                fontWeight: 600,
              }}
            >
              {userName}
            </h2>
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex w-fit flex-col items-center justify-center">
                <h4
                  style={{
                    letterSpacing: '0.288px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.33)',
                    fontSize: '14.385px',
                  }}
                >
                  Rank
                </h4>
                <p
                  style={{
                    letterSpacing: '0.579px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.80)',
                    fontSize: '28.952px',
                    lineHeight: '30.888px',
                  }}
                >
                  {barChartData?.rank}
                </p>
              </div>
              <div className="flex w-fit flex-col items-center justify-center">
                <h4
                  style={{
                    letterSpacing: '0.288px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.33)',
                    fontSize: '14.385px',
                  }}
                >
                  Workouts
                </h4>
                <p
                  style={{
                    letterSpacing: '0.579px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.80)',
                    fontSize: '28.952px',
                    lineHeight: '30.888px',
                  }}
                >
                  {barChartData?.totalWorkout}
                </p>
              </div>
              <div className="flex w-fit flex-col items-center justify-center">
                <h4
                  style={{
                    letterSpacing: '0.288px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.33)',
                    fontSize: '14.385px',
                  }}
                >
                  Perfect Weeks
                </h4>
                <p
                  style={{
                    letterSpacing: '0.579px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.80)',
                    fontSize: '28.952px',
                    lineHeight: '30.888px',
                  }}
                >{`${barChartData?.perfectWeeks}/${barChartData?.totalWeeks}`}</p>
              </div>
            </div>
            <BarChart barChartData={barChartData} />
          </div>
        );
      },
    },
    {
      content: ({ action, isPaused }) => {
        return (
          <div className="mt-[50px] flex h-[100%] w-full flex-col items-center justify-start gap-5 bg-transparent px-4">
            <h2
              className="text-[23px] text-white/80"
              style={{
                lineHeight: '49.87px',
                letterSpacing: '0.46px',
                fontWeight: 600,
              }}
            >
              {userName}
            </h2>
            <div className="flex flex-col items-center justify-center gap-1">
              <h4
                style={{
                  letterSpacing: '0.288px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.33)',
                  fontSize: '14.385px',
                }}
              >
                Fitness Score
              </h4>
              <div className="flex flex-row items-end justify-center">
                <h4
                  style={{
                    color: 'rgba(255, 255, 255, 0.80)',
                    fontSize: '28.952px',
                    fontWeight: 600,
                    lineHeight: '30.888px',
                    letterSpacing: '0.579px',
                  }}
                >
                  {radarChartData?.fitnessScore}
                </h4>
                <p
                  className={`${
                    radarChartData?.fitnessScoreChange?.includes('-')
                      ? 'text-red'
                      : 'text-[#5ECC7B]'
                  }`}
                  style={{
                    fontSize: '15.263px',
                    fontWeight: 600,
                    lineHeight: '16.283px',
                    letterSpacing: ' 0.305px',
                  }}
                >
                  {radarChartData?.fitnessScoreChange.includes('-') ||
                  radarChartData?.fitnessScoreChange.includes('+')
                    ? radarChartData?.fitnessScoreChange
                    : `+${radarChartData?.fitnessScoreChange}`}
                </p>
              </div>
            </div>
            {radarChartData && <RadarChart radarChartData={radarChartData} />}
          </div>
        );
      },
    },
    {
      content: ({ action, isPaused }) => {
        return (
          <div className="mt-[50px] flex h-[100%] w-full flex-col items-center justify-start gap-5 bg-transparent px-4">
            <h2
              className="text-[23px] text-white/80"
              style={{
                lineHeight: '49.87px',
                letterSpacing: '0.46px',
                fontWeight: 600,
              }}
            >
              {userName}
            </h2>
            <div className="flex flex-col items-center justify-center gap-1">
              <h4
                style={{
                  letterSpacing: '0.288px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.33)',
                  fontSize: '14.385px',
                }}
              >
                Weight Lifted
              </h4>
              <h4
                style={{
                  color: 'rgba(255, 255, 255, 0.80)',
                  fontSize: '28.952px',
                  fontWeight: 600,
                  lineHeight: '30.888px',
                  letterSpacing: '0.579px',
                }}
              >
                {weightInfoData?.lifted} Kg
              </h4>
            </div>
            {weightInfoData && <Overview weightInfoData={weightInfoData} />}
          </div>
        );
      },
    },
  ];

  return (
    <>
      {loading && (
        <Loader className={'fixed left-0 top-0 z-[1000] h-screen bg-black'} />
      )}
      {error && (
        <Error className={'fixed left-0 top-0 z-[200] w-screen bg-black'}>
          {errorMsg
            ? errorMsg
            : 'Something went wrong. Please try again later.'}
        </Error>
      )}
      {!loading && !error && (
        <div
          className="overflow-y-screen min-h-screen w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${'/assets/monthly_wrapped_bg.svg'})`,
          }}
        >
          <div className="flex min-h-screen w-full flex-col items-center justify-start gap-3 overflow-y-scroll py-5">
            <div className="relative flex w-full flex-col items-center justify-center gap-[1px]">
              <p className="text-[9.3px] text-[#929292] ">Monthly Wrapped</p>
              <p className="text-[14px] text-[#7E87EF]">{todayDate}</p>
              <img
                src="/assets/close_icon.svg"
                alt="star"
                height={37}
                width={37}
                className="absolute right-0"
                style={{ marginRight: '0.5em' }}
                onClick={closePage}
              />
            </div>
            <div className="h-full w-full flex-1 bg-transparent">
              <Stories
                loop={true}
                keyboardNavigation
                defaultInterval={3000}
                stories={stories}
                width={'100vw'}
                height={'100%'}
                storyContainerStyles={{ background: 'transparent' }}
              />
            </div>
            <img
              src={'/assets/monthly_wrapped_otm_logo.svg'}
              alt="otm"
              width={120}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
