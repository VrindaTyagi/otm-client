import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
const IngredientScreen = ({
  response,
  setResponse,
  ingredient,
  setShowIngredientScreen,
}) => {
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [showIngredient, setShowIngredients] = useState(null);

  const handleIngredientTabs = (e) => {
    if (showIngredient === e) {
      setShowIngredients(null);
    }
    if (showIngredient !== e) {
      setShowIngredients(e);
    }
  };

  const mealproportion = [
    {
      id: 'gut_opening',
      protion: [
        {
          img: '/assets/food-gutopening.svg',
          mealProportion: {
            fruit: '50%',
            seeds: '50%',
          },
        },
      ],
    },
    {
      id: 'brunch',
      protion: [
        {
          img: '/assets/food-breakfast.svg',
          mealProportion: {
            protein: '50%',
            rawVeggies: '25%',
            cookedVeggies: '25%',
          },
        },
      ],
    },
    {
      id: 'breakfast',
      protion: [
        {
          img: '/assets/food-breakfast.svg',
          mealProportion: {
            protein: '50%',

            rawVeggies: '25%',
            cookedVeggies: '25%',
          },
        },
      ],
    },
    {
      id: 'lunch',
      protion: [
        {
          img: '/assets/food-lunch.svg',
          mealProportion: {
            protein: '25%',
            carbs: '25%',
            rawVeggies: '25%',
            cookedVeggies: '25%',
          },
        },
        {
          img: '/assets/food-dinner.svg',
          mealProportion: {
            protein: '25%',
            fats: '25%',
            rawVeggies: '25%',
            cookedVeggies: '25%',
          },
        },
      ],
    },
    {
      id: 'evening_snacks',
      protion: [
        {
          img: '/assets/food-gutopening.svg',
          mealProportion: {
            fruit: '50%',
            seeds: '50%',
          },
        },
      ],
    },
    {
      id: 'dinner',
      protion: [
        {
          img: '/assets/food-lunch.svg',
          mealProportion: {
            protein: '25%',
            carbs: '25%',
            rawVeggies: '25%',
            cookedVeggies: '25%',
          },
        },
        {
          img: '/assets/food-dinner.svg',
          mealProportion: {
            protein: '25%',
            fats: '25%',
            rawVeggies: '25%',
            cookedVeggies: '25%',
          },
        },
      ],
    },
  ];
  const updateIngredients = ({ showIngredient, ingredient }) => {
    console.log(showIngredient, ingredient);

    setResponse((prevResponse) =>
      prevResponse.map((item) => {
        if (item.code === 'onb15') {
          return {
            ...item,
            value: item.value.map((mealObj) => {
              // {mealObj.meal === ingredient.id
              //   ? { ...mealObj, plateSize: newPlateSize }
              //   : mealObj}
              //   return null
            }),
          };
        }
        return item;
      }),
    );
  };

  const updatePlateSize = (newPlateSize) => {
    setResponse((prevResponse) =>
      prevResponse.map((item) => {
        if (item.code === 'onb15') {
          return {
            ...item,
            value: item.value.map((mealObj) =>
              mealObj.meal === ingredient.id
                ? { ...mealObj, plateSize: newPlateSize }
                : mealObj,
            ),
          };
        }
        return item;
      }),
    );
  };

  const handleMealProportion = (proportionData) => {
    setResponse((prevResponse) =>
      prevResponse.map((item) => {
        if (item.code === 'onb15') {
          return {
            ...item,
            value: item.value.map((mealObj) =>
              mealObj.meal === ingredient.id
                ? { ...mealObj, mealProportion: proportionData }
                : mealObj,
            ),
          };
        }
        return item;
      }),
    );
  };

  const IngredientResponse = response
    .find((item) => item.code === 'onb15')
    .value.find((item) => item.meal === ingredient.id);

  console.log('4454545454', ingredient, response, IngredientResponse);
  return (
    <div className="fixed bottom-0 left-0 z-20 h-[100%] w-screen overflow-y-scroll bg-black px-4 py-5">
      <div className="flex w-full justify-between">
        <div>{ingredient.value}</div>

        <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white-opacity-08 ">
          <RxCross1
            onClick={() => setShowIngredientScreen(false)}
            className=""
          />
        </div>
      </div>

      <div className="rounded-lg bg-white-opacity-08 px-4 py-[15px]">
        <div className="font-sfpro text-[14px] text-offwhite">
          what time do you want to set for this meal?
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimeClock', 'TimeClock']}>
            <DemoItem>
              <StaticTimePicker
                value={selectedTime}
                onChange={setSelectedTime}
                components={{
                  ActionBar: () => null, // Completely removes the action bar with OK and Cancel buttons
                }}
                className="bg-black"
                sx={{
                  // Change the root container background
                  '& .MuiPickerStaticWrapper-root': {
                    backgroundColor: '#ffffff', // Entire picker wrapper background
                    color: '#000000', // Text color
                    borderRadius: '16px', // Optional rounded corners
                  },
                  // Change the layout (clock + numbers + labels)
                  '& .MuiPickersLayout-root': {
                    backgroundColor: '#ffffff',
                  },
                  // Change the clock background
                  '& .MuiClock-pickerView': {
                    backgroundColor: '#ffffff',
                  },
                  // Adjust clock numbers
                  '& .MuiClockNumber-root': {
                    color: '#000000', // Clock numbers color
                  },
                  // Change selected number style
                  '& .MuiClockNumber-selected': {
                    backgroundColor: '#000000', // Background of selected number
                    color: '#ffffff', // Text color for selected number
                  },
                  // Change the clock pin
                  '& .MuiClock-pin': {
                    backgroundColor: '#000000',
                  },
                  // Change the clock pointer thumb
                  '& .MuiClockPointer-thumb': {
                    backgroundColor: '#000000',
                  },
                }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <time />
      </div>
      <div className="rounded-lg bg-white-opacity-08 px-4 py-[15px]">
        <div className="font-sfpro text-[14px] text-offwhite">
          Set a plate size for lunch
          <div className="flex w-full gap-2">
            <div
              onClick={() => updatePlateSize('small_plate')}
              className={`flex h-[92px] w-full flex-col justify-between rounded-[12px] bg-black px-3 py-2  ${
                IngredientResponse.plateSize === 'small_plate'
                  ? 'border border-green text-green'
                  : 'text-white'
              }`}
            >
              <div>Small Plate</div>
              <div className="flex justify-end">
                <div
                  className={`flex h-[36px]  w-[36px] items-center justify-center rounded-full border-2 ${
                    IngredientResponse.plateSize === 'small_plate'
                      ? 'border-green'
                      : 'border-white'
                  } `}
                >
                  <div
                    className={`h-[20px] w-[20px]  rounded-full border-[1px] ${
                      IngredientResponse.plateSize === 'small_plate'
                        ? 'border-green'
                        : 'border-white'
                    } `}
                  ></div>
                </div>
              </div>
            </div>
            <div
              onClick={() => updatePlateSize('large_plate')}
              className={`flex h-[92px] w-full flex-col justify-between rounded-[12px] bg-black px-3 py-2 ${
                IngredientResponse.plateSize === 'large_plate'
                  ? 'border border-green text-green'
                  : 'text-white'
              }`}
            >
              <div>Large Plate</div>
              <div className="flex justify-end">
                <div
                  className={`flex h-[50px]  w-[50px] items-center justify-center rounded-full border-2  ${
                    IngredientResponse.plateSize === 'large_plate'
                      ? 'border-green'
                      : 'border-white'
                  } `}
                >
                  <div
                    className={`h-[30px] w-[30px]  rounded-full border-[1px] ${
                      IngredientResponse.plateSize === 'large_plate'
                        ? 'border-green'
                        : 'border-white'
                    } `}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white-opacity-08 px-4 py-[15px]">
        <div className="font-sfpro text-[14px] text-offwhite">
          Choose your preferred meal proportion
        </div>
        <div>
          {mealproportion.map((item) => {
            if (item.id === ingredient.id) {
              return (
                <div>
                  {item.protion.map((data, i, proportion) => (
                    <div
                      className={`rounded-xl bg-black-opacity-45 ${
                        proportion.length === 1 && 'border border-green'
                      }  ${
                        IngredientResponse.mealProportion.carbs ===
                          data.mealProportion.carbs && 'border border-green'
                      }`}
                      onClick={() => handleMealProportion(data.mealProportion)}
                      key={data.mealProportion}
                    >
                      <img className="ml-2 mt-3" src={data.img} alt="food" />
                    </div>
                  ))}
                </div>
              );
            } else return null;
          })}
        </div>
      </div>

      <div className="mt-[24px] pb-[37px]">
        <div className="font-sfpro text-[14px] ">Customize you ingredients</div>

        <div className=" font-sfpro text-sm text-white-opacity-23">
          uncheck ingregients you don't want in your meal plan
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {ingredient?.modifications
          ?.find((item) => item.target.includes('ingredients'))
          .ingredients.map((item) => (
            <div key={item.type}>
              <div className=" items-center rounded-xl bg-white-opacity-08 px-4 py-[19px] capitalize">
                <div
                  className="flex w-full justify-between"
                  onClick={() => handleIngredientTabs(item.type)}
                >
                  <div className="font-sfpro text-sm text-customWhiteSecond">
                    {' '}
                    {item.type}
                  </div>
                  <img
                    src="assets/arrow-down-gree.svg"
                    className={`${
                      showIngredient === item.type && 'rotate-180'
                    }`}
                    alt="arrow"
                  />
                </div>
                {showIngredient === item.type && (
                  <div className="mt-[22px] flex flex-col gap-2">
                    {item.options.map((ingredient) => (
                      <div
                        onClick={() =>
                          updateIngredients({ showIngredient, ingredient })
                        }
                        className="rounded-xl bg-black-opacity-45 px-[23px] py-[11px] text-[16px] text-offwhite"
                      >
                        {ingredient}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IngredientScreen;
