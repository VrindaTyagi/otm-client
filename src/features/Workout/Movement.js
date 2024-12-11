//Movement.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchSwapMovementList } from './WorkoutSlice';

const Movement = ({
  movement,
  isSectionCodeAvailable,
  movementLength,
  openMovementDetail,
  setShowSwapOptions,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={`card ${movementLength > 1 ? 'w-[90%]' : 'w-full'}`}>
      <div
        className={`mb-8 flex h-[400px]
           w-full
          flex-col justify-between rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-lg`}
      >
        <div>
          <div className="text-md mb-1 flex items-center justify-between text-lightGray">
            <span onClick={() => openMovementDetail(movement)}>
              {movement.fullName}
            </span>
            <div
              className="flex w-fit cursor-pointer flex-row items-center justify-center gap-1"
              onClick={() => {
                dispatch(fetchSwapMovementList(movement?.code));
                setShowSwapOptions(true);
              }}
            >
              <img src={'/assets/movement_swap_icon.svg'} alt="movement_swap" />
              <p
                className="text-[15px] capitalize text-[#5ECC7B]"
                style={{ fontWeight: 590, letterSpacing: '-0.54px' }}
              >
                Swap
              </p>
            </div>
          </div>
          {isSectionCodeAvailable && (
            <div className="flex space-x-2 text-xs font-semibold text-black ">
              {movement.personalRecord !== null &&
                movement.personalRecord > 0 && (
                  <span className="w-fit rounded bg-[#F5C563] px-2 py-0.5  -tracking-[0.36px]">
                    PR {movement.personalRecord}{' '}
                    {movement.personalRecordUnit
                      ? movement.personalRecordUnit
                      : 'KG'}
                  </span>
                )}
              {movement.lastUsedLoad !== null && movement.lastUsedLoad > 0 && (
                <span className="w-fit rounded bg-[#7CDCF6]  px-2 py-0.5 -tracking-[0.36px]">
                  Last Workout {movement.lastUsedLoad}{' '}
                  {movement.lastUsedLoadUnit ? movement.lastUsedLoadUnit : 'KG'}
                </span>
              )}
              {/* <span className="p-1 my-1 bg-floYellow">Personal Record 24KG</span>
            <span className="p-1 my-1 bg-blue">Last Workout 12KG</span> */}
            </div>
          )}
        </div>
        <div
          className="flex h-fit w-full items-center justify-center p-2"
          style={{ maxHeight: '240px' }}
          onClick={() => openMovementDetail(movement)}
        >
          <img
            className="h-auto w-auto rounded-lg"
            style={{ maxHeight: '240px', maxWidth: '250px' }}
            src={movement.link[0]}
            alt="Movement"
          />
        </div>
        <div
          className="flex justify-center"
          onClick={() => openMovementDetail(movement)}
        >
          <div className="flex items-center justify-center rounded-[7px] border border-white p-[3px]">
            <span className="w-fit rounded border bg-white px-2 py-0.5  text-center text-xs font-bold -tracking-[0.36px] text-black">
              Tap For Details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movement;
