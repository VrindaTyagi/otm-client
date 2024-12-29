import React from 'react';

const FitnessInput = ({ code, setResponse, heading }) => {
  return (
    <div className=" flex h-[46px] items-center justify-between rounded-xl bg-white-opacity-08 px-[24px]">
      <div className="font-sfpro text-[16px] text-white-opacity-50">
        {heading}
      </div>
      <input
        type="number"
        onChange={(e) => {
          setResponse((prev) => {
            return {
              ...prev,
              [code]: [e.target.value],
            };
          });
        }}
        style={{
          border: '0.5px solid rgba(126,135,239,0.38)',
        }}
        className="h-[35px] w-[80px] rounded-md  bg-black-opacity-45 text-center text-offwhite  placeholder:text-center  placeholder:text-[14px] placeholder:text-white-opacity-26"
        placeholder="0"
      />
    </div>
  );
};

export default FitnessInput;
