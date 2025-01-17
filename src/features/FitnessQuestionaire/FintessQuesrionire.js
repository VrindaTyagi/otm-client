import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components';
import BackButton from '../../components/BackButton';
import {
  capitalizeFirstLetter,
  decreaseScreenAndRank,
  getScreenCounts,
  ProgressBar,
  updateCurrentQuestion,
} from '../LifestyleQuiz';
import { isAnyEmptyResponseFitness } from '../LifestyleQuiz/utils/utils';
import InputText from '../Questionnaire/Components/inputs/InputText';
import Options from '../Questionnaire/Components/inputs/Options';

const FtnesssQuestionare = () => {
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
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/questionnaire/?name=weekly_movement`,
      )
      .then((res) => {
        if (res.data) {
          setQuestions(res.data.questions);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleMovementQuestionnaire = () => {
    setLoader(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/v1/questionnaire/`, {
        memberCode: memberCode,
        questionnaireName: 'weekly_movement',
        response: response,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => navigate('/movement?evolve=evolve'));
  };

  const isFormValid = useMemo(
    () => isAnyEmptyResponseFitness(currentQuestion, response),
    [currentQuestion, response],
  );

  return (
    <div className="h-screen overflow-y-scroll  px-6 py-8">
      {questions &&
        questions?.map((ques, idx) => {
          return (
            <div className="">
              {ques.screen === screen && (
                <div className="relative flex h-full flex-col justify-between ">
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
                              navigate('/movement');
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
                        {/* Description */}
                        <p className="my-2 space-x-2 text-[14px] text-[#b1b1b1]">
                          {capitalizeFirstLetter(ques?.description)}
                        </p>
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

export default FtnesssQuestionare;
