import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import { capitalizeFirstLetter } from '../LifestyleQuiz/utils/utils';
import OptionsNumber from '../Questionnaire/Components/inputs/OptionsNumber';
import OptionsSecond from '../Questionnaire/Components/inputs/OptionsSecond';
import InputText from './Component/InputText';

const QuestionnaireScreenOutput = ({
  screen,
  questionnaireData,
  currentQuestion,
  setShowNutritionScreen,
  response,
  setResponse,
  setScreen,
  questionnaireScreen,
  setQuestionnaireScreen,
  week,
  weeklyResponse,
  getWeeklyReviewData,
}) => {
  const navigate = useNavigate();
  const profilePicCameraRef = useRef(null);
  const profilePicRef = useRef(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [questionnaireFormLoading, setQuestionnaireFormLoading] =
    useState(false);
  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const [chosenPic, setChosenPic] = useState([]);
  const [chosenPicBinary, setChosenPicBinary] = useState([]);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [imgResponse, setImgResponse] = useState(null);

  useEffect(() => {
    if (weeklyResponse) {
      setResponse(weeklyResponse);
    }
  }, []);

  const uploadMemberPic = () => {
    async function uploadPicFunc() {
      try {
        if (chosenPic.length > 0) {
          const formData = new FormData();
          formData.append('img1', file1);
          formData.append('img2', file2);
          const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/progress-img?memberCode=${code}&week=${week}`,
            formData,
          );
          if (res.data) {
            console.log('updates');
          }
        }
      } finally {
        console.log('updates');
      }
    }
    uploadPicFunc();
  };
  const fillQuestionnaire = () => {
    setQuestionnaireFormLoading(true);
    async function getUserData() {
      try {
        if (response.length > 0 && response !== weeklyResponse) {
          const filteredObject = response.filter((item1) =>
            currentQuestion.some((item2) => item1.code === item2.code),
          );
          const transformedResponseData = filteredObject.map((item) => {
            // Remove description if it's an empty string
            if (item.description === '') {
              delete item.description;
            }

            if (item.value.length === 0) {
              delete item.value;
            }
            // Return the object as is if description is removed or doesn't exist
            return item;
          });

          if (questionnaireScreen === 3) {
            await axios.put(
              `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/questionnaire`,

              {
                memberCode: code,
                week: week,
                response:
                  transformedResponseData.length > 0
                    ? transformedResponseData
                    : [{ code: 'WKR12', value: [0] }],
                completed: true,
              },
            );
          }
          if (transformedResponseData.length > 0) {
            await axios.put(
              `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/questionnaire`,

              {
                memberCode: code,
                week: week,
                response: transformedResponseData,
              },
            );
          }
        }
        if (response.length === 0 && questionnaireScreen === 3) {
          await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/questionnaire`,

            {
              memberCode: code,
              week: week,
              response: [{ code: 'WKR12', value: [0] }],
              completed: true,
            },
          );
        }
      } catch (err) {
      } finally {
        setQuestionnaireFormLoading(false);
        getWeeklyReviewData();
      }
    }
    getUserData();
  };

  const handleNextClick = () => {
    if (questionnaireScreen < 3) {
      fillQuestionnaire();
      setQuestionnaireScreen(questionnaireScreen + 1);
    }
    if (questionnaireScreen === 3) {
      setScreen('resultLoading');
      fillQuestionnaire();
      uploadMemberPic();
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

  function handlePicUpload(e, setFile) {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      console.log(setFile);
      if (setFile === 1) {
        reader.onloadend = () => {
          setChosenPic((prevPics) => {
            if (prevPics.length >= 2) {
              // Replace the first item and keep the rest of the array intact, then add the new item
              return [reader.result, chosenPic[1]];
            }
            // If length is less than 2, just add the new item
            return [...prevPics, reader.result];
          });
          setFile1(file);
        };
      }

      if (setFile === 2) {
        reader.onloadend = () => {
          setChosenPic((prevPics) => {
            if (prevPics.length >= 2) {
              // Replace the first item and keep the rest of the array intact, then add the new item
              return [chosenPic[0], reader.result];
            }
            // If length is less than 2, just add the new item
            return [...prevPics, reader.result];
          });

          setFile2(file);
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
    <div>
      <img
        src={questionnaireData[questionnaireScreen - 1].img}
        className="absolute top-0 z-50 h-screen w-full  brightness-75 saturate-150 filter  "
        alt="background"
      />
      <div className="absolute z-[100] h-screen w-screen overflow-y-scroll px-4 pb-28 pt-4">
        <div className=" absolute right-6 top-10 z-[110] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
          <RxCross1 onClick={() => navigate('/')} className="" />
        </div>{' '}
        <ProgressBar
          currValue={questionnaireScreen}
          totalValue={3}
          questionnaireData={questionnaireData[questionnaireScreen - 1]}
        />
        <h2
          className={`py-[25px] font-sfpro text-[32px] font-medium leading-[40px] ${
            questionnaireData[questionnaireScreen - 1].text
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
                      <h1 className="text-[14px]  ">
                        {`${capitalizeFirstLetter(ques?.content)}${
                          ques?.isRequired ? ' *' : ''
                        }`}
                      </h1>
                      {/* Description */}
                      {(ques.code === 'WKR5' ||
                        ques.code === 'WKR6' ||
                        ques.code === 'WKR7' ||
                        ques.code === 'WKR8') && (
                        <p className="my-[2px] space-x-2 text-[10px] text-white-opacity-50">
                          {capitalizeFirstLetter(ques?.description)}
                        </p>
                      )}
                    </div>
                    {ques?.code === 'WKR4' && (
                      <div
                        className="ml-2 flex h-min items-center gap-1 font-sfpro text-[14px] font-light text-white-opacity-50 "
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
                    ques?.options.length <= 4 && (
                      <OptionsSecond
                        questionCode={ques?.code}
                        options={ques?.options}
                        MCQType={ques?.inputType}
                        target={ques?.target}
                        response={Object.keys(response)?.length > 0 && response}
                        setResponse={setResponse}
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
                      response={Object.keys(response)?.length > 0 && response}
                      setResponse={setResponse}
                    />
                  )}
                  {ques.code !== 'WKR1' &&
                    ques.code !== 'WKR4' &&
                    ques.code !== 'WKR6' &&
                    ques.code !== 'WKR7' &&
                    ques.code !== 'WKR8' &&
                    ques.code !== 'WKR3' &&
                    ques.code !== 'WKR5' && (
                      <InputText
                        questionCode={ques?.code}
                        response={Object.keys(response)?.length > 0 && response}
                        setResponse={setResponse}
                      />
                    )}
                  {ques.code === 'WKR5' &&
                    response?.find((elem) => elem?.code === 'WKR5')
                      ?.value?.[0] === 'YES' && (
                      <InputText
                        questionCode={ques?.code}
                        response={Object.keys(response)?.length > 0 && response}
                        setResponse={setResponse}
                      />
                    )}
                  {ques.code === 'WKR3' &&
                    response?.find((elem) => elem?.code === 'WKR3')
                      ?.value?.[0] === 'YES' && (
                      <InputText
                        questionCode={ques?.code}
                        response={Object.keys(response)?.length > 0 && response}
                        setResponse={setResponse}
                      />
                    )}
                </div>
              );
            })}
        </div>
        {questionnaireScreen === 3 && (
          <div className="flex flex-col gap-4">
            <div className="mt-6 rounded-xl bg-black-opacity-45 p-4">
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
                        onInput={(e) => handlePicUpload(e, 1)}
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
                      onInput={(e) =>
                        chosenPic.length > 0
                          ? handlePicUpload(e, 2)
                          : handlePicUpload(e, 1)
                      }
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
                        onInput={(e) => handlePicUpload(e, 2)}
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
  );
};

export default QuestionnaireScreenOutput;
