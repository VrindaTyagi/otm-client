import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Counter from '../../components/Counter';

const AchievementPage = () => {
  const navigate = useNavigate();

  //   useEffect(() => {

  //   }, []);

  return (
    <div className="hero bg-no-repeat">
      <div
        //   onClick={() => navigate('/workout-summary')}
        className="relative  flex h-full flex-col  items-center justify-around"
      >
        {/* heading */}
        <div className="">
          <img src="/assets/congratulations.svg" alt="" />

          <h3 className="-mt-4 text-center text-xs text-yellow">
            You completed another workout today
          </h3>
        </div>

        {/* total workout */}
        <div className=" text-center text-lightGray">
          <h4 className="text-[10px] uppercase  tracking-[3px]">
            total workouts
          </h4>
            <Counter currentValue={69} />

        </div>

        {/* achievements */}
        <h3 className="text-md text-lightGray">Achievements Unlocked</h3>
        <div></div>
      </div>
    </div>
  );
};

export default AchievementPage;
