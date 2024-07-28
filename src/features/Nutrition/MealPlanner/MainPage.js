import React, { useState, useEffect } from 'react'
import CrossIcon from '../../../components/CrossIcon'
import { Button } from '../../../components'
import GetStarted from './GetStarted'
import Questions from './Questions'
import { useDispatch, useSelector } from 'react-redux';
import { getScreenCounts, isAnyEmptyResponse, validResponses } from '../../LifestyleQuiz/utils/utils';
import { axiosClient } from '../apiClient'
import * as Actions from "./Redux/actions"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainPage() {
    const dispatch = useDispatch();
    const [validation, setValidation] = useState({});

    const { questions, responses, sectionName, questionScreen, totalQuestionScreen, currentQuestion } = useSelector((state) => ({
        questions: state.questions,
        responses: state.responses,
        sectionName: state.sectionName,
        questionScreen: state.questionSectionInfo.screen,
        totalQuestionScreen: state.questionSectionInfo.totalScreens,
        currentQuestion: state.questionSectionInfo.currentScreenQuestions
    }))

    useEffect(() => {
        axiosClient.get('/questionnaire')
            .then(res => {
                console.log("response : ", res);
                dispatch(Actions.updateQuestions(res?.data?.questions));
            })
            .catch(err => console.log(err))
    }, [])


    // update the section name
    useEffect(() => {
        // if the meal is already planned then set the section name to 'Weekly Plan'
        // Implementation

        // else start with the 'Get Started'
        dispatch(Actions.updateSectionName('Get Started'));
    }, [])

    useEffect(() => {
        console.log("questions screen : ", questionScreen, totalQuestionScreen)
    }, [questionScreen, totalQuestionScreen])

    useEffect(() => {
        const maxScreenCount = getScreenCounts(questions);
        console.log("maxScreenCount : ", maxScreenCount)
        dispatch(Actions.updateQuestionSectionInfo({ totalScreens: maxScreenCount }))
    }, [questions])

    return (
        <div className='w-full min-h-screen overflow-y-scroll py-4 px-3 bg-black'>
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
            <div className='absolute top-4 right-3'>
                <CrossIcon />
            </div>

            {/* Dynamic Section Starts */}
            <div className='w-full overflow-y-scroll'>
                {
                    sectionName === 'Get Started' &&
                    <div className="w-full mt-[5rem]">
                        <GetStarted />
                    </div>
                }
                {
                    sectionName === 'Questions' &&
                    <div className="w-full mt-1 mb-[4rem]">
                        <Questions validation={validation} setValidation={setValidation} />
                    </div>
                }

            </div>
            {/* Dynamic Section Ends */}

            <div className='w-full fixed bottom-4 left-0 px-3'>
                {
                    sectionName === 'Get Started' && <Button type="mealplanner" text="Get Started" action={() => dispatch(Actions.updateSectionName('Questions'))} />
                }
                {
                    sectionName === 'Questions' && questionScreen === 1 && <Button type="mealplanner" text="Continue" action={() => dispatch(Actions.updateQuestionSectionInfo({ screen: questionScreen + 1 }))} />
                }
                {
                    totalQuestionScreen !== 0 && sectionName === 'Questions' && questionScreen !== 1 && questionScreen <= totalQuestionScreen &&
                    <div className='w-full grid grid-cols-6 place-items-center gap-2'>
                        <div className='w-full col-span-2'>
                            <Button type="mealplannerback" text="Back" action={() => dispatch(Actions.updateQuestionSectionInfo({ screen: questionScreen - 1 }))} />
                        </div>
                        <div className="w-full col-span-4">
                            <Button type="mealplanner" text="Continue" action={() => {
                                // checking for empty response
                                if (
                                    currentQuestion &&
                                    Object.keys(responses)?.length > 0 &&
                                    !isAnyEmptyResponse(currentQuestion, responses) &&
                                    validResponses(validation)
                                ) {
                                    // logic when the continue button is pressed
                                    if(questionScreen < totalQuestionScreen){
                                        dispatch(Actions.updateQuestionSectionInfo({ screen: questionScreen + 1 }))
                                    }
                                    else if(questionScreen === totalQuestionScreen){
                                        // logic to submit the questions
                                        console.log("questions submitted : ",responses);
                                    }
                                    
                                } else {
                                    if (isAnyEmptyResponse(currentQuestion, responses)) {
                                        toast.warn('Please fill in the required fields!');
                                    } else if (!validResponses(validation)) {
                                        toast.warn('Please fill in the valid answer!');
                                    }
                                }
                            }} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MainPage