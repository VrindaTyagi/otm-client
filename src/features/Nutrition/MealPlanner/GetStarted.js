import React from 'react';
import Carousel from '../../../components/Carousel';

function GetStarted() {
  const carouselComponents = [
    <img src="/assets/mealplanner_getstarted_1.svg" alt="First Slide" />,
    <img src="/assets/mealplanner_getstarted_2.svg" alt="Second Slide" />,
    <img src="/assets/mealplanner_getstarted_3.svg" alt="Third Slide" />,
    <img src="/assets/mealplanner_getstarted_4.svg" alt="Fourth Slide" />,
  ];
  return (
    <div className="flex w-full flex-col items-center justify-between gap-9">
      <h3
        className="text-[26px] text-[#F8F8F8]"
        style={{ lineHeight: '41.6px' }}
      >
        Meal Planning Made Easy
      </h3>
      <Carousel carouselComponents={carouselComponents} playTime={3} />
    </div>
  );
}

export default GetStarted;
