import React from 'react';
import { Button } from '../../components';
import BackButton from '../../components/BackButton';
import { ProgressBar } from '../LifestyleQuiz';
import ScoreIndicator from './Components/ScoreIndicator';
function BMIScreen({
  screen,
  questions,
  response,
  getScreenCounts,
  decreaseScreenAndRank,
  setScreen,
  submitResponse,
  setShowBMIScreen,
}) {
  return (
    <div className="absolute left-0 top-0 z-50 flex min-h-screen w-full flex-col items-center justify-between bg-black px-6 py-9">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="mx-auto my-4 flex w-full items-center justify-center">
          <BackButton
            size={30}
            action={() => {
              setShowBMIScreen(false);
              decreaseScreenAndRank(screen, setScreen);
            }}
            className="absolute left-[5%] w-fit cursor-pointer"
          />
          <ProgressBar
            className="w-[250px]"
            currValue={screen}
            totalValue={getScreenCounts(questions)}
          />
        </div>
      </div>
      <div>
        <h1 className="text-center text-[22px] text-[#7e87ef]">
          Discover your BMI
        </h1>
        <div className="h-full w-full overflow-x-hidden">
          <p className="text-center text-[18px] text-[#545454]">
            Your personal health indicator
          </p>
          <ScoreIndicator
            height={Number(response['su4'][0])}
            weight={Number(response['su3'][0])}
          />
        </div>
      </div>
      <Button
        text={'Next'}
        type="lifestyle"
        action={() => {
          setShowBMIScreen(false);
        }}
      />
    </div>
  );
}

export default BMIScreen;
