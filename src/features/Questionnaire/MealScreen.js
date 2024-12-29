import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const MealScreen = ({ response, handleIngredientScreen, mealResponse }) => {
  return (
    <div className="relative z-[20]  flex flex-col gap-2">
      {response['onb15'].map((item) => (
        <div
          onClick={() => handleIngredientScreen(item)}
          className="flex items-center justify-between rounded-xl bg-black-opacity-45 pb-3 pl-4 pt-[22px] "
        >
          <div>
            <div className="flex gap-2">
              <img src={item !== '' && mealResponse[item].img} alt="food" />
              <div className="font-sfpro text-[20px] text-offwhite">
                {' '}
                {item !== '' && mealResponse[item].heading}
              </div>
            </div>

            <div className="mt-[10px] flex items-center gap-1">
              <div
                style={{
                  border: '0.5px solid rgba(94,204,123,0.38)',
                }}
                className="rounded-md px-1 font-sfpro text-[12px] text-green"
              >
                9.30 am
              </div>
              <div
                style={{
                  border: '0.5px solid rgba(94,204,123,0.38)',
                }}
                className="rounded-md px-1 font-sfpro text-[12px] text-green"
              >
                Small Plate
              </div>
              <div className="flex h-min items-center gap-1">
                <div className="w-[30px] rounded-[4px] bg-red text-center font-sfpro text-[14px] leading-4 text-black">
                  25
                </div>
                <div className="w-[30px] rounded-[4px] bg-blue text-center font-sfpro text-[14px] leading-4 text-black">
                  25
                </div>
                <div className="w-[60px] rounded-[4px] bg-green text-center font-sfpro text-[14px] leading-4 text-black">
                  50
                </div>
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
