import React from 'react';
import WeightLineChart from './Component/Chart';
import { GiNightSleep } from 'react-icons/gi';
import { IoIosNutrition } from 'react-icons/io';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const ShareWeeklyCheckinScreen = ({
  weeklyReport,
  summaryRef,
  weightLiftedComapre,
  numbersColor,
  formatToK,
  reverseArray,
  week,
  convertToWeekFormat,
  userProfilePicture,
  caiptalInitial,
}) => {
  const navigate = useNavigate();
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  return <div ref={summaryRef} className="bg-black"></div>;
};

export default ShareWeeklyCheckinScreen;
