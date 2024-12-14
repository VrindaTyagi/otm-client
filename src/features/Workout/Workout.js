import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Error, Loader } from '../../components';
import { getFlexWorkout } from './FlexSlice';
import MainPage from './MainPage';
import { getWorkout, setStatus } from './WorkoutSlice';

const Workout = () => {
  const { status } = useSelector((store) => store.workoutReducer);

  const dispatch = useDispatch();
  let memberCode = '';

  const params = useParams();

  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
    memberCode = user['code'];
  }

  useEffect(() => {
    if (memberCode) {
      if (params.value === 'today') {
        dispatch(getWorkout(memberCode));
      }
      if (params.value === 'flex') {
        dispatch(getFlexWorkout(memberCode));
      }
    } else {
      dispatch(setStatus('error'));
    }
  }, [dispatch, memberCode]);

  if (user === null || undefined) {
    return <Error>No User Found</Error>;
  }

  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error>Oops! Something Went Wrong</Error>}
      {status === 'success' && <MainPage />}
    </>
  );
};

export default Workout;
