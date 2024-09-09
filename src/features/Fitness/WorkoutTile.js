import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';

const SlideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 100px; /* Adjust as needed */
    opacity: 1;
  }
`;

const SlideContainer = styled.div`
  overflow: hidden;
  animation: ${SlideDown} 0.5s ease-out forwards;
  max-height: 100px; /* Adjust as needed */
`;

const WorkoutTile = ({ homeStats, isDisabled, setHomeStats }) => {
  const navigate = useNavigate();
  const [morningInput, setMorningInput] = useState(false);
  const [eveningInput, setEveningInput] = useState(false);
  const memberCode = JSON.parse(localStorage.getItem('user'))['code'];

  const handleMorningTile = () => {
    if (homeStats['Morning Zone']['movements'][0].completed !== true) {
      if (
        homeStats['Morning Zone']['movements'][0].movementName === 'Workout'
      ) {
        navigate(
          `/workout/today?movementId=${homeStats['Morning Zone']['movements'][0].movementId}`,
        );
      }

      if (homeStats['Morning Zone']['movements'][0].movementName === 'Flex') {
        navigate(
          `/workout/flex?movementId=${homeStats['Morning Zone']['movements'][0].movementId}`,
        );
      }

      if (
        homeStats['Morning Zone']['movements'][0].movementName !== 'Workout' &&
        homeStats['Morning Zone']['movements'][0].movementName !== 'Flex' &&
        homeStats['Morning Zone']['movements'][0].movementName !== 'Rest'
      ) {
        setMorningInput(!morningInput);
      }
    }
  };

  const handleEveningTile = () => {
    if (homeStats['Evening Zone']['movements'][0].completed !== true) {
      if (
        homeStats['Evening Zone']['movements'][0].movementName === 'Workout'
      ) {
        navigate(
          `/workout/today?movementId=${homeStats['Evening Zone']['movements'][0].movementId}`,
        );
      }

      if (homeStats['Evening Zone']['movements'][0].movementName === 'Flex') {
        navigate(
          `/workout/flex?movementId=${homeStats['Evening Zone']['movements'][0].movementId}`,
        );
      }

      if (
        homeStats['Evening Zone']['movements'][0].movementName !== 'Workout' &&
        homeStats['Evening Zone']['movements'][0].movementName !== 'Flex' &&
        homeStats['Evening Zone']['movements'][0].movementName !== 'Rest'
      ) {
        setEveningInput(!eveningInput);
      }
    }
  };

  const postWorkoutData = ({ id, text }) => {
    if (text === 'Morning Zone') {
      setMorningInput(false);
    }
    if (text === 'Evening Zone') {
      setEveningInput(false);
    }

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/v1/weekly-movement/workout`, {
        movementId: id,
        memberCode: memberCode,
        isCompleted: true,
        action: 'update_completion_status',
      })
      .then((res) => {
        setHomeStats(res.data.data);
        toast.success('Workout is updated');
      })
      .catch((err) => {
        console.log(err.message);
        toast.error('Error with updating workout');
      })
      .finally(() => {});
  };

  console.log(
    'xcxcxcxcxc',
    Object.keys(homeStats['Evening Zone']['movements']).length,
  );

  return (
    <div className="flex h-max flex-col gap-2 pb-4">
      {Object.keys(homeStats['Morning Zone']['movements']).length > 0 && (
        <>
          {homeStats['Morning Zone']['movements'].map((item) => (
            <section>
              <div
                className="flex flex-col items-center"
                style={{
                  opacity: isDisabled ? 0.5 : 1,
                  pointerEvents: isDisabled ? 'none' : 'auto',
                  cursor: isDisabled ? 'not-allowed' : 'default',
                }}
              >
                <div
                  onClick={() => handleMorningTile()}
                  className="relative z-10 flex h-[85px] w-full grow items-center justify-between rounded-xl bg-morning-zone bg-cover py-2 pl-4 pr-7 "
                >
                  <div className="flex h-full flex-col justify-center">
                    <h5 className="text-sm font-light text-white-opacity-50">
                      Morning Zone
                    </h5>
                    <h2 className="text-xl  "> {item.movementName}</h2>

                    {item.movementName !== 'Rest' && (
                      <div className="mt-1 flex gap-3">
                        <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                          <img
                            src="/assets/yellowTimer.svg"
                            className="mr-[2px]"
                          />
                          {item.time}
                        </h2>
                      </div>
                    )}
                  </div>
                  {item.movementName !== 'Rest' && (
                    <img
                      className="h-[55px] w-[55px] rounded-xl"
                      style={{
                        boxShadow:
                          item.completed === true
                            ? '0 4px 6px rgba(94, 204, 123, 1), 0 -4px 6px rgba(94, 204, 123, 1), 4px 0 6px rgba(94, 204, 123, 1), -4px 0 6px rgba(94, 204, 123, 1)'
                            : '0 4px 6px rgba(221, 249, 136, 0.4), 0 -4px 6px rgba(221, 249, 136, 0.4), 4px 0 6px rgba(221, 249, 136, 0.4), -4px 0 6px rgba(221, 249, 136, 0.4)',
                      }}
                      src={
                        item.completed === true
                          ? '/assets/green-tick-big.svg'
                          : '/assets/yellow-play.svg'
                      }
                    />
                  )}
                </div>

                {morningInput === true && (
                  <SlideContainer className="relative -top-3 w-full rounded-b-xl bg-black-opacity-45 px-3 pb-3 pt-7">
                    <p className="text-center text-offwhite">
                      Have you completed this?
                    </p>
                    <div className="mt-3 flex w-full justify-center gap-8">
                      <button
                        onClick={() =>
                          postWorkoutData({
                            id: homeStats['Morning Zone']['movements'][0]
                              .movementId,
                            text: 'Morning Zone',
                          })
                        }
                        className="w-14 rounded bg-green text-black"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setMorningInput(false)} // Use button and attach onClick here
                        className="w-14 rounded bg-red text-black"
                      >
                        No
                      </button>
                    </div>
                  </SlideContainer>
                )}
              </div>
            </section>
          ))}
        </>
      )}

      {Object.keys(homeStats['Evening Zone']['movements']).length > 0 && (
        <>
          {homeStats['Evening Zone']['movements'].map((item) => (
            <section>
              <div className="flex flex-col items-center">
                <div
                  onClick={() => handleEveningTile()}
                  className="relative flex h-[85px] w-full grow items-center justify-between rounded-xl bg-evening-zone bg-cover py-2 pl-4 pr-7 "
                >
                  <div className="flex h-full flex-col justify-center">
                    <h5 className="text-sm font-light text-white-opacity-50">
                      Evening Zone
                    </h5>
                    <h2 className="text-xl  "> {item.movementName}</h2>
                    {item.movementName !== 'Rest' && (
                      <div className="mt-1 flex gap-3">
                        <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                          <img
                            src="/assets/yellowTimer.svg"
                            className="mr-[2px] "
                          />
                          {item.time}
                        </h2>
                      </div>
                    )}
                  </div>
                  {item.movementName !== 'Rest' && (
                    <img
                      className="h-[55px] w-[55px] rounded-xl"
                      style={{
                        boxShadow:
                          item.completed === true
                            ? '0 4px 6px rgba(94, 204, 123, 1), 0 -4px 6px rgba(94, 204, 123, 1), 4px 0 6px rgba(94, 204, 123, 1), -4px 0 6px rgba(94, 204, 123, 1)'
                            : '0 4px 6px rgba(221, 249, 136, 0.4), 0 -4px 6px rgba(221, 249, 136, 0.4), 4px 0 6px rgba(221, 249, 136, 0.4), -4px 0 6px rgba(221, 249, 136, 0.4)',
                      }}
                      src={
                        item.completed === true
                          ? '/assets/green-tick-big.svg'
                          : '/assets/yellow-play.svg'
                      }
                    />
                  )}
                </div>
                {eveningInput === true && (
                  <SlideContainer className="relative -top-3 w-full rounded-b-xl bg-black-opacity-45 px-3 pb-3 pt-7">
                    <p className="text-center text-offwhite">
                      Have you completed this?
                    </p>
                    <div className="mt-3 flex w-full justify-center gap-8">
                      <button
                        onClick={() =>
                          postWorkoutData({
                            id: item.movementId,
                            text: 'Evening Zone',
                          })
                        }
                        className="w-14 rounded bg-green text-black"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setEveningInput(false)} // Use button and attach onClick here
                        className="w-14 rounded bg-red text-black"
                      >
                        No
                      </button>
                    </div>
                  </SlideContainer>
                )}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
};

export default WorkoutTile;
