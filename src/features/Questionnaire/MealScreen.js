import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const MealScreen = ({ response, handleIngredientScreen, mealResponse }) => {
  const selectedResponse = response.find(
    (item) => item.code === 'onb15',
  )?.value;

  console.log(response, selectedResponse);
  const color = ['#FA5757', '#7E87EF', '#5ECC7B', '#DDF988'];

  return (
    <div className="relative z-[20]  flex flex-col gap-2">
      {selectedResponse.map((item) => (
        <div
          onClick={() => handleIngredientScreen(item)}
          className="flex items-center justify-between rounded-xl bg-black-opacity-45 pb-3 pl-4 pt-[22px] "
        >
          <div>
            <div className="flex gap-2">
              <img
                src={item !== '' && mealResponse[item.meal]?.img}
                alt="food"
                className=" "
              />
              <div className="font-sfpro text-[20px] text-offwhite">
                {' '}
                {item !== '' && mealResponse[item.meal]?.heading}
              </div>
            </div>

            <div className="mt-[10px] flex items-center gap-1">
              <div
                style={{
                  border: '0.5px solid rgba(94,204,123,0.38)',
                }}
                className="rounded-md px-1 font-sfpro text-[12px] text-green"
              >
                {item?.time?.length > 0 ? item.time : '9.30 AM'}
              </div>
              <div
                style={{
                  border: '0.5px solid rgba(94,204,123,0.38)',
                }}
                className="rounded-md px-1 font-sfpro text-[12px] text-green"
              >
                {item?.plateSize === 'small_plate'
                  ? 'Small Plate'
                  : 'Large Plate'}
              </div>
              <div className="flex h-min items-center gap-1">
                {Object.values(item?.mealProportion).map((portion, index) => (
                  <div
                    className={`w-[30px] rounded-[4px] text-center font-sfpro text-[14px] leading-4 text-black ${`bg-[${color[index]}]`}`}
                  >
                    {portion.replace('%', '')}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <MdKeyboardArrowRight className="text-[30px] text-green" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealScreen;
