import React, { useState, useEffect } from 'react';
import { ProgressBar } from '../LifestyleQuiz';
import BackButton from '../../components/BackButton';
import { Button } from '../../components';
import Options from './Components/inputs/Options';
import { axiosClient } from '../LifestyleQuiz';
import {
  getScreenCounts,
  capitalizeFirstLetter,
  increaseScreenAndRank,
  decreaseScreenAndRank,
  updateCurrentQuestion,
  isAnyEmptyResponse,
  getGeneralScreen
} from '../LifestyleQuiz';
import InputText from './Components/inputs/InputText';
import { useNavigate } from 'react-router-dom';
import { Error } from '../../components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../LifestyleQuiz';
import styled from 'styled-components';
import BMIScreen from './BMIScreen';
import AssessmentScreen from './AssessmentScreen';

function LandingPage() {
  const [questions, setQuestions] = useState(null);
  const [response, setResponse] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [screen, setScreen] = useState(0);
  const maxScreenCount = getScreenCounts(questions);
  const generalScreen = getGeneralScreen(questions);
  const [pageError, setPageError] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [showAssessmentScreen, setShowAssessmentScreen] = useState(false);
  const [showBMIScreen, setShowBMIScreen] = useState(false);
  const navigate = useNavigate();

  const StarterText = styled.div`
    color: var(--New-White, rgba(255, 255, 255, 0.26));
    /* H1 */
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: ${props => props.fontSize !== undefined ? props.fontSize : '32px'};
    font-style: normal;
    font-weight: 500;
    line-height: 40px; /* 125% */
    background: var(
      --Gradient-silver,
      linear-gradient(95deg, #8c8c8c 0.94%, #ffffff 84.36%)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;

  // sending response to the backend
  function submitResponse() {
    // set the state to loading
    setPageLoading(true)

    // close the BMI screen, and the assessment screen if opened
    // redirect the user to the home page if the finish button is clicked on the FitnessScore screen
    if (showBMIScreen) {
      setTimeout(() => {
        setPageLoading(false);
        setShowBMIScreen(false);
      }, 700)
    }
    if (showAssessmentScreen) {
      setTimeout(() => {
        setPageLoading(false);
        setShowAssessmentScreen(false);
      }, 700)
    }

    // preparing a response for the current screen questions
    const responseBody = [];
    currentQuestion &&
      response &&
      currentQuestion.map((ques, idx) => {
        responseBody.push({
          code: ques?.code,
          answer: response[ques?.code],
        });
      });
    !showAssessmentScreen && !showBMIScreen &&
      axiosClient
        .post('/', {
          email: JSON.parse(localStorage.getItem('user'))['email'],
          questionnaireName: 'signup',
          response: responseBody,
        })
        .then((res) => {
          console.log("POST Response : ", res);

          // open the BMI screen, Assessment screen, or the Fitness Score screen based on the next button clicked on relevant screen
          if (screen === 1) {
            setShowBMIScreen(true);
          }
          else if (screen === 7) {
            setShowAssessmentScreen(true);
          }
          else if(screen === 8){
            // redirect to the fitness score page
            navigate('/questionnaire/fitness-score');
          }

          // after successful submission, let the user proceed to the next question
          // possible error - network breakdown
          increaseScreenAndRank(screen, maxScreenCount, setScreen);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Submission Failed! Please Try Again.');
        })
        .finally(() => {
          setPageLoading(false);
        });
  }

  useEffect(() => {
    setPageLoading(true);
    // fetch the signup questionnaire data
    axiosClient
      .get('?name=signup')
      .then((res) => {
        // set the questions to the state
        setQuestions(res.data.questions);

        // Update the response state using a callback
        setResponse((prev) => {
          const newResponse = {};
          res.data.questions.forEach((ques) => {
            newResponse[ques.code] = [''];
          });
          return newResponse;
        });
      })
      .catch((err) => {
        console.log(err);
        setPageError(true);
      })
      .finally(() => {
        // delay is introduced to increase the time for loading screen (UX improvement)
        setTimeout(() => {
          setPageLoading(false);
        }, 1000);
      });
  }, []);

  useEffect(() => {
    // it will update the current question as soon as the screen changes
    questions && updateCurrentQuestion(questions, screen, setCurrentQuestion);
  }, [screen, questions]);

  useEffect(() => {
    if (Object.keys(response)?.length > 0) {
      console.log('RESPONSE : ', response);
    } else {
      console.log('RESPONSE : ', response);
    }
  }, [response]);

  return (
    <div
      className={`flex min-h-screen flex-col justify-between ${screen === 0 ? '' : 'px-6 py-8'
        }`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {pageError && !pageLoading && <Error>Some Error Occured</Error>}
      {pageLoading && (
        <div className="fixed left-0 top-0 z-50 w-full bg-black">
          <Loader className={'h-screen w-full'} />
        </div>
      )}
      <div className="fixed top-0 ">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <div className="hide-scrollbar flex flex-col justify-center gap-3 overflow-y-scroll">
        {screen >= 1 && (
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="mx-auto my-4 flex w-full items-center justify-center">
              {screen >= 1 && (
                <BackButton
                  size={30}
                  action={() => decreaseScreenAndRank(screen, setScreen)}
                  className="absolute left-[5%] w-fit cursor-pointer"
                />
              )}

              <ProgressBar
                className="w-[250px]"
                currValue={screen}
                totalValue={getScreenCounts(questions)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col items-start justify-between">
        <div className="flex w-full flex-col justify-center gap-5">
          {/* Section Name - Kept for future reference */}
          {screen === generalScreen && (
            <h1 className="mt-3 text-[26px] text-[#7e87ef]">
              General Information
            </h1>
          )}
          <div>
            {screen >= 1 &&
              currentQuestion &&
              currentQuestion?.map((ques, idx) => {
                return (
                  <>
                    <div className="flex flex-col justify-center">
                      <div className="my-5 w-full">
                        {/* Question */}
                        {(!['text', 'number'].includes(ques?.inputType)) && ques?.content !== "Gender" && !showBMIScreen && !showAssessmentScreen && <h1 className="text-[22px] text-[#7e87ef]">
                          {`${capitalizeFirstLetter(ques?.content)}${ques?.isRequired ? ' *' : ''
                            }`}
                        </h1>}
                        {(!['text', 'number'].includes(ques?.inputType)) && ques?.content === "Gender" && !showBMIScreen && !showAssessmentScreen && <h1 className="text-[22px] textbox-text uppercase">
                          {`${capitalizeFirstLetter(ques?.content)}${ques?.isRequired ? ' *' : ''
                            }`}
                        </h1>}
                      </div>
                      {(ques?.inputType?.toUpperCase() === 'SINGLECHOICE' ||
                        ques?.inputType?.toUpperCase() === 'MULTICHOICE' ||
                        ques?.inputType?.toUpperCase() === 'SINGLECHOICEANDOTHER') ? (
                        <Options
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
                    </div>
                  </>
                );
              })}
            {(screen === 0) && (
              <div
                className="h-screen w-full"
                style={{
                  backgroundImage: `url(${'/assets/bg_report.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex h-full w-full flex-col items-start justify-between bg-black/70 px-6 py-4 backdrop-blur-[8.5px]">
                  <div
                    className={`${screen === 0 ? 'mt-[8rem]' : 'mt-[2rem]'}`}
                  >
                    <img
                      src={'/assets/otm_logo_lifestyle.svg'}
                      alt="otm logo"
                      className='px-[20px] py-[10px]'
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-9">
                    {screen === 0 && <div className='w-full'>
                      <StarterText style={{
                        background:
                          'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
                        backgroundClip: 'text',
                      }}
                        className='px-[20px]'
                      >
                        Welcome, {JSON.parse(localStorage.getItem('user'))["name"]}
                      </StarterText>
                      <p
                        style={{
                          fontSize: '18px',
                          fontWeight: '400',
                          color: `rgba(255,255,255,0.46)`
                        }}
                        className='px-[20px]'
                      >Your account has been created</p>
                    </div>}
                    {screen === 0 && (
                      <StarterText className='px-[20px] py-[10px]' fontSize="26px">
                        Shape your  <span
                          style={{
                            background:
                              'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
                            backgroundClip: 'text',
                          }}
                        >
                          fitness journey
                        </span> with a personalized workout program and gain insights  <span
                          style={{
                            background:
                              'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
                            backgroundClip: 'text',
                          }}
                        >
                          tailored to your goals
                        </span>
                      </StarterText>
                    )}
                    <div className='w-full flex flex-col justify-center gap-1'>
                      <Button
                        style={{fontWeight: 500}}
                        text="Craft your journey"
                        type="lifestyle"
                        action={() => {
                          // increase the screen value
                          setScreen((prev) => prev + 1);
                        }}
                      />
                      <p className='text-[10px] text-center' style={{ color: 'rgba(255,255,255,0.30)', fontWeight: '400' }}>Usually takes ~3mins</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {
              showBMIScreen &&
              <BMIScreen
                response={response}
                submitResponse={submitResponse}
                screen={screen}
                questions={questions}
                getScreenCounts={getScreenCounts}
                setScreen={setScreen}
                decreaseScreenAndRank={decreaseScreenAndRank}
                setShowBMIScreen={setShowBMIScreen}
              />
            }
            {
              showAssessmentScreen &&
              <AssessmentScreen
                submitResponse={submitResponse}
                screen={screen}
                questions={questions}
                getScreenCounts={getScreenCounts}
                setScreen={setScreen}
                decreaseScreenAndRank={decreaseScreenAndRank}
                setShowAssessmentScreen={setShowAssessmentScreen}
              />
            }
          </div>
        </div>
        {screen >= 1 && (
          <Button
            style={{fontWeight: 500}}
            text={screen === maxScreenCount ? "Finish" : currentQuestion[0]?.target === "ASSESSMENT" ? "Take Assessment" : "Next"}
            type="lifestyle"
            action={() => {
              // checking for empty response
              if (
                currentQuestion &&
                Object.keys(response)?.length > 0 &&
                !isAnyEmptyResponse(currentQuestion, response)
              ) {
                // API function call for submittin response on every next/submit button press
                submitResponse();
              }
              else {
                if (isAnyEmptyResponse(currentQuestion, response)) {
                  toast.warn('Please fill in the required fields!');
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default LandingPage;