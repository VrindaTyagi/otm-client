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
  return <div className="my-11 h-full w-full"></div>;
}

export default CustomiseIngredients;
