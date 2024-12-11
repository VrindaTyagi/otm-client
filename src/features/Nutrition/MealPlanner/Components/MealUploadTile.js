import React from 'react';

function MealUploadTile({ mealType, mealUrl, mealNutritionAnalysis }) {
  // const Collapsed = () => {
  //   const barRef = useRef();
  //   const { width } = useContainerDimensions(barRef);

  //   return (

  //   );
  // };

  return (
    <div className="mt-2 w-full rounded-[12px] bg-[rgba(0,0,0,0.45)] px-4 py-2">
      <div className="flex w-full flex-row items-start justify-around ">
        <div className="flex w-full items-start justify-start gap-2">
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="flex w-full items-center justify-between ">
              <h3
                className="flex items-start rounded-[4.5px] bg-[rgba(94,204,123,0.12)] px-[8px] py-[3.5px] font-sfpro text-[12px] font-medium capitalize text-green"
                style={{ lineHeight: '16.71px' }}
              >
                <img
                  src="./assets/correct.svg"
                  className="mr-[4px]"
                  alt="Completed"
                />
                Completed {mealType === 'eveningSnack' && 'Evening Snack'}
                {mealType === 'morningSnack' && 'Morning Snack'}
                {(mealType === 'lunch' ||
                  mealType === 'breakfast' ||
                  mealType === 'dinner') &&
                  mealType}
              </h3>
              <h3
                className=" flex items-start font-sfpro text-[20px]  capitalize text-yellow"
                style={{ lineHeight: '16.71px' }}
              >
                {mealNutritionAnalysis.calories}KCAL
              </h3>
            </div>
            <div className="flex">
              <div className="h-[99px] w-[84px] grow">
                <img src={mealUrl} className="object-cover" alt="img" />
              </div>
              <span className="ml-4 w-[200px]">
                <p className="font-sfpro text-[14px] font-medium text-customWhite">
                  {mealNutritionAnalysis.mealName}
                </p>
                <p className="font-sfpro text-[10px] font-medium text-darkTextGray">
                  {mealNutritionAnalysis.feedback}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealUploadTile;
