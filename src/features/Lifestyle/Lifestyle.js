import React, { useEffect, useState } from 'react';
import { Error, Loader } from '../../components';
import { useAuth } from '../../contexts/AuthContext';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FeatureUpdatePopup from '../../components/FeatureUpdatePopup';
import { useUserContext } from '../../contexts/UserContext';
import MainPage from '../LifeStyleRoutines/MainPage';
import { TimelineHeading } from '../Timeline/StyledComponents';
import LifeStyleRoutine from './LifeStyleRoutine';
import LifeStyleScore from './LifeStyleScore';

const Lifestryle = () => {
  const { setUserData } = useUserContext();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [homeStats, setHomeStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');

    getUserFromStorage();

    if (user === null) navigate('/');

    function getUserData() {
      setLoader(true);
      axios
        .get(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client`, {
          params: {
            email: user.email,
            day: today,
          },
        })
        .then((res) => {
          if (res.data) {
            setUserData(res.data);
            setHomeStats(res.data);
            setLoader(false);
            setError(null);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setHomeStats(null);
        });
    }

    if (user && user.email) {
      getUserData();
    } else {
      setError('Please login first');
    }
  }, []);

  return (
    <>
      {!loader && !error && (
        <FeatureUpdatePopup backendVersion={homeStats?.lastSeenUiVersion} />
      )}
      {loader && <Loader />}
      {error && <Error>{error}</Error>}
      {homeStats && (
        <div className="flex w-screen grow flex-col gap-5 overflow-y-scroll  px-4 pb-[130px]">
          <div className="mt-[32px]">
            <TimelineHeading>Lifestyle</TimelineHeading>
          </div>

          <MainPage />

          {homeStats?.showLifestyle === true && (
            <section className="flex w-full flex-col items-center justify-center gap-3">
              <LifeStyleScore
                completionPercentage={homeStats?.routineProgress}
              />
              <LifeStyleRoutine />
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default Lifestryle;
