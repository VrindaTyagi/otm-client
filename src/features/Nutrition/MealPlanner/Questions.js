import React, { useState, useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Actions from './Redux/actions';
import {
  updateCurrentQuestion,
  capitalizeFirstLetter,
} from '../../LifestyleQuiz/utils/utils';
import InputText from '../../LifestyleQuiz/InputText';
import Options from '../../LifestyleQuiz/Options';
import * as Selectors from './Redux/selectors';

function Questions({ validation, setValidation }) {
  const dispatch = useDispatch();
  const selectQuestions = Selectors.makeGetQuestions();
  const selectResponses = Selectors.makeGetResponses();
  const selectQuestionSectionInfo = Selectors.makeGetQuestionSectionInfo();

  const questions = useSelector(selectQuestions, shallowEqual);
  const responses = useSelector(selectResponses, shallowEqual);
  const questionSectionInfo = useSelector(
    selectQuestionSectionInfo,
    shallowEqual,
  );
  const screen = questionSectionInfo.screen;

  const [response, setResponse] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    if (Object.keys(responses).length === 0) {
      // Update the response state using a callback
      setResponse((prev) => {
        const newResponse = {};
        questions &&
          questions.forEach((ques) => {
            newResponse[ques.code] = [''];
          });
        return newResponse;
      });
    } else {
      setResponse(responses);
    }
  }, []);

  useEffect(() => {
    if (
      Object.keys(response).length > 0 &&
      response['nt12'][0] === 'no_thanks' &&
      response['nt13'][0] !== ''
    ) {
      setResponse((prev) => ({
        ...prev,
        nt13: [''],
      }));
    }
    dispatch(Actions.updateResponse(response));
  }, [response]);

  useEffect(() => {
    questions && updateCurrentQuestion(questions, screen, setCurrentQuestion);
  }, [screen, questions]);

  // update currentScreenQuestions in Redux
  useEffect(() => {
    dispatch(
      Actions.updateQuestionSectionInfo({
        currentScreenQuestions: currentQuestion,
      }),
    );
  }, [currentQuestion]);

  return (
    <div className="w-full">
      {currentQuestion &&
        currentQuestion?.map((ques, idx) => {
          return (
            <>
              {ques.code !== 'nt13' && (
                <div
                  className="my-8 flex flex-col justify-center"
                  key={ques?.content}
                >
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
                  ques?.inputType?.toUpperCase() === 'MULTICHOICE' ? (
                    <Options
                      questionCode={ques?.code}
                      options={ques?.options}
                      isMCQ={ques?.inputType !== 'singleChoice'}
                      response={Object.keys(response)?.length > 0 && response}
                      setResponse={setResponse}
                    />
                  ) : (
                    <InputText
                      questionCode={ques?.code}
                      response={Object.keys(response)?.length > 0 && response}
                      setResponse={setResponse}
                      key={ques?.code}
                      inputType={ques?.inputType}
                      placeholder={ques?.placeholder}
                      isRequired={ques?.isRequired}
                      validation={validation}
                      setValidation={setValidation}
                      inputAsNumberOrText={
                        ques?.inputType === 'number' ? 'number' : 'text'
                      }
                    />
                  )}
                </div>
              )}

              {ques.code === 'nt13' &&
                responses['nt12'][0] === 'lets_do_it' && (
                  <div
                    className="my-8 flex flex-col justify-center"
                    key={ques?.content}
                  >
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
                    ques?.inputType?.toUpperCase() === 'MULTICHOICE' ? (
                      <Options
                        questionCode={ques?.code}
                        options={ques?.options}
                        isMCQ={ques?.inputType !== 'singleChoice'}
                        response={Object.keys(response)?.length > 0 && response}
                        setResponse={setResponse}
                      />
                    ) : (
                      <InputText
                        questionCode={ques?.code}
                        response={
                          Object.keys(response)?.length > 0 &&
                          responses['nt12'][0] === 'lets_do_it'
                            ? response
                            : ''
                        }
                        setResponse={setResponse}
                        key={ques?.code}
                        inputType={ques?.inputType}
                        placeholder={ques?.placeholder}
                        isRequired={ques?.isRequired}
                        validation={validation}
                        setValidation={setValidation}
                        inputAsNumberOrText={
                          ques?.inputType === 'number' ? 'number' : 'text'
                        }
                      />
                    )}
                  </div>
                )}
            </>
          );
        })}
    </div>
  );
}

export default Questions;
