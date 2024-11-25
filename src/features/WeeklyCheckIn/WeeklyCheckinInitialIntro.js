import React from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import { FaArrowRight } from 'react-icons/fa6';

const WeeklyCheckinInitialIntro = ({ setScreen }) => {
  return (
    <div className="relative z-40 flex h-screen flex-col ">
      <img
        src="/assets/weekly-checkin-intro.svg"
        className=" w-full object-cover"
        alt="intro_image"
      />
      <img
        src="/assets/weekly-checkin-intro-bg.svg"
        className="absolute top-0 z-50 w-full  brightness-75 saturate-150 filter  "
        alt="background"
      />
      <AnimatedComponent className=" relative z-[100] mx-4 flex grow flex-col justify-end pt-[70px] ">
        <div className="flex gap-[6px] font-sfpro text-sm font-medium text-offwhite">
          <img
            src="/assets/otm-small-white-logo.svg"
            className=" "
            alt="logo"
          />
          Weekly Goal Tracker
        </div>
        <h3 className=" font-Futurse  mt-[30px] text-[32px] leading-[40px] text-blue">
          Small steps lead to big <br />
          results
        </h3>

        <div className="mb-[56px] mt-1 font-sfpro  text-sm font-medium text-white-opacity-50">
          Log your week, see how far you’ve come, and <br />
          let’s strategise for what’s next!
        </div>
        <button
          onClick={() => setScreen('Introduction2')}
          className="mb-[36px] flex w-full items-center justify-center gap-1 rounded-lg bg-white py-[14px] font-sfpro text-lg leading-[26px] text-black"
        >
          Get Started <FaArrowRight />
        </button>
      </AnimatedComponent>
    </div>
  );
};

export default WeeklyCheckinInitialIntro;
