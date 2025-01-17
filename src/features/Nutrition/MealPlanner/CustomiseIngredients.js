import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { shallowEqual, useSelector } from 'react-redux';
import IngredientOption from './Components/IngredientOption';
import * as Selectors from './Redux/selectors';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

function CustomiseIngredients() {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const selectSuggestedIngredients = Selectors.makeGetSuggestedIngredients();
  const selectNutritionPlan = Selectors.makeGetNutritionPlan();
  const selectQuestionSectionInfo = Selectors.makeGetQuestionSectionInfo();
  const [showMoreItems, setShowMoreItems] = useState(false);
  const suggestedIngredients = useSelector(
    selectSuggestedIngredients,
    shallowEqual,
  );

  const nutritionPlan = useSelector(selectNutritionPlan, shallowEqual);
  const questionSectionInfo = useSelector(
    selectQuestionSectionInfo,
    shallowEqual,
  );
  const selectSelectedIngredients = Selectors.makeGetSelectedIngredients();
  const selectedIngredients = useSelector(
    selectSelectedIngredients,
    shallowEqual,
  );

  const screen = questionSectionInfo.screen;

  const { calorie } = nutritionPlan;

  const handleAccordionToggle = (category) => {
    setShowMoreItems(false);
    setExpandedAccordion((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };

  return (
    <div className="my-11 h-full w-full">
      {screen === 4 && (
        <div className="flex h-full w-full flex-col justify-start gap-[6rem]">
          <section className="flex w-full flex-col items-start justify-center gap-2">
            <h5 className="text-[18px]" style={{ lineHeight: '23px' }}>
              Suggested calories in a day
            </h5>
            <h2
              className="text-[32px] text-[#F5C563]"
              style={{ lineHeight: '40px' }}
            >
              {calorie}
            </h2>
          </section>
        </div>
      )}
      {screen === 5 && (
        <div className="flex h-full w-full flex-col justify-start gap-7">
          <div className="flex w-full flex-col gap-1">
            <h2 className="text-[18px]" style={{ lineHeight: '23px' }}>
              Customize your ingredients
            </h2>
            <p
              className="text-[16px] text-[#929292]"
              style={{ lineHeight: '20px', fontWeight: 400 }}
            >
              Uncheck ingredients you don’t want in your meal plan
            </p>
          </div>
          {Object.keys(suggestedIngredients).length !== 0 &&
            Object.keys(suggestedIngredients).map((category) => {
              const filterSelectedIngredients = suggestedIngredients[
                category
              ].filter((item) => selectedIngredients.includes(item._id));
              return (
                <Accordion
                  key={category}
                  expanded={expandedAccordion === category}
                  onChange={() => handleAccordionToggle(category)}
                  style={{
                    background: 'none',
                    border: 'solid #7E87EF 1px ',
                    boxShadow: 'none',
                    borderRadius: '12px',
                  }}
                  className="flex w-full flex-col items-start justify-center rounded-md"
                >
                  <AccordionSummary
                    style={{
                      width: '-webkit-fill-available',
                      padding: '0px 16px',
                    }}
                    className="flex items-center  justify-center"
                  >
                    <Typography className="w-full text-[16px] capitalize text-[#7E87EF]">
                      {category}
                    </Typography>
                    <div className="flex gap-2">
                      {filterSelectedIngredients && (
                        <Typography className="flex w-[100px] justify-end text-[10px] capitalize text-[#7E87EF]">
                          {filterSelectedIngredients.length} selected
                        </Typography>
                      )}

                      <Typography className="flex items-center text-lg text-[#7E87EF]">
                        {expandedAccordion === category ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="flex w-full flex-col items-center justify-start gap-2">
                    {suggestedIngredients[category].map((ingredient, idx) => (
                      <>
                        {showMoreItems === false && idx < 6 && (
                          <IngredientOption
                            optionValue={ingredient.ingredient}
                            description={ingredient.nutritional_value}
                            optionID={ingredient._id}
                            key={ingredient._id}
                          />
                        )}
                        {showMoreItems === true && (
                          <IngredientOption
                            optionValue={ingredient.ingredient}
                            description={ingredient.nutritional_value}
                            optionID={ingredient._id}
                            key={ingredient._id}
                          />
                        )}
                      </>
                    ))}
                    {suggestedIngredients[category].length > 6 && (
                      <div
                        onClick={() => setShowMoreItems(!showMoreItems)}
                        className="text-sm text-blue"
                      >
                        {showMoreItems === false ? 'Show More' : 'Show Less'}
                      </div>
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default CustomiseIngredients;
