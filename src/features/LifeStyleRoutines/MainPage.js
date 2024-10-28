//MainPage.js
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { NavigationTab } from './index';
import Calendar from './Calendar';
import { axiosClient } from './apiClient';
import { getFormattedDate } from './utils';
import BackButton from '../../components/BackButton';
import Routines from './Routines';
import Summary from './Summary';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../LifestyleQuiz';
import { Error } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialStateSuccess } from './ReduxStore/actions';
import { TimelineHeading } from '../Timeline/StyledComponents';
import { FiUpload } from 'react-icons/fi';
import domtoimage from 'dom-to-image';
import {
  getCurrentHourInTimezone,
  getDeviceTimezone,
  getGreeting,
} from '../Fitness/utils';
import ShareCoachScreen from './components/ShareCoachScreen';
import Questionare from './QuestionScreen';
import axios from 'axios';
import { toast } from 'react-toastify';
import { capitalizeFirstLetter } from '../../utils';

function MainPage() {
  // Defining states for the fetched data
  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [section, setSection] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(false);
  const contentAreaRef = useRef(null);
  const [contentAreaHeight, setContentAreaHeight] = useState(0);
  const [isCircleOpen, setIsCircleOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageRef = useRef(null);
  const [greeting, setGreeting] = useState('');
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const firstName = fullName.split(' ')[0];
  const [shareSummaryVisible, setShareSummaryVisible] = useState(false);
  const [questionnaireScreen, setQuestionnaireScreen] = useState(false);
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [showLifestyleLoader, setShowLifestyleLoader] = useState(true);
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const userProfilePicture = JSON.parse(localStorage.getItem('profilePicture'));
  const shareScreenRef = useRef(null);
  const caiptalInitial = capitalizeFirstLetter(fullName);

  const code = JSON.parse(localStorage.getItem('user'))['code'];

  async function getMemberData(code) {
    try {
      const res = await axiosClient.get(`/profile`, {
        params: { code: code },
      });
      if (res.data.profilePicture) {
        localStorage.setItem(
          'profilePicture',
          JSON.stringify(res.data.profilePicture),
        );
      } else {
        localStorage.setItem('profilePicture', JSON.stringify(''));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  useEffect(() => {
    if (!userProfilePicture && userProfilePicture !== '') {
      getMemberData(code);
    }
  }, []);

  const handleCaptureAndShare = () => {
    if (shareScreenRef.current) {
      shareScreenRef.current.captureAndSharePage();
    }
  };

  // Get the value of the 'LifestyleLoader' parameter
  const lifestyleLoader = queryParams.get('lifestyleLoader');
  const handleLoader = () => {};

  const getData = async (date) => {
    setPageLoading(true);
    setPageError(false);
    try {
      const response = await axiosClient.get(
        `?user=${memberCode}&date=${date}`,
      );
      dispatch(fetchInitialStateSuccess(response.data));
    } catch (error) {
      console.error(error);
      setPageError(true);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    setQuestionnaireScreen(false);
    // Set a timeout to hide the loader after 5 seconds (5000 ms)
    if (lifestyleLoader) {
      getData(selectedDate);
      const timer = setTimeout(() => {
        console.log('sixes');
        setShowLifestyleLoader(false);
        navigate('/lifestyle-routine');
      }, 5000);

      // Cleanup the timer if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [lifestyleLoader]);

  useEffect(() => {
    const timezone = getDeviceTimezone();
    const currentHour = getCurrentHourInTimezone(timezone);
    const greetingMessage = getGreeting(currentHour);
    setGreeting(greetingMessage);
  }, []);

  const { completionHistory, circles, percentCompletion, lifeStyleMemberCode } =
    useSelector((state) => ({
      completionHistory: state.completionHistory,
      circles: state.lifeStyleDetails?.circles,
      percentCompletion: state.lifeStyleDetails?.completionHistory,
      lifeStyleMemberCode: state.lifeStyleDetails?.memberCode,
    }));

  useEffect(() => {
    if (lifeStyleMemberCode && lifeStyleMemberCode !== 'GENERAL') {
      setShowInitialScreen(false);
    }
  }, [lifeStyleMemberCode]);

  const memberCode = JSON.parse(localStorage.getItem('user'))?.code;

  useLayoutEffect(() => {
    const handleResize = () => {
      if (contentAreaRef.current) {
        // Get the height of the navigation elements
        const globalNavHeight = 78; // Height of the global Navbar
        const localNavHeight = 60; // Height of the NavigationTab

        // Calculate the available height for the content area
        const availableHeight = window.innerHeight - globalNavHeight;

        // Set the content area height
        setContentAreaHeight(availableHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // this will call the API whenever the date is changed
  useEffect(() => {
    if (reloadCounter === false) {
      getData(selectedDate);
    }
  }, [selectedDate, reloadCounter]);

  const renderContent = () => {
    if (pageLoading) {
      return (
        <div className="fixed left-0 top-0 z-50 h-screen w-full bg-black">
          <Loader className="h-full w-full" />
        </div>
      );
    }

    if (pageError) {
      return (
        <div className="fixed left-0 top-0 z-[200] h-screen w-full bg-black">
          <Error>Some Error Occurred</Error>
        </div>
      );
    }

    return (
      <>
        {!pageLoading && (
          <>
            {' '}
            {questionnaireScreen === false &&
              showLifestyleLoader &&
              lifestyleLoader === 'true' && (
                <div className="  absolute  top-0 z-50 flex h-screen w-full items-center bg-black   px-5">
                  <img
                    style={{
                      filter: ' saturate(1.8) brightness(0.7) ',
                    }}
                    className="absolute left-0 top-0 -z-20 h-screen w-full"
                    src="/assets/lifestyle-main-frame.svg"
                  />

                  <div className="my-auto rounded-lg  ">
                    <div className="relative flex justify-center">
                      <img
                        loading="lazy"
                        src="./assets/lifestyle-ai-bg.svg"
                        className="w-full pb-[27px] "
                      />
                      <img
                        loading="lazy"
                        src="./assets/lifestyle-check.svg"
                        className=" absolute  top-16 pb-[27px] "
                      />
                    </div>
                    <p className="w-full text-center text-[20px] text-yellow">
                      Give us a few seconds to work on your responses to create
                      the perfect lifestyle design
                    </p>
                  </div>
                </div>
              )}
            {questionnaireScreen === true && (
              <Questionare setQuestionnaireScreen={setQuestionnaireScreen} />
            )}
            {!lifestyleLoader && questionnaireScreen === false && (
              <div className="h-full  ">
                <img
                  style={{
                    filter: ' saturate(1.8) brightness(0.7) ',
                  }}
                  className="absolute top-0 -z-20 h-screen w-full"
                  src="/assets/lifestyle-main-frame.svg"
                />
                <div>
                  <div className="pointer-events-none absolute opacity-0 ">
                    <ShareCoachScreen
                      ref={shareScreenRef}
                      circles={circles}
                      date={selectedDate}
                      completionHistory={completionHistory}
                      setShareSummaryVisible={setShareSummaryVisible}
                    />
                  </div>

                  {completionHistory && shareSummaryVisible === false && (
                    <>
                      {' '}
                      <>
                        <div className="flex h-full flex-col items-center justify-start gap-3 px-3 py-5 pb-16 pt-[76px]">
                          <div className=" flex w-full justify-between ">
                            <div>
                              <h3 className="font-sfpro text-[14px] text-offwhite">
                                {greeting} {firstName}
                              </h3>

                              <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
                                Lifestyle
                              </h2>

                              <div className="mr-[20px] font-sfpro text-[14px] text-white-opacity-50">
                                Everyday is an opportunity to do some main
                                character shit.
                              </div>
                            </div>

                            <div className="h-[53px] min-w-[53px]">
                              {' '}
                              {userProfilePicture ? (
                                <img
                                  loading="lazy"
                                  src={userProfilePicture}
                                  className="h-[53px] w-[53px] rounded-xl object-cover "
                                />
                              ) : (
                                <div className="flex h-[53px] w-[53px] items-center justify-center rounded-xl bg-black-opacity-45 text-3xl text-white">
                                  {caiptalInitial}
                                </div>
                              )}
                            </div>
                          </div>

                          {lifeStyleMemberCode &&
                            lifeStyleMemberCode === 'GENERAL' && (
                              <div className="mt-[24px] flex w-full flex-col items-center gap-2">
                                <div className="flex w-full flex-col items-center justify-between rounded-xl bg-black-opacity-45 px-[8px] pb-[8px]">
                                  <div className="flex w-full justify-between">
                                    <img
                                      loading="lazy"
                                      src="./assets/lifestyle-check.svg"
                                      className=" h-[120px] w-[120px] p-4 "
                                    />

                                    <div className="mt-2 flex w-full flex-1 flex-col justify-center">
                                      <h3 className="  font-sfpro text-[18px] font-medium text-offwhite">
                                        Unlock your lifestyle design
                                      </h3>
                                      <p className="relative z-10 mt-2 max-w-[200px] font-sfpro  text-[14px] font-medium text-white-opacity-50">
                                        Answer a few questions to get daily
                                        habits tailored to your goals
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    onClick={() => setQuestionnaireScreen(true)}
                                    className=" mt-2 w-full rounded-lg bg-white p-2.5 text-center font-sfpro text-[14px] font-medium text-black" // Replaced p-[10px] with Tailwind equivalent
                                  >
                                    Let's Go
                                  </div>
                                </div>
                              </div>
                            )}

                          {lifeStyleMemberCode &&
                            lifeStyleMemberCode !== 'GENERAL' &&
                            showInitialScreen === false && (
                              <>
                                {' '}
                                {completionHistory && (
                                  <Calendar
                                    completionHistory={completionHistory}
                                    isSummaryPage={section === 1}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                  />
                                )}
                                {section == 1 ? (
                                  <div className="flex w-full items-center justify-between px-3">
                                    <p className="text-lg">Summary</p>
                                    <button
                                      className="flex cursor-pointer gap-2 rounded-md bg-black-opacity-45  px-4 py-2 text-sm text-white"
                                      onClick={() => handleCaptureAndShare()}
                                    >
                                      Share with coach{' '}
                                      <span className="text-[18px] text-[#DEF988]">
                                        <FiUpload />
                                      </span>
                                    </button>
                                  </div>
                                ) : null}
                                {section === 0 ? (
                                  <Routines
                                    circles={circles}
                                    date={selectedDate}
                                    setReloadCounter={setReloadCounter}
                                    setIsCircleOpen={setIsCircleOpen}
                                  />
                                ) : (
                                  <Summary
                                    circles={circles}
                                    date={selectedDate}
                                  />
                                )}
                              </>
                            )}
                        </div>

                        {lifeStyleMemberCode &&
                          lifeStyleMemberCode !== 'GENERAL' &&
                          !lifestyleLoader &&
                          !isCircleOpen &&
                          showInitialScreen === false && (
                            <div className="fixed bottom-[78px] left-0 z-50 w-full bg-black/20 py-4 backdrop-blur-sm">
                              <NavigationTab
                                selectedIndex={section}
                                setSelectedIndex={setSection}
                              />
                            </div>
                          )}
                      </>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className=" h-screen overflow-hidden">
      <div
        className="content-area h-full overflow-y-auto"
        ref={contentAreaRef}
        style={{
          height: shareSummaryVisible === true ? '' : `${contentAreaHeight}px`,
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default MainPage;
