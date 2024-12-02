import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import AnimatedComponent from '../../components/AnimatedComponent';

const NutritionScreen = ({ setShowNutritionScreen, nutritionData }) => {
  const slideAnimation = {
    initial: {
      opacity: 0,
      y: '100vh', // Start from the bottom of the viewport
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      y: '0%', // Move to the center position
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: '100vh', // Slide downward during unmount
      scale: 0.8,
    },
  };
  return (
    <div className="absolute top-0 z-[120] h-screen w-full  backdrop-blur-sm">
      <AnimatedComponent
        animation={slideAnimation}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute bottom-0 z-[100] flex h-[90%] w-screen flex-col justify-between gap-[44px]  overflow-y-scroll rounded-t-3xl bg-black px-[20px] pt-[28px]"
      >
        <div className=" flex flex-col gap-[44px] ">
          <div className="flex justify-between">
            <div className="flex grow gap-2 font-sfpro text-[20px] leading-[32px] text-offwhite">
              <img
                src="/assets/leaf.svg"
                className=" h-[31px] w-[31px] "
                alt="background"
              />
              Natural Principles
            </div>
            <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
              <RxCross1
                onClick={() => setShowNutritionScreen(false)}
                className=""
              />
            </div>{' '}
          </div>
          <div className="flex flex-col gap-[26px]">
            {nutritionData?.map((item, index) => (
              <div className="flex flex-col gap-[26px]">
                <div className="flex gap-[20px]">
                  <div className="font-sfpro text-[14px] text-offwhite">
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="font-sfpro text-[14px] text-offwhite">
                      {item.header}
                    </h5>
                    <p className="font-sfpro text-[14px] text-white-opacity-50">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowNutritionScreen(false)}
          className="  mb-[36px] flex w-full items-center justify-center gap-1 rounded-lg bg-white py-[14px] font-sfpro text-lg leading-[26px] text-black"
        >
          Back
        </button>
      </AnimatedComponent>
    </div>
  );
};

export default NutritionScreen;
