import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MealDoughnut } from './MealDoughnut';
import MealCrossIcon from './icons/MealCrossIcon';

const MealPage = ({
  mealInfo = {},
  imageURL = 'No URL',
  finalDate = 'No Date',
  setParentVisibilityCheck,
}) => {
  console.log('mealInfo', mealInfo);

  const navigate = useNavigate();
  // routing
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname !== '/lifestyle-routine') {
      navigate('/nutrition');
    } else {
      setParentVisibilityCheck(true);
      console.log('default function of router', location.pathname);
    }
  };

  return (
    <div className="py-4">
      <div className="flex w-full flex-row items-center justify-center ">
        <p className="pl-2 font-sfpro  text-[14px] font-medium text-custompurple">
          {finalDate}
        </p>

        <div onClick={handleClick} className="absolute right-0 mr-4">
          <MealCrossIcon />
        </div>
      </div>

      {Object.keys(mealInfo).length !== 0 ? (
        <>
          <div className="mb-5 mt-7 flex h-auto items-center justify-center">
            {/* meal info */}
            <div className="h-fit w-full rounded-lg p-5  text-white">
              <img
                src={imageURL} // Replace this with the actual image URL
                alt="imagetitle"
                className="float-left mr-3 max-h-[130px] w-[122px] rounded-lg object-cover"
              />
              <h2 className="text-left font-sfpro text-[20px] font-medium leading-[31.03px]">
                {mealInfo.mealName}
              </h2>
              <p className="text-gray-400">{mealInfo.feedback || ''}</p>
            </div>
          </div>
          {mealInfo.calories && (
            <div className="flex items-center justify-center ">
              <MealDoughnut mealInfo={mealInfo}></MealDoughnut>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center">
          No meal data found
        </div>
      )}

      <div onClick={handleClick} className="fixed bottom-4 left-0 w-full px-3">
        <button className="w-full rounded-xl bg-custompurple px-[14px] py-[10px] text-black ">
          Done
        </button>
      </div>

      <div className="h-[40px] w-[1px]  "></div>
    </div>
  );
};

export default MealPage;
