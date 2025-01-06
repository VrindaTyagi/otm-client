import React, { useEffect, useState } from 'react';

const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url); // Resolve with the image URL when loaded
        img.onerror = () => reject(url); // Reject if the image fails to load
      });
    }),
  );
};

const JourneyScreen = () => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 1000); // Delay of 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-20 h-screen w-screen overflow-y-scroll bg-black">
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
      <div className="absolute left-4 top-[80px] flex gap-3 text-[20px] text-offWhite-opacity-1">
        <img src="/assets/otm-small-white-logo.svg" className="h-[30px]" />
        Craft Your Journey
      </div>
      {showComponent && (
        <div className="animate-fadeIn  relative z-[60]  px-4  transition-opacity duration-1000">
          <div className="flex gap-2 ">
            <img src="/assets/muscle-star-color.svg" className="" />
            <div className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text font-futura text-2xl text-transparent">
              ULTIMATE SHRED
            </div>
          </div>

          <div className="mb-[80px] mt-[30px]">
            <div className="text-[10px] text-white-opacity-50">
              Usually takes 5 mins
            </div>
            <p className="mt-[6px] font-sfpro text-[20px] text-offWhite-opacity-70">
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
      )}
    </div>
  );
};

export default JourneyScreen;
