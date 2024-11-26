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
import InputText from '../Questionnaire/Components/inputs/InputText';
import {
  capitalizeFirstLetter,
  updateCurrentQuestion,
} from '../LifestyleQuiz/utils/utils';
import OptionsSecond from '../Questionnaire/Components/inputs/OptionsSecond';
import OptionsNumber from '../Questionnaire/Components/inputs/OptionsNumber';

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
  const [response, setResponse] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const profilePicCameraRef = useRef(null);
  const profilePicRef = useRef(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [showNutritionScreen, setShowNutritionScreen] = useState(false);
  const [chosenPic, setChosenPic] = useState([]);

  const navigate = useNavigate();

  const dummyQuestionnaireData = [
    {
      code: 'WKR1',
      content: 'How would you rate your workout performance this week?',
      description: 'How would you rate your workout performance this week?',
      inputType: 'multiChoice',
      rank: 1,
      screen: 1,
      target: 'fullPerf',
      options: [
        {
          id: 'EXCELLENT',
          value: 'Excellent',
        },
        {
          id: 'GOOD',
          value: 'Good',
        },
        {
          id: 'NEW',
          value: 'New',
        },
        {
          id: 'OLD',
          value: 'Olda',
        },
      ],
    },
    {
      code: 'WKR2',
      content:
        'Did you feel any improvements in strength or endurance this week?',
      description:
        'Did you feel any improvements in strength or endurance this week?',
      inputType: 'singleChoice',
      rank: 2,
      screen: 1,
      target: 'fullPerf',
      options: [
        {
          id: 'YES',
          value: 'Yes',
        },
        {
          id: 'NO',
          value: 'No',
        },
      ],
      text: true,
    },
    {
      code: 'WKR3',
      content:
        'Were there any challenges or areas you struggled with in your workouts?',
      description:
        'Were there any challenges or areas you struggled with in your workouts?',
      inputType: 'singleChoice',
      rank: 3,
      screen: 1,
      target: 'fullPerf',
      options: [
        {
          id: 'YES',
          value: 'Yes',
        },
        {
          id: 'NO',
          value: 'No',
        },
      ],
      text: true,
    },

    {
      code: 'WKR4',
      content: 'How well did you follow the nutrition principles this week?',
      inputType: 'singleChoice',
      rank: 4,
      screen: 1,
      target: 'fullPerf',
      options: [
        {
          id: 1,
          value: 1,
        },
        {
          id: 2,
          value: 2,
        },
        {
          id: 3,
          value: 3,
        },
        {
          id: 4,
          value: 4,
        },
        {
          id: 5,
          value: 5,
        },
      ],
    },

    {
      code: 'WKR5',
      content: 'Did you experience any issues with respect to nutrition?',
      description: 'Did you experience any issues with respect to nutrition?',
      inputType: 'singleChoice',
      rank: 5,
      screen: 1,
      target: 'fullPerf',
      options: [
        {
          id: 'YES',
          value: 'Yes',
        },
        {
          id: 'NO',
          value: 'No',
        },
      ],
      text: true,
    },

    {
      code: 'WKR6',
      content: 'Rate your energy levels',
      description: 'Rate your energy levels',
      inputType: 'singleChoice',
      rank: 1,
      screen: 2,
      target: 'fullPerf',
      options: [
        {
          id: 1,
          value: 1,
        },
        {
          id: 2,
          value: 2,
        },
        {
          id: 3,
          value: 3,
        },
        {
          id: 4,
          value: 4,
        },
        {
          id: 5,
          value: 5,
        },
      ],
    },
    {
      code: 'WKR7',
      content: 'Rate your stress levels',
      description: 'Rate your stress levels',
      inputType: 'singleChoice',
      rank: 2,
      screen: 2,
      target: 'fullPerf',
      options: [
        {
          id: 1,
          value: 1,
        },
        {
          id: 2,
          value: 2,
        },
        {
          id: 3,
          value: 3,
        },
        {
          id: 4,
          value: 4,
        },
        {
          id: 5,
          value: 5,
        },
      ],
    },
    {
      code: 'WKR8',
      content: 'Achievements from this week',
      rank: 3,
      screen: 2,
      text: true,
    },
    {
      code: 'WKR9',
      content: 'Notes for next week',
      rank: 3,
      screen: 2,
      text: true,
    },
  ];
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

  const handleNextClick = () => {
    if (questionnaireScreen < 3) {
      setQuestionnaireScreen(questionnaireScreen + 1);
    }
  };

  const handleBackClick = () => {
    if (questionnaireScreen > 1) {
      setQuestionnaireScreen(questionnaireScreen - 1);
    }
    if (questionnaireScreen === 1) {
      setScreen('Introduction2');
    }
  };

  useEffect(() => {
    // it will update the current question as soon as the screen changes
    dummyQuestionnaireData &&
      updateCurrentQuestion(
        dummyQuestionnaireData,
        questionnaireScreen,
        setCurrentQuestion,
      );
  }, [questionnaireScreen]);

  function handlePicUpload(e, num) {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      if (num === undefined) {
        reader.onloadend = () => {
          setChosenPic((prevPics) => [...prevPics, reader.result]);
        };
      }

      if (num === 0) {
        setChosenPic(chosenPic.filter((item, index) => index !== num));
        reader.onloadend = () => {
          setChosenPic((prevPics) => [reader.result, ...prevPics]);
        };
      }

      if (num === 1) {
        setChosenPic(chosenPic.filter((item, index) => index !== num));
        reader.onloadend = () => {
          setChosenPic((prevPics) => [...prevPics, reader.result]);
        };
      }

      reader.readAsDataURL(file);
      e.target.value = null;

      // axios
      //   .post(
      //     `${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client/profile-picture`,
      //     formData,
      //   )
      //   .then((res) => {
      //     console.log('profile picture updated!');
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setProfilePicError(true);
      //   });
    }
  }

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
                <div className="flex gap-[20px]">
                  <div className="font-sfpro text-[14px] text-offwhite">1</div>
                  <div>
                    <h5 className="font-sfpro text-[14px] text-offwhite">
                      Lorem ipsum dolor sit amet
                    </h5>
                    <p className="font-sfpro text-[14px] text-white-opacity-50">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <div className="flex gap-[20px]">
                  <div className="font-sfpro text-[14px] text-offwhite">2</div>
                  <div>
                    <h5 className="font-sfpro text-[14px] text-offwhite">
                      Lorem ipsum dolor sit amet
                    </h5>
                    <p className="font-sfpro text-[14px] text-white-opacity-50">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <div className="flex gap-[20px]">
                  <div className="font-sfpro text-[14px] text-offwhite">3</div>
                  <div>
                    <h5 className="font-sfpro text-[14px] text-offwhite">
                      Lorem ipsum dolor sit amet
                    </h5>
                    <p className="font-sfpro text-[14px] text-white-opacity-50">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <div className="flex gap-[20px]">
                  <div className="font-sfpro text-[14px] text-offwhite">4</div>
                  <div>
                    <h5 className="font-sfpro text-[14px] text-offwhite">
                      Lorem ipsum dolor sit amet
                    </h5>
                    <p className="font-sfpro text-[14px] text-white-opacity-50">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
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
      <div className=" absolute right-6 top-10 z-[110] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
        <RxCross1 onClick={() => navigate('/')} className="" />
      </div>
      {screen === 'Introduction' && (
        <WeeklyCheckinInitialIntro setScreen={setScreen} />
      )}
      {screen === 'Introduction2' && (
        <WeeklyCheckinSecondaryIntro setScreen={setScreen} />
      )}
      {screen === 'questionnaire' && (
        <div>
          {' '}
          <img
            src={questionnaireData[questionnaireScreen - 1].img}
            className="absolute top-0 z-50 h-screen w-full  brightness-75 saturate-150 filter  "
            alt="background"
          />
          <div className="absolute z-[100] h-screen w-screen overflow-y-scroll px-4 pb-28 pt-4">
            {' '}
            <ProgressBar
              currValue={questionnaireScreen}
              totalValue={3}
              questionnaireData={questionnaireData[questionnaireScreen - 1]}
            />
            <h2
              className={`py-[25px] font-sfpro text-[32px] font-medium leading-[40px] text-${
                questionnaireData[questionnaireScreen - 1].color
              }  `}
            >
              {questionnaireData[questionnaireScreen - 1].heading}
            </h2>
            <div className="flex flex-col gap-4">
              {currentQuestion &&
                currentQuestion.map((ques) => {
                  return (
                    <div className="rounded-xl bg-black-opacity-45 px-[13px] py-[15px]">
                      <div className="mb-3 flex w-full ">
                        {/* Question */}
                        <div className="w-fit">
                          <h1 className="text-[14px] text-white">
                            {`${capitalizeFirstLetter(ques?.content)}${
                              ques?.isRequired ? ' *' : ''
                            }`}
                          </h1>
                          {/* Description */}
                          <p className="my-[2px] space-x-2 text-[10px] text-white-opacity-50">
                            {capitalizeFirstLetter(ques?.description)}
                          </p>
                        </div>
                        {ques?.code === 'WKR4' && (
                          <div
                            className="flex h-min items-center gap-1  font-sfpro text-[14px] font-light text-white-opacity-50 "
                            onClick={() => setShowNutritionScreen(true)}
                          >
                            info{' '}
                            <img
                              src="/assets/help-icon.svg"
                              className=" h-[12px] w-[12px]"
                              alt="icon"
                            />{' '}
                          </div>
                        )}
                      </div>{' '}
                      {(ques?.inputType?.toUpperCase() === 'SINGLECHOICE' ||
                        ques?.inputType?.toUpperCase() === 'MULTICHOICE' ||
                        ques?.inputType?.toUpperCase() ===
                          'SINGLEC?HOICEANDOTHER') &&
                      ques?.options.length <= 4 ? (
                        <OptionsSecond
                          questionCode={ques?.code}
                          options={ques?.options}
                          MCQType={ques?.inputType}
                          target={ques?.target}
                          response={
                            Object.keys(response)?.length > 0 && response
                          }
                          setResponse={setResponse}
                        />
                      ) : (
                        <InputText
                          questionCode={ques?.code}
                          response={
                            Object.keys(response)?.length > 0 && response
                          }
                          setResponse={setResponse}
                          key={ques?.code}
                          inputType={ques?.inputType}
                          placeholder={ques?.content}
                          isRequired={ques?.isRequired}
                        />
                      )}
                      {ques?.text === true && (
                        <div className="mt-2 w-full">
                          <input
                            className=" flex h-[67px] w-full items-start  rounded-xl bg-white-opacity-08 p-3 text-start font-light placeholder:absolute placeholder:top-3 placeholder:mb-3 placeholder:text-[14px]"
                            type="text"
                            placeholder="Type your text here..."
                          />
                        </div>
                      )}
                      {ques?.options?.length === 5 && (
                        <OptionsNumber
                          questionCode={ques?.code}
                          options={ques?.options}
                          MCQType={ques?.inputType}
                          target={ques?.target}
                          response={
                            Object.keys(response)?.length > 0 && response
                          }
                          setResponse={setResponse}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
            {questionnaireScreen === 3 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 rounded-xl bg-black-opacity-45 px-[14px] py-4 font-sfpro text-[14px] font-medium">
                  <p> Log your Latest Weight</p>
                  <div className="flex gap-[6px]">
                    <input
                      type="number"
                      className="h-[39px] w-[173px] rounded-[4px] bg-white-opacity-08 pl-2 placeholder:text-[10px]"
                      placeholder="Eg. 50kg"
                    />
                    <button className="h-[39px] rounded bg-lightSkyBlue px-[21px] text-black">
                      Save
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="font-sfpro text-[18px] font-normal  leading-[25px] text-white-opacity-50">
                    Congratulations, you are{' '}
                    <span className="text-lightSkyBlue">1 KG</span> down from
                    last week and on track to achieve you monthly goals
                  </p>
                  <p className="font-sfpro text-[18px] font-normal  leading-[25px] text-white-opacity-50">
                    You lifted <span className="text-lightSkyBlue">98 KGs</span>{' '}
                    more this week as compared to last
                  </p>
                </div>
                <div className="rounded-xl bg-black-opacity-45 p-4">
                  <h4 className="font-sfpro text-sm leading-[18px]">
                    Progress Photos (upto 2)
                  </h4>
                  <h5 className="mt-1 font-sfpro text-[10px] text-white-opacity-50">
                    JPEG & PNG
                  </h5>
                  <div className="mt-[14px] flex justify-center gap-4">
                    {chosenPic?.length > 0 && (
                      <div className="h-[188px] w-[155px] ">
                        {' '}
                        {chosenPic?.length === 2 && (
                          <input
                            ref={profilePicRef}
                            type="file"
                            capture="user"
                            accept="image/png, image/jpg, image/jpeg"
                            name="profile image camera"
                            className="relative z-20"
                            hidden
                            onInput={(e) => handlePicUpload(e, 0)}
                          ></input>
                        )}
                        <img
                          onClick={() => profilePicRef.current.click()}
                          src={chosenPic[0]}
                          alt="img"
                          className={` h-full rounded-[8px] object-contain `}
                        />
                      </div>
                    )}

                    {chosenPic.length < 2 ? (
                      <span>
                        <input
                          ref={profilePicCameraRef}
                          type="file"
                          capture="user"
                          accept="image/png, image/jpg, image/jpeg"
                          name="profile image camera"
                          hidden
                          onInput={(e) => handlePicUpload(e)}
                        ></input>
                        <img
                          onClick={() => profilePicCameraRef.current.click()}
                          src={`  ${
                            chosenPic.length > 0
                              ? '/assets/weekly-checkin-secondary-frame.svg'
                              : '/assets/weekly-checkin-primary-frame.png'
                          }  `}
                          className="mr-[2px]"
                          alt="calender"
                        />
                      </span>
                    ) : (
                      <div>
                        <div className="h-[188px] w-[155px] ">
                          {' '}
                          <input
                            ref={profilePicCameraRef}
                            type="file"
                            capture="user"
                            accept="image/png, image/jpg, image/jpeg"
                            name="profile image camera"
                            className="relative z-20"
                            hidden
                            onInput={(e) => handlePicUpload(e, 1)}
                          ></input>
                          <img
                            onClick={() => profilePicCameraRef.current.click()}
                            src={chosenPic[1]}
                            alt="img"
                            className={` h-full rounded-[8px] object-contain `}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 z-[100] flex w-full gap-2 px-4 pb-[36px]">
            <button
              onClick={() => handleBackClick()}
              className="w-[114px] rounded-lg bg-graySecond font-sfpro text-[18px] font-medium leading-[25px]"
            >
              Back
            </button>
            <button
              onClick={() => handleNextClick()}
              className="flex grow items-center justify-center gap-1 rounded-lg bg-white py-[14px] font-sfpro text-lg leading-[26px] text-black"
            >
              {questionnaireScreen < 3 ? 'Next' : 'Submit'} <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // const [loader, setLoader] = useState(false);
  // const [error, setError] = useState(null);
  // const [checkInError, setCheckInError] = useState(null);
  // const [weeklyStats, setWeeklyStats] = useState(null);
  // const { getUserFromStorage, user } = useAuth();

  // const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  // const [completionHistory, setCompletionHistory] = useState([]);

  // const [weekRating, setWeekRating] = useState('');
  // const achievementRef = useRef('');
  // const learningsRef = useRef('');
  // const [achievement, setAchievement] = useState('');
  // const [learnings, setLearnings] = useState('');
  // const [weight, setWeight] = useState('');
  // const [frontImage, setFrontImage] = useState(null);
  // const [sideImage, setSideImage] = useState(null);
  // const [frontImageUrl, setFrontImageUrl] = useState(null);
  // const [sideImageUrl, setSideImageUrl] = useState(null);

  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getUserFromStorage();
  // }, [getUserFromStorage]);

  // useEffect(() => {
  //   if (user && user.email) {
  //     getWeeklyData();
  //     getCalendarData();
  //     fetchSubmittedData();
  //   } else {
  //     setError('Please login first');
  //   }
  // }, [user, selectedDate]);

  // const getWeeklyData = () => {
  //   setLoader(true);
  //   const today = new Date().toLocaleDateString('en-GB');
  //   axios
  //     .get(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client`, {
  //       params: {
  //         email: user.email,
  //         day: today,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data) {
  //         console.log('Weekly stats received:', res.data);
  //         setWeeklyStats(res.data);
  //         setLoader(false);
  //         setError(null);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       setWeeklyStats(null);
  //       setError('Failed to fetch weekly data');
  //       setLoader(false);
  //     });
  // };

  // const getCalendarData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/api/v1/lifestyle`,
  //       {
  //         params: {
  //           user: user.code,
  //           date: selectedDate,
  //         },
  //       },
  //     );
  //     setCompletionHistory(response.data.completionHistory || []);
  //   } catch (error) {
  //     console.error('Error fetching calendar data:', error);
  //     setError('Failed to fetch calendar data');
  //   }
  // };

  // const fetchSubmittedData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-checkin`,
  //       {
  //         params: {
  //           memberCode: user.code,
  //           currentWeek: true,
  //         },
  //       },
  //     );

  //     if (
  //       response.data.success &&
  //       response.data.data &&
  //       response.data.data.length > 0
  //     ) {
  //       const checkInData = response.data.data[0];
  //       setWeekRating(checkInData.rating.toString());
  //       setAchievement(checkInData.achievement);
  //       setLearnings(checkInData.learning);
  //       setWeight(checkInData.weight ? checkInData.weight.toString() : '');

  //       if (checkInData.imageURLs && checkInData.imageURLs.length > 0) {
  //         setFrontImageUrl(checkInData.imageURLs[0]);
  //         if (checkInData.imageURLs.length > 1) {
  //           setSideImageUrl(checkInData.imageURLs[1]);
  //         }
  //       }

  //       setIsSubmitted(true);
  //       setCheckInError(null);
  //     } else {
  //       setCheckInError('No data found in the response');
  //       setIsSubmitted(false);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching submitted weekly check-in data:', error);
  //     setCheckInError(`Failed to fetch data: ${error.message}`);
  //     setIsSubmitted(false);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setCheckInError(null);

  //   const formData = new FormData();
  //   formData.append('rating', weekRating);
  //   formData.append('achievement', achievement);
  //   formData.append('learning', learnings);
  //   formData.append('memberCode', user.code);
  //   formData.append('weight', weight);
  //   if (frontImage) formData.append('frontImage', frontImage);
  //   if (sideImage) formData.append('sideImage', sideImage);

  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-checkin`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       },
  //     );

  //     if (response.data.success) {
  //       try {
  //         console.log('Starting weekly check-in tracking...');

  //         // Verify Mixpanel is initialized
  //         if (!mixpanel) {
  //           console.error('Mixpanel not initialized');
  //           return;
  //         }

  //         // Track the event
  //         mixpanel.track('Weekly Check-in Submitted', {
  //           completion_status: 'submitted',
  //           submission_timestamp: new Date().toISOString(),
  //           submit_day: new Date().toLocaleDateString('en-US', {
  //             weekday: 'long',
  //           }),
  //         });

  //         console.log('weekly check-in tracked successfully');
  //       } catch (error) {
  //         console.error('Error tracking weekly check-in:', error);
  //       }
  //       await fetchSubmittedData();
  //       setShowSuccessPopup(true);
  //     } else {
  //       setCheckInError('Server responded with an unsuccessful status');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting weekly check-in:', error);
  //     setCheckInError(`Failed to submit weekly check-in: ${error.message}`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleClosePopup = () => {
  //   setShowSuccessPopup(false);
  // };

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  // };

  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: { y: 0, opacity: 1 },
  // };

  // const handleTextAreaChange = (e) => {
  //   e.target.style.height = 'auto';
  //   e.target.style.height = `${e.target.scrollHeight}px`;
  // };

  // const memoizedWeeklyWorkoutReport = useMemo(
  //   () => (
  //     <WeeklyWorkoutReport
  //       consistencyTrend={weeklyStats?.consistencyTrend || ''}
  //       suggestedWorkoutPerWeek={weeklyStats?.frequency || 0}
  //       lastEightWeeksWorkout={weeklyStats?.lastEightWeeksWorkout || []}
  //     />
  //   ),
  //   [weeklyStats],
  // );

  // return (
  //   <>
  //     <div
  //       className={`flex w-screen grow flex-col gap-2 overflow-y-scroll px-4 pb-[20px] ${
  //         showSuccessPopup ? 'blur-sm' : ''
  //       }`}
  //     >
  //       <div className="mb-2 mt-4 flex items-center justify-between">
  //         <button
  //           onClick={() => (window.location.href = '/home')}
  //           className="hover:text-gray-300 text-white transition-colors"
  //         >
  //           <IoArrowBackOutline size={24} />
  //         </button>
  //         <h1 className="flex-grow text-center text-2xl font-bold">
  //           Weekly Check-In
  //         </h1>
  //         <div className="w-6"></div>
  //       </div>
  //       {loader && <Loader />}
  //       {error && <Error>{error}</Error>}
  //       {!loader && !error && (
  //         <motion.div
  //           variants={containerVariants}
  //           initial="hidden"
  //           animate="visible"
  //           className="space-y-8"
  //         >
  //           <motion.section variants={itemVariants}>
  //             <Calendar
  //               completionHistory={completionHistory}
  //               isSummaryPage={false}
  //               selectedDate={selectedDate}
  //               setSelectedDate={setSelectedDate}
  //             />
  //           </motion.section>

  //           <motion.section variants={itemVariants} className="mt-8">
  //             {memoizedWeeklyWorkoutReport}
  //           </motion.section>

  //           <motion.form
  //             onSubmit={handleSubmit}
  //             className="mt-4 space-y-4"
  //             variants={containerVariants}
  //           >
  //             <motion.div variants={itemVariants}>
  //               <label
  //                 htmlFor="weekRating"
  //                 className="text-gray-700 block text-base font-medium sm:text-lg"
  //               >
  //                 Rate your week out of 10
  //               </label>
  //               <div className="relative">
  //                 <select
  //                   id="weekRating"
  //                   value={weekRating}
  //                   onChange={(e) => setWeekRating(e.target.value)}
  //                   className="border-gray-300 mt-1 block w-full appearance-none rounded-md bg-[#2B2B28] p-2   text-lightGray shadow-sm"
  //                   required
  //                   disabled={isSubmitted}
  //                 >
  //                   <option value="">Select a rating</option>
  //                   {[...Array(11)].map((_, i) => (
  //                     <option key={i} value={i.toString()}>
  //                       {i}
  //                     </option>
  //                   ))}
  //                 </select>
  //                 <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-2xl text-white" />
  //               </div>
  //             </motion.div>

  //             <motion.div variants={itemVariants}>
  //               <label
  //                 htmlFor="achievement"
  //                 className="text-gray-700 block text-base font-medium sm:text-lg"
  //               >
  //                 Tell us your biggest achievement of the week
  //               </label>
  //               <textarea
  //                 id="achievement"
  //                 value={achievement}
  //                 onChange={(e) => {
  //                   setAchievement(e.target.value);
  //                   handleTextAreaChange(e);
  //                 }}
  //                 className="textarea-no-scrollbar border-gray-300 mt-1 block w-full rounded-md bg-[#2B2B28] p-2 text-lightGray shadow-sm outline-none"
  //                 required
  //                 style={{
  //                   minHeight: '100px',
  //                   resize: 'none',
  //                   overflow: 'auto',
  //                 }}
  //                 readOnly={isSubmitted}
  //               />
  //             </motion.div>

  //             <motion.div variants={itemVariants}>
  //               <label
  //                 htmlFor="learnings"
  //                 className="text-gray-700 block text-base font-medium sm:text-lg"
  //               >
  //                 What are your learnings of the week and how can we build the
  //                 next week better ?
  //               </label>
  //               <textarea
  //                 id="learnings"
  //                 value={learnings}
  //                 onChange={(e) => {
  //                   setLearnings(e.target.value);
  //                   handleTextAreaChange(e);
  //                 }}
  //                 className="textarea-no-scrollbar border-gray-300 mt-1 block w-full rounded-md bg-[#2B2B28] p-2 text-base  text-lightGray shadow-sm outline-none"
  //                 required
  //                 style={{
  //                   minHeight: '100px',
  //                   resize: 'none',
  //                   overflow: 'auto',
  //                 }}
  //                 readOnly={isSubmitted}
  //               />
  //             </motion.div>

  //             <motion.div variants={itemVariants}>
  //               <label
  //                 htmlFor="weight"
  //                 className="text-gray-700 block text-base font-medium sm:text-lg"
  //               >
  //                 Current Weight (in kg)
  //               </label>
  //               <input
  //                 type="number"
  //                 id="weight"
  //                 value={weight}
  //                 onChange={(e) => setWeight(e.target.value)}
  //                 className="border-gray-300 mt-1 block w-full rounded-md bg-[#2B2B28] p-2 text-lightGray   shadow-sm"
  //                 required
  //                 disabled={isSubmitted}
  //               />
  //             </motion.div>

  //             <motion.div variants={itemVariants}>
  //               <label
  //                 htmlFor="frontImage"
  //                 className="text-gray-700 block text-base font-medium sm:text-lg"
  //               >
  //                 Front Pose Image (optional)
  //               </label>
  //               {!isSubmitted ? (
  //                 <input
  //                   type="file"
  //                   id="frontImage"
  //                   onChange={(e) => setFrontImage(e.target.files[0])}
  //                   className="mt-1 block w-full text-white"
  //                   accept="image/*"
  //                 />
  //               ) : frontImageUrl ? (
  //                 <div className="flex w-full justify-center">
  //                   <div className="relative flex h-72 w-64 items-center justify-center overflow-hidden rounded-lg py-2 sm:h-80 sm:w-80">
  //                     <img
  //                       src={frontImageUrl}
  //                       alt="Front Pose"
  //                       className="w-84 absolute mt-2 h-auto"
  //                     />
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <p className="text-gray-500 mt-1">No image uploaded</p>
  //               )}
  //             </motion.div>

  //             <motion.div variants={itemVariants}>
  //               <label
  //                 htmlFor="sideImage"
  //                 className="text-gray-700 block text-base font-medium sm:text-lg"
  //               >
  //                 Side Pose Image (optional)
  //               </label>
  //               {!isSubmitted ? (
  //                 <input
  //                   type="file"
  //                   id="sideImage"
  //                   onChange={(e) => setSideImage(e.target.files[0])}
  //                   className="mt-1 block w-full text-white"
  //                   accept="image/*"
  //                 />
  //               ) : sideImageUrl ? (
  //                 <div className="flex w-full justify-center">
  //                   <div className="relative flex h-72 w-64 items-center justify-center overflow-hidden rounded-lg sm:h-80 sm:w-80">
  //                     <img
  //                       src={sideImageUrl}
  //                       alt="Side Pose"
  //                       className="w-84 absolute mt-2 h-auto"
  //                     />
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <p className="text-gray-500 mt-1">No image uploaded</p>
  //               )}
  //             </motion.div>

  //             {!isSubmitted && (
  //               <motion.div variants={itemVariants}>
  //                 <button
  //                   type="submit"
  //                   className="flex w-full justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50"
  //                   disabled={isLoading}
  //                 >
  //                   {isLoading ? 'Submitting...' : 'Submit Weekly Check-In'}
  //                 </button>
  //               </motion.div>
  //             )}
  //           </motion.form>
  //         </motion.div>
  //       )}
  //     </div>
  //     {showSuccessPopup && (
  //       <WeeklyCheckInSuccessPopup onClose={handleClosePopup} />
  //     )}
  //   </>
  // );
};

export default WeeklyCheckIn;
