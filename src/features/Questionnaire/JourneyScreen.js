import React from 'react';

const JourneyScreen = () => {
  return (
    <div className="relative z-20 h-full w-screen bg-black">
      <img
        src="/assets/weekly-checkin-intro.svg"
        className=" w-full object-cover"
        alt="intro_image"
      />
      <img
        src="/assets/weekly-checkin-intro-bg.svg"
        class="absolute top-0 z-50 h-screen  w-full brightness-75 saturate-150 filter  "
        alt="background"
      />
      <div className="relative z-[60] px-4">
        <div className="flex gap-2">
          <img src="/assets/muscle-star-color.svg" className="" />
          <div className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text font-futura text-2xl text-transparent">
            ULTIMATE SHRED
          </div>
        </div>

        <div className="mt-[30px]">
          <div className="text-[10px] text-white-opacity-50">
            Usually takes 5 mins
          </div>
          <p className="text-offWhite-opacity-70 mt-[6px] font-sfpro text-[20px]">
            Take a{' '}
            <span className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text text-transparent">
              {' '}
              quick questionnaire
            </span>{' '}
            so we can understand you better and deliver results aligned with{' '}
            <span className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text text-transparent">
              your unique goals.
            </span>{' '}
            It only takes a few minutes to unlock a more{' '}
            <span className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text text-transparent">
              personalised journey!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JourneyScreen;
