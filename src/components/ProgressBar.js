import React, { useEffect, useRef, useState } from 'react';

const ProgressBar = ({ currValue, totalValue, questionnaireData }) => {
  const widthRef = useRef(null);
  const [totalLength, setTotalLength] = useState(0);
  const [progressLength, setProgressLength] = useState(0);

  useEffect(() => {
    setTotalLength(widthRef.current?.clientWidth);

    // setting the progress length according to the currValue
    setProgressLength((currValue / totalValue) * totalLength);
  }, [currValue, totalValue, totalLength]);

  return (
    <div className="flex flex-col items-center">
      {/* 

    useEffect(() => {
        setTotalLength(widthRef.current?.clientWidth);
        // setting the progress length according to the currValue
        setProgressLength((currValue/totalValue) * totalLength);
    }, [currValue, totalValue, totalLength])

  return (
    <div ref={widthRef} className='w-[250px] h-[3px] rounded-[30px] bg-white/20'>
        <div className='h-[3px] rounded-[30px] bg-white' style={{width: progressLength}}/>
    </div>
  ) */}
      <div
        className={`mb-[36px] mt-[45px] w-fit rounded bg-black-opacity-45 px-2 py-[2px] text-[14px] font-medium ${questionnaireData.text}`}
      >
        step {currValue} of 3
      </div>
      <div
        ref={widthRef}
        className="h-[6px] w-full rounded-[24px] bg-black-opacity-25"
      >
        <div
          className={` h-[6px] rounded-[30px] ${questionnaireData.bg}  `}
          style={{ width: progressLength }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
