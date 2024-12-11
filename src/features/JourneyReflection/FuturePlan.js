import React, { useMemo } from 'react';

const FuturePlanSlider = ({ month, theme, detail, index }) => {
  const colors = useMemo(
    () => ['#7E87EF', '#F5C563', '#DDF988', '#5ECC7B'],
    [],
  );
  const headingColor = colors[index % colors.length];
  return (
    <div className="flex min-w-[310px] flex-col items-start justify-start gap-[2px]">
      <div className="flex w-full gap-2 rounded-t-[12px] bg-[#1c1c1e] px-3 py-2">
        <h1 className="text-[16px] text-white" style={{ fontWeight: 600 }}>
          {month}
        </h1>
        <h1
          className="text-[16px]"
          style={{ fontWeight: 600, color: headingColor }}
        >
          {theme}
        </h1>
      </div>
      <div className="w-full rounded-b-[12px] bg-[#1c1c1e] p-3">
        <p className="text-[14px] text-[#fff]" style={{ fontWeight: 500 }}>
          {detail}
        </p>
      </div>
    </div>
  );
};

const FuturePlan = ({ apiData }) => {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <h1
        className="purple-gradient w-full px-6 text-left text-[22.33px] sm:text-center sm:text-3xl"
        style={{ lineHeight: '25px', marginBlock: '10px' }}
      >
        Future Plan
      </h1>
      <div className="hide-scrollbar mt-2 flex w-full flex-row gap-5 overflow-x-scroll px-2">
        {apiData?.data?.futurePlan?.map((item, index) => {
          return (
            <FuturePlanSlider
              month={item?.month}
              theme={item?.theme}
              detail={item?.details}
              index={index}
              key={item?.index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FuturePlan;
