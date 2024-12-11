import React, { useState } from 'react';
import CarouselIndicator from './CarouselIndicator';

/**
 * @param {array} carouselComponents -> takes an array of carousel components to be displayed in the carousel slide show
 * @param {bool} autoPlay -> indicates if the carousel shold play automatically or manually by sliding
 * @param {number} playTime (in seconds) -> when autoPlay is enabled, sets the time to display each component in the carousel
 */
function Carousel({ carouselComponents, autoPlay = true, playTime = 5 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [holding, setHolding] = useState(false);

  // function to reduce the current index by 1
  function reduceCurrentIndex() {
    if (currentIndex === 0) {
      setCurrentIndex(carouselComponents.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }
  // function to increase the current index by 1
  function increaseCurrentIndex() {
    if (currentIndex === carouselComponents.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-7">
      <div className="relative h-[406px] w-[358px] rounded-[12px]">
        <div
          className="absolute z-[100] flex h-full w-full flex-row items-center justify-between bg-transparent"
          onMouseDown={() => setHolding(true)}
          onMouseUp={() => setHolding(false)}
        >
          <div className="h-full w-1/2" onClick={reduceCurrentIndex}></div>
          <div className="h-full w-1/2" onClick={increaseCurrentIndex}></div>
        </div>
        {carouselComponents[currentIndex]}
      </div>
      <CarouselIndicator
        numberOfSlides={carouselComponents.length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isHolding={holding}
        countDownTimer={playTime}
        autoPlay={autoPlay}
      />
    </div>
  );
}

export default Carousel;
