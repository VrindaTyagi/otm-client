import React, { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import AnimatedComponent from '../../components/AnimatedComponent';
import WeeklyCheckinInitialIntro from './WeeklyCheckinInitialIntro';
import WeeklyCheckinSecondaryIntro from './WeeklyCheckinSecondaryIntro';
import { updateCurrentQuestion } from '../LifestyleQuiz/utils/utils';
import WeeklyCheckinResult from './WeeklyCheckinResult';

import WeeklyCheckinLoadingScreem from './WeeklyCheckinLoadingScreem';

import QuestionnaireScreenOutput from './QuestionnaireScreenOutput';
import NutritionScreen from './NutritionScreen';

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
  const [week, setWeek] = useState('');
  const [weeklyResponse, setWeeklyResponse] = useState(undefined);
  const [weeklyReport, setWeeklyReport] = useState(undefined);
  const [weeklyReviewLoading, setWeeklyReviewLoading] = useState(false);

  const getUserData = useMemo(
    () => async () => {
      setQuestionnaireLoading(true);
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
    },
    [], // Dependencies for memoization
  );

  useEffect(() => {
    getUserData(); // Invoke the memoized function
  }, []);

  console.log('90909', week);

  const getWeeklyReviewData = useMemo(
    () => async () => {
      if (week) {
        console.log('435445654654', week);
        setWeeklyReviewLoading(true);
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review?memberCode=${code}&week=${week}`,
          );
          if (res) {
            setWeeklyResponse(res.data.data.weeklyReview.response);
            setWeeklyReport(res.data.data.report);
          }
        } catch (err) {
          console.error(err.message);
        } finally {
          setWeeklyReviewLoading(false);
        }
      }
    },
    [week], // Dependencies for memoization
  );

  useEffect(() => {
    getWeeklyReviewData();
  }, [week]);

  // useEffect(() => {
  //   //Func to call get weekly review API
  //   async function getUserData() {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review?memberCode=${code}&week=${week}}`,
  //       );
  //     } catch (err) {
  //       console.error(err.message);
  //     } finally {
  //     }
  //   }
  //   getUserData();
  // }, []);

  useEffect(() => {
    //Func to call get weekly review API
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
    //Data to show heading and Background Color on different pages of questionnaire form
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
    console.log(questionnaireForm, '-------');
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
        <NutritionScreen
          nutritionData={nutritionData}
          setShowNutritionScreen={setShowNutritionScreen}
        />
      )}

      {screen === 'Introduction' && (
        <WeeklyCheckinInitialIntro setScreen={setScreen} />
      )}
      {screen === 'Introduction2' && (
        <WeeklyCheckinSecondaryIntro
          weeklyReviewLoading={weeklyReviewLoading}
          setWeek={setWeek}
          setScreen={setScreen}
          code={code}
        />
      )}
      {screen === 'result' && (
        <WeeklyCheckinResult
          setScreen={setScreen}
          week={week}
          weeklyReport={weeklyReport}
        />
      )}
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
          week={week}
          weeklyResponse={weeklyResponse}
          getWeeklyReviewData={getWeeklyReviewData}
        />
      )}
    </div>
  );
};

export default WeeklyCheckIn;
