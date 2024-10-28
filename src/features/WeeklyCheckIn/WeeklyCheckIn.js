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

const WeeklyCheckIn = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [checkInError, setCheckInError] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [completionHistory, setCompletionHistory] = useState([]);

  const [weekRating, setWeekRating] = useState('');
  const achievementRef = useRef('');
  const learningsRef = useRef('');
  const [achievement, setAchievement] = useState('');
  const [learnings, setLearnings] = useState('');
  const [weight, setWeight] = useState('');
  const [frontImage, setFrontImage] = useState(null);
  const [sideImage, setSideImage] = useState(null);
  const [frontImageUrl, setFrontImageUrl] = useState(null);
  const [sideImageUrl, setSideImageUrl] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserFromStorage();
  }, [getUserFromStorage]);

  useEffect(() => {
    if (user && user.email) {
      getWeeklyData();
      getCalendarData();
      fetchSubmittedData();
    } else {
      setError('Please login first');
    }
  }, [user, selectedDate]);

  const getWeeklyData = () => {
    setLoader(true);
    const today = new Date().toLocaleDateString('en-GB');
    axios
      .get(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client`, {
        params: {
          email: user.email,
          day: today,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log('Weekly stats received:', res.data);
          setWeeklyStats(res.data);
          setLoader(false);
          setError(null);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setWeeklyStats(null);
        setError('Failed to fetch weekly data');
        setLoader(false);
      });
  };

  const getCalendarData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/lifestyle`,
        {
          params: {
            user: user.code,
            date: selectedDate,
          },
        },
      );
      setCompletionHistory(response.data.completionHistory || []);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      setError('Failed to fetch calendar data');
    }
  };

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-checkin`,
        {
          params: {
            memberCode: user.code,
            currentWeek: true,
          },
        },
      );

      if (
        response.data.success &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const checkInData = response.data.data[0];
        setWeekRating(checkInData.rating.toString());
        setAchievement(checkInData.achievement);
        setLearnings(checkInData.learning);
        setWeight(checkInData.weight ? checkInData.weight.toString() : '');

        if (checkInData.imageURLs && checkInData.imageURLs.length > 0) {
          setFrontImageUrl(checkInData.imageURLs[0]);
          if (checkInData.imageURLs.length > 1) {
            setSideImageUrl(checkInData.imageURLs[1]);
          }
        }

        setIsSubmitted(true);
        setCheckInError(null);
      } else {
        setCheckInError('No data found in the response');
        setIsSubmitted(false);
      }
    } catch (error) {
      console.error('Error fetching submitted weekly check-in data:', error);
      setCheckInError(`Failed to fetch data: ${error.message}`);
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCheckInError(null);

    const formData = new FormData();
    formData.append('rating', weekRating);
    formData.append('achievement', achievement);
    formData.append('learning', learnings);
    formData.append('memberCode', user.code);
    formData.append('weight', weight);
    if (frontImage) formData.append('frontImage', frontImage);
    if (sideImage) formData.append('sideImage', sideImage);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-checkin`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.success) {
        try {
          console.log('Starting weekly check-in tracking...');

          // Verify Mixpanel is initialized
          if (!mixpanel) {
            console.error('Mixpanel not initialized');
            return;
          }

          // Track the event
          mixpanel.track('Weekly Check-in Submitted', {
            completion_status: 'submitted',
            submission_timestamp: new Date().toISOString(),
            submit_day: new Date().toLocaleDateString('en-US', {
              weekday: 'long',
            }),
          });

          console.log('weekly check-in tracked successfully');
        } catch (error) {
          console.error('Error tracking weekly check-in:', error);
        }
        await fetchSubmittedData();
        setShowSuccessPopup(true);
      } else {
        setCheckInError('Server responded with an unsuccessful status');
      }
    } catch (error) {
      console.error('Error submitting weekly check-in:', error);
      setCheckInError(`Failed to submit weekly check-in: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleTextAreaChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const memoizedWeeklyWorkoutReport = useMemo(
    () => (
      <WeeklyWorkoutReport
        consistencyTrend={weeklyStats?.consistencyTrend || ''}
        suggestedWorkoutPerWeek={weeklyStats?.frequency || 0}
        lastEightWeeksWorkout={weeklyStats?.lastEightWeeksWorkout || []}
      />
    ),
    [weeklyStats],
  );

  return (
    <>
      <div
        className={`flex w-screen grow flex-col gap-2 overflow-y-scroll px-4 pb-[20px] ${
          showSuccessPopup ? 'blur-sm' : ''
        }`}
      >
        <div className="mb-2 mt-4 flex items-center justify-between">
          <button
            onClick={() => (window.location.href = '/home')}
            className="hover:text-gray-300 text-white transition-colors"
          >
            <IoArrowBackOutline size={24} />
          </button>
          <h1 className="flex-grow text-center text-2xl font-bold">
            Weekly Check-In
          </h1>
          <div className="w-6"></div>
        </div>
        {loader && <Loader />}
        {error && <Error>{error}</Error>}
        {!loader && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.section variants={itemVariants}>
              <Calendar
                completionHistory={completionHistory}
                isSummaryPage={false}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </motion.section>

            <motion.section variants={itemVariants} className="mt-8">
              {memoizedWeeklyWorkoutReport}
            </motion.section>

            <motion.form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="weekRating"
                  className="text-gray-700 block text-base font-medium sm:text-lg"
                >
                  Rate your week out of 10
                </label>
                <div className="relative">
                  <select
                    id="weekRating"
                    value={weekRating}
                    onChange={(e) => setWeekRating(e.target.value)}
                    className="border-gray-300 mt-1 block w-full appearance-none rounded-md bg-[#2B2B28] p-2   text-lightGray shadow-sm"
                    required
                    disabled={isSubmitted}
                  >
                    <option value="">Select a rating</option>
                    {[...Array(11)].map((_, i) => (
                      <option key={i} value={i.toString()}>
                        {i}
                      </option>
                    ))}
                  </select>
                  <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-2xl text-white" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="achievement"
                  className="text-gray-700 block text-base font-medium sm:text-lg"
                >
                  Tell us your biggest achievement of the week
                </label>
                <textarea
                  id="achievement"
                  value={achievement}
                  onChange={(e) => {
                    setAchievement(e.target.value);
                    handleTextAreaChange(e);
                  }}
                  className="textarea-no-scrollbar border-gray-300 mt-1 block w-full rounded-md bg-[#2B2B28] p-2 text-lightGray shadow-sm outline-none"
                  required
                  style={{
                    minHeight: '100px',
                    resize: 'none',
                    overflow: 'auto',
                  }}
                  readOnly={isSubmitted}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="learnings"
                  className="text-gray-700 block text-base font-medium sm:text-lg"
                >
                  What are your learnings of the week and how can we build the
                  next week better ?
                </label>
                <textarea
                  id="learnings"
                  value={learnings}
                  onChange={(e) => {
                    setLearnings(e.target.value);
                    handleTextAreaChange(e);
                  }}
                  className="textarea-no-scrollbar border-gray-300 mt-1 block w-full rounded-md bg-[#2B2B28] p-2 text-base  text-lightGray shadow-sm outline-none"
                  required
                  style={{
                    minHeight: '100px',
                    resize: 'none',
                    overflow: 'auto',
                  }}
                  readOnly={isSubmitted}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="weight"
                  className="text-gray-700 block text-base font-medium sm:text-lg"
                >
                  Current Weight (in kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border-gray-300 mt-1 block w-full rounded-md bg-[#2B2B28] p-2 text-lightGray   shadow-sm"
                  required
                  disabled={isSubmitted}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="frontImage"
                  className="text-gray-700 block text-base font-medium sm:text-lg"
                >
                  Front Pose Image (optional)
                </label>
                {!isSubmitted ? (
                  <input
                    type="file"
                    id="frontImage"
                    onChange={(e) => setFrontImage(e.target.files[0])}
                    className="mt-1 block w-full text-white"
                    accept="image/*"
                  />
                ) : frontImageUrl ? (
                  <div className="flex w-full justify-center">
                    <div className="relative flex h-72 w-64 items-center justify-center overflow-hidden rounded-lg py-2 sm:h-80 sm:w-80">
                      <img
                        src={frontImageUrl}
                        alt="Front Pose"
                        className="w-84 absolute mt-2 h-auto"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 mt-1">No image uploaded</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="sideImage"
                  className="text-gray-700 block text-base font-medium sm:text-lg"
                >
                  Side Pose Image (optional)
                </label>
                {!isSubmitted ? (
                  <input
                    type="file"
                    id="sideImage"
                    onChange={(e) => setSideImage(e.target.files[0])}
                    className="mt-1 block w-full text-white"
                    accept="image/*"
                  />
                ) : sideImageUrl ? (
                  <div className="flex w-full justify-center">
                    <div className="relative flex h-72 w-64 items-center justify-center overflow-hidden rounded-lg sm:h-80 sm:w-80">
                      <img
                        src={sideImageUrl}
                        alt="Side Pose"
                        className="w-84 absolute mt-2 h-auto"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 mt-1">No image uploaded</p>
                )}
              </motion.div>

              {!isSubmitted && (
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Weekly Check-In'}
                  </button>
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        )}
      </div>
      {showSuccessPopup && (
        <WeeklyCheckInSuccessPopup onClose={handleClosePopup} />
      )}
    </>
  );
};

export default WeeklyCheckIn;
