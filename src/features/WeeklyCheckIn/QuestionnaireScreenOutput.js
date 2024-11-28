import React, { useRef, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import { capitalizeFirstLetter } from '../LifestyleQuiz/utils/utils';
import OptionsSecond from '../Questionnaire/Components/inputs/OptionsSecond';
import OptionsNumber from '../Questionnaire/Components/inputs/OptionsNumber';
import InputText from './Component/InputText';
import { FaArrowRight } from 'react-icons/fa6';
import axios from 'axios';

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
}) => {
  const navigate = useNavigate();
  const profilePicCameraRef = useRef(null);
  const profilePicRef = useRef(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [questionnaireFormLoading, setQuestionnaireFormLoading] =
    useState(false);
  const code = JSON.parse(localStorage.getItem('user'))['code'];

  const fillQuestionnaire = () => {
    setQuestionnaireFormLoading(true);
    async function getUserData() {
      try {
        if (response.length > 0) {
          const transformedResponseData = response.map((item) => {
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

          console.log(transformedResponseData, '909098080809808');

          await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/questionnaire`,
            {
              memberCode: code,
              week: '18Nov-24Nov-2024',
              response: transformedResponseData,
            },
          );
        }
      } catch (err) {
      } finally {
        setQuestionnaireFormLoading(false);
        setResponse([]);
      }
    }
    getUserData();
  };

  const [chosenPic, setChosenPic] = useState([]);

  const handleNextClick = () => {
    if (questionnaireScreen < 3) {
      fillQuestionnaire();
      setQuestionnaireScreen(questionnaireScreen + 1);
    }
    if (questionnaireScreen === 3) {
      setScreen('resultLoading');
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
                    ques.code !== 'WKR8' && (
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
                <span className="text-lightSkyBlue">1 KG</span> down from last
                week and on track to achieve you monthly goals
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
  );
};

export default QuestionnaireScreenOutput;
