import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error } from '../../components';
import axios from 'axios';
import { motion } from 'framer-motion';
import Calendar from './Calender';
import { getFormattedDate } from '../LifeStyleRoutines/utils';
import WeeklyWorkoutReport from '../Fitness/WeeklyWorkoutReport';
import { HiChevronDown } from 'react-icons/hi';
import WeeklyCheckInSuccessPopup from '../../components/WeeklyCheckInSuccessPopup';
import { IoArrowBackOutline } from 'react-icons/io5';
import mixpanel from 'mixpanel-browser';
import { FaArrowRight } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import AnimatedComponent from '../../components/AnimatedComponent';
import WeeklyCheckinConsistency from './WeeklyCheckinConsistency';
import WeeklyCheckinInitialIntro from './WeeklyCheckinInitialIntro';
import WeeklyCheckinSecondaryIntro from './WeeklyCheckinSecondaryIntro';
import ProgressBar from '../../components/ProgressBar';
import {
  capitalizeFirstLetter,
  updateCurrentQuestion,
} from '../LifestyleQuiz/utils/utils';
import OptionsSecond from '../Questionnaire/Components/inputs/OptionsSecond';
import OptionsNumber from '../Questionnaire/Components/inputs/OptionsNumber';
import WeeklyCheckinResult from './WeeklyCheckinResult';

import WeeklyCheckinLoadingScreem from './WeeklyCheckinLoadingScreem';
import InputText from './Component/InputText';

import QuestionnaireScreenOutput from './QuestionnaireScreenOutput';

const slideAnimation = {
  initial: {
    opacity: 0,
    y: '100vh', // Start from the bottom of the viewport
    scale: '80%',
  },
  animate: {
    opacity: 1,
    y: '0%', // End at the center position
    scale: '100%',
  },
  exit: {
    opacity: 0,
    y: '-20%',
    scale: '80%',
  },
};

const WeeklyCheckIn = () => {
  const [screen, setScreen] = useState('Introduction');
  const [questionnaireScreen, setQuestionnaireScreen] = useState(1);
  const [response, setResponse] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showNutritionScreen, setShowNutritionScreen] = useState(false);
  const [questionnaireLoading, setQuestionnaireLoading] = useState(false);
  const [nutritionLoading, setNutritionLoading] = useState(false);
  const [questionnaireForm, setQuestionnaireForm] = useState(null);
  const [nutritionData, setNutritionData] = useState({});
  const code = JSON.parse(localStorage.getItem('user'))['code'];

  useEffect(() => {
    setQuestionnaireLoading(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/questionnaire`,
        );
        if (res.data) {
          setQuestionnaireForm(res.data.data);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setQuestionnaireLoading(false);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review?memberCode=${code}&week='11Nov-17Nov-2024'`,
        );
      } catch (err) {
        console.error(err.message);
      } finally {
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    setNutritionLoading(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/nutritional-info`,
        );
        if (res.data) {
          setNutritionData(res.data.data);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setNutritionLoading(false);
      }
    }
    getUserData();
  }, []);

  const questionnaireData = [
    {
      color: 'blue',
      heading: 'Fitness and nutrition update',
      img: '/assets/weekly-checkin-intro-bg.svg',
    },
    {
      color: 'yellow',
      heading: 'Mind & body check-in',
      img: '/assets/yellow-background.svg',
    },
    {
      color: 'lightSkyBlue',
      heading: 'Measurements & photos',
      img: '/assets/blue-background.svg',
    },
  ];

  useEffect(() => {
    // it will update the current question as soon as the screen changes
    questionnaireForm &&
      updateCurrentQuestion(
        questionnaireForm,
        questionnaireScreen,
        setCurrentQuestion,
      );
  }, [questionnaireScreen, questionnaireForm]);

  return (
    <div className="relative h-screen ">
      {showNutritionScreen === true && (
        <div className="absolute top-0 z-[120] h-screen w-full  backdrop-blur-sm">
          <AnimatedComponent
            animation={slideAnimation}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute bottom-0 z-[100] flex h-[90%] w-screen flex-col justify-between gap-[44px]  overflow-y-scroll rounded-t-3xl bg-black px-[20px] pt-[28px]"
          >
            <div className=" flex flex-col gap-[44px] ">
              <div className="flex justify-between">
                <div className="flex grow gap-2 font-sfpro text-[20px] leading-[32px] text-offwhite">
                  <img
                    src="/assets/leaf.svg"
                    className=" h-[31px] w-[31px] "
                    alt="background"
                  />
                  Natural Principles
                </div>
                <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
                  <RxCross1
                    onClick={() => setShowNutritionScreen(false)}
                    className=""
                  />
                </div>{' '}
              </div>
              <div className="flex flex-col gap-[26px]">
                {nutritionData?.map((item, index) => (
                  <div className="flex flex-col gap-[26px]">
                    <div className="flex gap-[20px]">
                      <div className="font-sfpro text-[14px] text-offwhite">
                        {index + 1}
                      </div>
                      <div>
                        <h5 className="font-sfpro text-[14px] text-offwhite">
                          {item.header}
                        </h5>
                        <p className="font-sfpro text-[14px] text-white-opacity-50">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowNutritionScreen(false)}
              className="  mb-[36px] flex w-full items-center justify-center gap-1 rounded-lg bg-white py-[14px] font-sfpro text-lg leading-[26px] text-black"
            >
              Back
            </button>
          </AnimatedComponent>
        </div>
      )}

      {screen === 'Introduction' && (
        <WeeklyCheckinInitialIntro setScreen={setScreen} />
      )}
      {screen === 'Introduction2' && (
        <WeeklyCheckinSecondaryIntro setScreen={setScreen} />
      )}
      {screen === 'result' && <WeeklyCheckinResult setScreen={setScreen} />}
      {screen === 'resultLoading' && (
        <WeeklyCheckinLoadingScreem setScreen={setScreen} />
      )}
      {screen === 'questionnaire' && (
        <QuestionnaireScreenOutput
          currentQuestion={currentQuestion}
          questionnaireData={questionnaireData}
          response={response}
          screen={screen}
          setResponse={setResponse}
          setScreen={setScreen}
          setShowNutritionScreen={setShowNutritionScreen}
          questionnaireScreen={questionnaireScreen}
          setQuestionnaireScreen={setQuestionnaireScreen}
        />
      )}
    </div>
  );
};

export default WeeklyCheckIn;
