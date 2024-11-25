import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WeeklyCheckinTile = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 700); // Toggle every 500ms
    return () => clearInterval(interval);
  }, []);

  return (
    <Link to="/weekly-checkin" className="">
      <div
        style={{
          background:
            'var(--Gradient-purple, linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%))',
        }}
        className="relative min-h-[98px] flex-col rounded-xl px-4 py-[9px]"
      >
        <div className="flex justify-between">
          <div>
            <div className="absolute -right-2 -top-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black-opacity-25">
              <div
                className={` flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[rgba(245,15,15,0.46)]  transition-opacity duration-700 ${
                  isVisible ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div
                  className={`h-[12px] w-[12px] rounded-full bg-[rgba(245,15,15)] transition-opacity duration-700 ${
                    isVisible ? 'opacity-100' : 'opacity-50'
                  }`}
                ></div>
              </div>
            </div>

            <div className="mb-2 flex h-min items-center">
              <img
                src="/assets/weekly-checkin-calender.svg"
                className="mr-[2px]"
                alt="calender"
              />
              <span className="pl-1 text-[15px] text-black">
                weekly checkin
              </span>
            </div>
            <div className=" font-sfpro text-[14px] leading-5 text-black">
              Log your stats to unlock key
            </div>
            <div className=" font-sfpro text-[14px] leading-4 text-black">
              insights and visualize your progress
            </div>
          </div>
          <div className="h-[1px] w-[100px]"></div>
          <div className="absolute bottom-[43px] right-5 z-[20] flex h-min items-center justify-center rounded-[3px] bg-green px-1 py-[2px] text-center text-[7px] leading-[8px] text-black-opacity-65">
            <img src="/assets/upArrow-black.svg" alt="calender" />
            12% since last week
          </div>
          <img
            src="/assets/weekly-checkin-intro-graph.svg"
            className="absolute bottom-0 right-[5px] z-10"
            alt="calender"
          />
        </div>
      </div>
    </Link>
  );
};

export default WeeklyCheckinTile;
