import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import BackButton from '../../components/BackButton';
import ScoreIndicator from './Components/ScoreIndicator';
function BMIScreen({
  screen,
  questions,
  response,
  getScreenCounts,
  setSection,
  setScreen,
  submitResponse,
  setShowBMIScreen,
  setShowPlansScreen,
}) {
  return (
    <div className="absolute left-0 top-0 z-50 flex min-h-screen w-full flex-col items-center justify-between  overflow-x-hidden px-6 py-9">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="mx-auto my-4 flex w-full items-center justify-center">
          <BackButton
            size={30}
            action={() => {
              setShowBMIScreen(false);
              setSection('generalInformation');
            }}
            className="absolute left-[5%] w-fit cursor-pointer"
          />
        </div>
      </div>
      <div>
        <h1 className="text-center text-[24px] text-[#7e87ef]">
          Discover your BMI
        </h1>
        <div className="mt-[16px] h-full w-full">
          <p className="text-center font-sfpro text-[18px] font-light text-offwhite">
            Your personal health indicator
          </p>
          <ScoreIndicator
            height={Number(response['onb4'][0])}
            weight={Number(response['onb3'][0])}
          />
        </div>
      </div>
      <button
        onClick={() => {
          setShowBMIScreen(false);
          setShowPlansScreen(true);
        }}
        className="bg-customWhiteSecond flex min-h-[54px] w-full items-center justify-center rounded-xl text-center text-black"
      >
        Next <FaArrowRight />{' '}
      </button>
    </div>
  );
}

export default BMIScreen;
