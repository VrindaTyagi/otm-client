import React, { useEffect, useState } from 'react';
import HomeBar from '../components/homeBar';
import Section from '../components/section';

const Workout = () => {
  const [workout, setWorkout] = useState([]);

  const fetchWorkout = async () => {
    try {
      const workoutRes = await fetch(
        'https://otm-main-production.up.railway.app/api/v1/workout/hyper?memberCode=KU',
      );

      const workoutData = await workoutRes.json();
      console.log(workoutData);
      setWorkout(workoutData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => fetchWorkout, []);

  const sectionContainerStyle = {
    width: '300px',
    // height: '920px',
    flexShrink: 0,
    // borderRadius: '920px',
    // background: 'rgba(163, 146, 111, 0.15)',
    // filter: 'blur(199.13499450683594px)',
  };

  const topDivStyle = {
    backgroundImage: "url('/assets/workout-top.png')",
    background:
      'linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.87) 20.83%, rgba(0, 0, 0, 0.71) 45.47%, rgba(0, 0, 0, 0.72) 68.01%, rgba(0, 0, 0, 0.42) 100%)',
      // width: '390px',
    // height: '233px',
  };

  return (
    <div className="w-[390px]">
      <div style={topDivStyle}>
        <div className="flex flex-row">
          <img src={'/assets/chevron.left.svg'}></img>
          <p className="pl-[10px] font-['SF_Pro_Text'] text-[14px] font-normal not-italic leading-[20px]">
            Home
          </p>
        </div>

        <p className="font-['SF_Pro_Display'] text-[32px] font-bold not-italic leading-[40px]">
          Workout
        </p>
        <p className="pt-[2px] font-['SF_Pro_Display'] text-[22px] font-bold not-italic leading-[32px]">
          Today's focus
        </p>
        <p className="px-[0] py-[10px] font-['SF_Pro_Display'] text-[31.565px] font-bold not-italic leading-[45.913px]">
          STRENGTH
        </p>
      </div>
      <p className="font-['SF_Pro_Display'] text-[22px] font-bold not-italic leading-[32px] text-[#FFF]">
        Section
      </p>
      <p className="font-['SF_Pro_Text'] text-[16px] font-medium not-italic leading-[20px] text-[#A3926F]">
        2 rounds
      </p>
      <div style={sectionContainerStyle}>
        <Section />
        <Section />
        <Section />
        <Section />
      </div>
      <HomeBar />
    </div>
  );
};

export default Workout;
