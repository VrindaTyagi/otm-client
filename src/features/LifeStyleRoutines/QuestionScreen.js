import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from 'rsuite';
import { Button } from '../../components';
import BackButton from '../../components/BackButton';
import { ProgressBar } from '../LifestyleQuiz';
import {
  capitalizeFirstLetter,
  decreaseScreenAndRank,
  getScreenCounts,
  isAnyEmptyResponseFitness,
  updateCurrentQuestion,
} from '../LifestyleQuiz/utils/utils';
import InputText from '../Questionnaire/Components/inputs/InputText';
import Options from '../Questionnaire/Components/inputs/Options';

const Questionare = ({ setQuestionnaireScreen }) => {
  const [questions, setQuestions] = useState(null);
  const [loader, setLoader] = useState(null);
  const [response, setResponse] = useState({});
  const [screen, setScreen] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const navigate = useNavigate();

  const memberCode = JSON.parse(localStorage.getItem('user'))['code'];

  useEffect(() => {
    // it will update the current question as soon as the screen changes
    questions && updateCurrentQuestion(questions, screen, setCurrentQuestion);
  }, [screen, questions]);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/lifestyle/questionnaire`)
      .then((res) => {
        setQuestions(res.data.data);
      })
      .catch((err) => {
        toast.error('Error with  lifestyle questionnaire');
        console.log(err.message);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const handleMovementQuestionnaire = () => {
    setLoader(true);

    const responseConvert = Object.keys(response).map((key) => ({
      question: key,
      answer: response[key],
    }));
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/lifestyle/questionnaire/`,
        {
          memberCode: memberCode,
          answers: responseConvert,
        },
      )
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          navigate('/lifestyle-routine?lifestyleLoader=true');
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error('Error with lifestyle questionnaire');
        navigate('/lifestyle-routine');
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const isFormValid = useMemo(
    () => isAnyEmptyResponseFitness(currentQuestion, response),
    [currentQuestion, response],
  );

  return (
    <div className="absolute z-50 h-screen w-full overflow-y-scroll bg-black  px-6 py-8">
      {loader && <Loader />}
      {questions &&
        questions?.map((ques, idx) => {
          return (
            <div className="">
              {ques.screen === screen && (
                <div className="relative flex h-[calc(100vh-100px)] flex-col justify-between ">
                  <div className="">
                    <div className="flex flex-col items-center justify-center gap-5">
                      <div className="mx-auto my-4 flex w-full items-center justify-center">
                        <BackButton
                          size={30}
                          action={() => {
                            if (screen > 1) {
                              decreaseScreenAndRank(screen, setScreen);
                            }
                            if (screen === 1) {
                              navigate('/lifestyle-routine');
                              setQuestionnaireScreen(false);
                            }
                          }}
                          className="absolute left-0 w-fit cursor-pointer"
                        />

                        <ProgressBar
                          className="w-[250px]"
                          currValue={screen}
                          totalValue={getScreenCounts(questions)}
                        />
                      </div>
                    </div>
                    <div className="my-8 flex flex-col justify-center">
                      <div className="my-3 w-full">
                        {/* Question */}
                        <h1 className="text-[20px] text-[#7e87ef]">
                          {`${capitalizeFirstLetter(ques?.content)}${
                            ques?.isRequired ? ' *' : ''
                          }`}
                        </h1>
                      </div>
                      {ques?.inputType?.toUpperCase() === 'SINGLECHOICE' ||
                      ques?.inputType?.toUpperCase() === 'MULTICHOICE' ||
                      ques?.inputType?.toUpperCase() ===
                        'SINGLECHOICEANDOTHER' ? (
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
                        <div>
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
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-center gap-1">
                    <Button
                      style={{
                        fontWeight: 500,

                        backgroundImage:
                          'var(--Gradient-purple, linear-gradient(95deg, #d6b6f0 2.94%, #848ce9 74.36%))',

                        opacity: !isFormValid ? 0.4 : 1,
                      }}
                      text={questions.length === screen ? 'Submit' : 'Next'}
                      type=""
                      action={() => {
                        if (
                          currentQuestion[0].isRequired === true &&
                          !isFormValid
                        ) {
                          toast.warn('Please fill in the required fields!');
                        } else {
                          if (questions.length !== screen) {
                            setScreen((prev) => prev + 1);
                          } else {
                            handleMovementQuestionnaire();
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Questionare;
