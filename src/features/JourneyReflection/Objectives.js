import React, { useMemo } from 'react';

const ObjectiveSlider = ({ heading, detail, index }) => {
  const colors = useMemo(
    () => ['#7E87EF', '#F5C563', '#DDF988', '#5ECC7B'],
    [],
  );
  const headingColor = colors[index % colors.length];
  return (
    <div className="flex min-w-[300px] flex-col items-start justify-start gap-[2px]">
      <div className="w-full rounded-t-[12px] bg-[#1c1c1e] px-3 py-2">
        <h1
          className="text-[16px]"
          style={{ fontWeight: 600, color: headingColor }}
        >
          {heading}
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

const Objectives = ({ apiData }) => {
  return (
    <div>
      <div className="mt-4 flex w-full flex-col items-start justify-center sm:mt-10">
        <h1
          className="purple-gradient w-full px-6 text-left text-[22.33px] sm:text-center sm:text-2xl"
          style={{ lineHeight: '25px', marginBlock: '10px' }}
        >
          Your Top 3 Objectives
        </h1>
        <div className="hide-scrollbar mt-2 flex w-full flex-row gap-5 overflow-x-scroll px-4">
          {apiData?.data?.objectives?.map((item, index) => {
            return (
              <ObjectiveSlider
                heading={item?.heading}
                detail={item?.details}
                index={index}
                key={item?.heading}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Objectives;
