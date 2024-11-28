import React, { useEffect, useState } from 'react';

const WeeklyCheckinLoadingScreem = ({ setScreen }) => {
  const LoadingGraphData = [
    { finalPercent: 55, initialPercent: 35, img: '/assets/bar-graph-logo.svg' },
    { finalPercent: 45, initialPercent: 85, img: '/assets/weight-icon.svg' },
    { finalPercent: 83, initialPercent: 30, img: '/assets/shoe-icon.svg' },
    { finalPercent: 65, initialPercent: 44, img: '/assets/star-icon.svg' },
    { finalPercent: 30, initialPercent: 75, img: '/assets/weight-machine.svg' },
    { finalPercent: 87, initialPercent: 60, img: '/assets/heart-icon.png' },
  ];

  const LoadingText = [
    `Users who track their weekly progress have seen a <span class='text-blue'>significant improvement</span> in their fitness goals.`,
    `Consistent tracking is linked to higher motivation and a <span class='text-blue'>50% greater chance</span> of achieving long-term success!`,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('result');
    }, 10000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  const [graphData, setGraphData] = useState(LoadingGraphData);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    // Start the animation after the component mounts
    const timer = setTimeout(() => {
      setGraphData((prev) =>
        prev.map((item) => ({
          ...item,
          initialPercent: item.finalPercent, // Smoothly update to the final percentage
        })),
      );
    }, 500); // Delay before animation starts

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Cycle through texts with slide and fade transition
    const textTimer = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % LoadingText.length); // Change text
    }, 4000); // Total interval duration

    return () => clearInterval(textTimer);
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center gap-[78px]">
      <img
        src="/assets/weekly-checkin-intro-bg.svg"
        className="h-scren absolute top-0 -z-50 w-full  brightness-75 saturate-150 filter"
        alt="background"
      />
      <div className="pt-[45%]">
        <h3 className="font-sfpro text-[20px] text-offwhite">
          Getting Your Report Ready
        </h3>
      </div>
      <div className="flex gap-4">
        {graphData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-[11px]">
            <div className="relative h-[90px] w-[9px] rounded-[24px] bg-white-opacity-08">
              <div
                style={{
                  height: `${item.initialPercent}%`,
                  transition: 'height 1.5s ease-in-out', // Smooth transition
                }}
                className="absolute bottom-0 flex w-[9px] justify-center rounded-[24px] bg-white-opacity-50 pt-[2px]"
              >
                <div className="h-[7px] w-[7px] rounded bg-offwhite"></div>
              </div>
            </div>
            <img src={item.img} className="h-[18px] w-[18px]" alt="pic" />
          </div>
        ))}
      </div>
      <div className="relative h-[100px] w-full overflow-hidden">
        <div
          style={{
            display: 'flex', // Flex container for sliding effect
            transform: `translateX(-${currentTextIndex * 100}%)`, // Slide effect
            transition: 'transform 0.5s ease-in-out', // Smooth slide transition
            width: `${LoadingText.length * 50}%`, // Dynamic width to fit all texts
          }}
        >
          {LoadingText.map((text, index) => (
            <div
              key={index}
              className="w-fit flex-shrink-0 px-[25px] text-center text-[20px] text-white-opacity-50"
              style={{
                opacity: currentTextIndex === index ? 1 : 0.5, // Fade effect for inactive text
                transition: 'opacity 0.5s ease', // Smooth fade transition
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCheckinLoadingScreem;
