import React from 'react';
import FitnessGraph from './graphs/FitnessGraph';

const FitnessProgress = ({ apiData }) => {
  return (
    <div>
      <div className="mt-4 px-4 sm:mt-10 sm:px-10">
        <h1 className="purple-gradient font-sf-pro mt-2 text-left text-[22.33px] sm:mt-8 sm:text-center sm:text-2xl">
          Fitness Score Progress
        </h1>
      </div>
      <div className="">
        <FitnessGraph apiData={apiData} />
      </div>
      <div>
        <p className="font-sf-pro mt-8 px-4 text-left text-sm sm:px-32 sm:text-center sm:text-base">
          {apiData?.data?.summary}
        </p>
      </div>
    </div>
  );
};

export default FitnessProgress;
