import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode
    background: {
      default: '#121212', // Background color
      paper: '#1E1E1E', // Picker wrapper background
    },
    text: {
      primary: '#FFFFFF', // Primary text color
      secondary: '#AAAAAA', // Secondary text color
    },
  },
  components: {
    MuiClock: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E', // Clock face background
        },
        pin: {
          backgroundColor: '#BB86FC', // Pin in the center
        },
        thumb: {
          backgroundColor: '#BB86FC', // Clock pointer thumb
        },
      },
    },
    MuiClockNumber: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Unselected numbers color
        },
        selected: {
          backgroundColor: '#BB86FC', // Selected number background
          color: '#121212', // Selected number text color
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E', // Picker layout background
        },
      },
    },
  },
});

const IngredientScreen = ({
  response,
  setResponse,
  ingredient,
  setShowIngredientScreen,
}) => {
  const ingredientResponse = response
    .find((item) => item.code === 'onb15')
    .value.find((item) => item.meal === ingredient.id).ingredients;
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [showIngredient, setShowIngredients] = useState(null);
  const [ingredientType, setIngredientType] = useState(ingredientResponse);

  useEffect(() => {
    if (ingredientType.length > 0) {
      setResponse((prevResponse) =>
        prevResponse.map((item) => {
          if (item.code === 'onb15') {
            return {
              ...item,
              value: item.value.map((mealObj) =>
                mealObj.meal === ingredient.id
                  ? { ...mealObj, ingredients: ingredientType }
                  : mealObj,
              ),
            };
          }
          return item;
        }),
      );
    }
  }, [ingredientType]);

  console.log('xxx', ingredient, ingredientType);

  const handleTime = (e) => {
    const date = new Date(e);

    setSelectedTime(e);
    // Convert to desired time format
    const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format
    const minutes = date.getMinutes(); // Fixed minutes as 00
    const amPm = date.getHours() < 12 ? 'AM' : 'PM';

    const formattedTime = `${hours}:${minutes} ${amPm}`;

    setResponse((prevResponse) =>
      prevResponse.map((item) => {
        if (item.code === 'onb15') {
          return {
            ...item,
            value: item.value.map((mealObj) =>
              mealObj.meal === ingredient.id
                ? { ...mealObj, time: formattedTime }
                : mealObj,
            ),
          };
        }
        return item;
      }),
    );
  };

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
  const updateIngredients = ({ ingredient }) => {
    const existingType = ingredientType.find(
      (item) => item.type === showIngredient,
    );

    let existingIngredient = existingType?.options?.some(
      (item) => item === ingredient,
    );

    console.log('exist', existingType, existingIngredient);

    setIngredientType((prevData) => {
      // Check if the type already exists in the state
      const existingType = prevData.find(
        (item) => item.type === showIngredient,
      );

      if (existingType) {
        // If the type exists, update the options array
        return prevData.map((item) =>
          item.type === showIngredient
            ? {
                ...item,
                options: item.options.includes(ingredient)
                  ? item.options // Do nothing if the option already exists
                  : [...item.options, ingredient], // Add the new option
              }
            : item,
        );
      } else {
        // If the type doesn't exist, add a new entry
        return [...prevData, { type: showIngredient, options: [ingredient] }];
      }
    });

    console.log(showIngredient, ingredient, existingType, ingredientType);

    // setResponse((prevResponse) =>
    //   prevResponse.map((item) => {
    //     if (item.code === 'onb15') {
    //       return {
    //         ...item,
    //         value: item.value.map((mealObj) => {
    //           // {mealObj.meal === ingredient.id
    //           //   ? { ...mealObj, plateSize: newPlateSize }
    //           //   : mealObj}
    //           //   return null
    //         }),
    //       };
    //     }
    //     return item;
    //   }),
    // );
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
      <div className="mt-[60px] flex w-full justify-between">
        <div>{ingredient.value}</div>

        <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white-opacity-08 ">
          <RxCross1
            onClick={() => setShowIngredientScreen(false)}
            className=""
          />
        </div>
      </div>
      <div className="mt-[41px] flex flex-col gap-5">
        <div className="rounded-lg bg-white-opacity-08 px-4 py-[15px]">
          <div className="mb-[14px] font-sfpro text-[14px] text-offwhite">
            what time do you want to set for this meal?
          </div>
          <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid black',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: 'background.default', // Use theme's default background
                }}
              >
                <StaticTimePicker
                  value={selectedTime}
                  onChange={(newValue) => handleTime(newValue)}
                  components={{
                    ActionBar: () => null, // Removes OK/Cancel buttons
                  }}
                  sx={{
                    '& .MuiClock-root': {
                      backgroundColor: 'background.paper', // Dark background for the clock
                    },
                    '& .MuiClockNumber-root': {
                      color: 'text.primary', // White clock numbers
                    },
                    '& .MuiClockNumber-selected': {
                      backgroundColor: '#BB86FC', // Highlight for selected number
                      color: '#121212', // Contrast text
                    },
                    '& .MuiClock-pin': {
                      backgroundColor: '#BB86FC', // Center pin color
                    },
                    '& .MuiClockPointer-thumb': {
                      backgroundColor: '#BB86FC', // Thumb pointer color
                    },
                    '& .MuiPickerStaticWrapper-root': {
                      backgroundColor: 'background.paper', // Picker container background
                    },
                  }}
                />
              </Box>
            </LocalizationProvider>
          </ThemeProvider>

          <time />
        </div>
        <div className="rounded-lg bg-white-opacity-08 px-4 py-[15px]">
          <div className="font-sfpro text-[14px] text-offwhite">
            Set a plate size for lunch
            <div className="mt-[17px] flex w-full gap-2">
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
          <div className="mt-[31px]">
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
                        onClick={() =>
                          handleMealProportion(data.mealProportion)
                        }
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
                        onClick={() => updateIngredients({ ingredient })}
                        className={`rounded-xl  px-[23px] py-[11px] text-[16px]  bg-blend-luminosity ${
                          IngredientResponse.ingredients.some((item) =>
                            item.options.includes(ingredient),
                          )
                            ? 'border border-green bg-dark-green-opacity-66 text-green'
                            : 'bg-black-opacity-45 text-offwhite'
                        } `}
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
