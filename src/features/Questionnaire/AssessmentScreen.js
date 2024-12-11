import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import BackButton from '../../components/BackButton';
import { ProgressBar } from '../LifestyleQuiz';

function AssessmentScreen({
  screen,
  questions,
  getScreenCounts,
  decreaseScreenAndRank,
  setScreen,
  setShowAssessmentScreen,
  submitResponse,
}) {
  const navigate = useNavigate();
  return (
    <div className="absolute left-0 top-0 z-50 flex min-h-screen w-full flex-col items-center justify-between bg-black px-6 py-9">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="mx-auto my-4 flex w-full items-center justify-center">
          <BackButton
            size={30}
            action={() => {
              setShowAssessmentScreen(false);
              decreaseScreenAndRank(screen, setScreen);
            }}
            className="absolute left-[5%] w-fit cursor-pointer"
          />
          <ProgressBar
            className="w-[250px]"
            currValue={screen}
            totalValue={getScreenCounts(questions)}
          />
          <p
            className="absolute right-[5%] w-fit cursor-pointer text-[14px] text-[#848ce9]"
            onClick={() => navigate('/questionnaire/fitness-score')}
          >
            Skip
          </p>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-start justify-center gap-3">
        <h1 className="text-center text-[32px] text-[#7e87ef]">
          One Last Thing
        </h1>
        <p
          className="text-[24px] text-[#b1b1b1]"
          style={{ lineHeight: '38px' }}
        >
          Take a mini-assessment that will help us tailor a program suited to
          your current level.
        </p>
      </div>
      <Button
        text={'Take Assessment'}
        type="lifestyle"
        action={() => {
          setShowAssessmentScreen(false);
        }}
      />
    </div>
  );
}

export default AssessmentScreen;
