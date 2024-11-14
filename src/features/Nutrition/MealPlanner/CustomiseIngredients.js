import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import IngredientOption from './Components/IngredientOption';
import * as Selectors from './Redux/selectors';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';

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
  const screen = questionSectionInfo?.screen;

  const calorie = nutritionPlan?.calorie;

  return <div className="my-11 h-full w-full"></div>;
}

export default CustomiseIngredients;
