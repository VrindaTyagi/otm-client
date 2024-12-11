import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import AlertDialog from './AlertDialog';
import {
  setMovementSwapSectionStatus,
  updateSectionWorkout,
} from './WorkoutSlice.js';

function SwapMovementOptions({ setShowSwapOptions, sectionCode }) {
  const [movementsList, setMovementsList] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [currentEquipment, setCurrentEquipment] = useState('');
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedMovementInfo, setSelectedMovementInfo] = useState(null);
  const [alertMessage, setAlertMessage] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedMovementDetail, setSelectedMovementDetail] = useState(null);
  const dispatch = useDispatch();
  const {
    swapMovementsList,
    status,
    oldSwapMovementCode,
    workoutId,
    swapMovementSectionStatus,
  } = useSelector((store) => store.workoutReducer);

  useEffect(() => {
    // reset to default empty status on first load
    dispatch(setMovementSwapSectionStatus(''));
  }, []);

  useEffect(() => {
    // console.log("movementsList and equipments : ", movementsList, equipments);

    setEquipments((prev) => getListOfEquipments());
    // initially save all the movements to the movements list,
    setMovementsList(swapMovementsList);
  }, [swapMovementsList]);

  useEffect(() => {
    // change the movements list as per user choice
    if (currentEquipment !== '')
      setMovementsList(
        swapMovementsList.filter((mvmt) =>
          mvmt?.equipment.includes(currentEquipment),
        ),
      );
    else setMovementsList(swapMovementsList);
  }, [currentEquipment]);

  useEffect(() => {
    if (alertMessage) {
      // call the dispatch function to update the workout section
      dispatch(
        updateSectionWorkout(
          oldSwapMovementCode,
          selectedMovementInfo?.code,
          sectionCode,
          workoutId,
        ),
      );
    }
    setShowAlertDialog(false);
  }, [alertMessage]);

  useEffect(() => {
    if (swapMovementSectionStatus === 'success') {
      // reset the status after successful API call and before closing
      dispatch(setMovementSwapSectionStatus(''));
      setShowSwapOptions(false);
    }
  }, [swapMovementSectionStatus]);

  function getListOfEquipments() {
    let equipments = new Set();
    swapMovementsList.forEach((movement) => {
      movement.equipment.forEach((equip) => {
        equipments.add(equip);
      });
    });
    // add the empty string to the set to support 'All' options
    equipments.add('');

    return Array.from(equipments).sort();
  }

  function handleAlertMessage(inputStatus) {
    setAlertMessage(inputStatus);
    setShowAlertDialog(false);
  }

  const MovementTile = ({ mvmt, setSelectedMovementInfo }) => {
    return (
      <div
        className="flex h-[85px] w-full flex-row items-center justify-between rounded-[12px] bg-black"
        onClick={() => setSelectedMovementDetail(mvmt)}
      >
        <div
          className="flex h-full w-full flex-row items-center justify-start gap-5"
          onClick={() => setShowDetail(true)}
        >
          <img
            src={mvmt?.link[0]}
            alt={mvmt?.name}
            loading="lazy"
            className="h-[85px] w-[85px] rounded-l-[12px] object-cover"
          />
          <div>
            <h3 className="text-[14px] capitalize text-[#fff]">{mvmt?.name}</h3>
            <div className="flex flex-row items-start justify-start gap-2 text-[10px] text-[#b1b1b1] ">
              <p>{mvmt?.section}</p>
              <p>{mvmt?.bucket}</p>
            </div>
          </div>
        </div>
        <div
          className="mr-3 rounded-[6px] bg-[#5ecc7b] px-3 py-1 text-[12px] text-black"
          onClick={() => {
            setShowAlertDialog(true);
            setSelectedMovementInfo((prev) => {
              return {
                section: mvmt?.section,
                code: mvmt?.code,
              };
            });
          }}
        >
          Pick
        </div>
      </div>
    );
  };

  const MovementDetail = ({ mvmt }) => {
    return (
      <div className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-start gap-3 overflow-y-scroll bg-[#1c1c1e] px-3 pb-4 pt-9">
        <img
          src={'/assets/close_icon.svg'}
          alt="close"
          className="fixed right-3 top-3"
          onClick={() => {
            setShowDetail(false);
            setSelectedMovementDetail(null);
          }}
        />
        <div className="flex w-full flex-row items-center justify-center gap-1">
          <img src={'/assets/information-circle.svg'} alt="information" />
          <p className="text-[10px] text-[#929292] ">Movement Details</p>
        </div>
        <img
          src={mvmt?.link[0]}
          alt={mvmt?.name}
          height={140}
          width={120}
          className="rounded-[12px] object-cover"
        />
        <h3
          className="text-[20px] capitalize text-[#fff]"
          style={{ lineHeight: '32px' }}
        >
          {mvmt?.name}
        </h3>
        <div className="flex w-full flex-col items-start justify-start gap-5 rounded-[12px] bg-black px-4 py-3">
          {mvmt?.focus_area.length > 0 && mvmt?.focus_area[0] !== '' && (
            <div className="flex w-full flex-col items-start justify-center gap-3">
              <div className="flex w-full flex-row items-center justify-start gap-1">
                <img src={'/assets/search_icon.svg'} alt="search icon" />
                <h3 className="text-[14px] capitalize text-[#7E87EF]">
                  Focus Area
                </h3>
              </div>
              <div className="itmes-center flex w-full flex-row justify-start gap-2">
                {mvmt?.focus_area.map((item, index) => {
                  return (
                    <div
                      key={item}
                      className="rounded-[6px] border-[0.6px] border-[#f8f8f8] px-3 py-1 text-[10px] text-[#f8f8f8]"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {mvmt?.equipment.length > 0 && mvmt?.equipment[0] !== '' && (
            <div className="flex w-full flex-col items-start justify-center gap-3">
              <div className="flex w-full flex-row items-center justify-start gap-1">
                <img src={'/assets/equipment.svg'} alt="search icon" />
                <h3 className="text-[14px] capitalize text-[#DDF988]">
                  Equipment
                </h3>
              </div>
              <div className="itmes-center flex w-full flex-row justify-start gap-2">
                {mvmt?.equipment.map((item, index) => {
                  return (
                    <div
                      key={item}
                      className="rounded-[6px] border-[0.6px] border-[#f8f8f8] px-3 py-1 text-[10px] text-[#f8f8f8]"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-3 rounded-[12px] bg-black px-4 py-3">
          {mvmt?.setup.length > 0 && mvmt?.setup[0] !== '' && (
            <>
              <h3
                className="text-[20px] capitalize text-[#fff]"
                style={{ lineHeight: '32px' }}
              >
                Setup
              </h3>
              <div className="flex w-full flex-col items-start justify-start gap-3">
                {mvmt?.setup.map((item, index) => {
                  return (
                    item !== '' && (
                      <div
                        key={item}
                        className="flex w-full flex-row items-center justify-start gap-2"
                      >
                        <div className="h-[11px] min-w-[11px] max-w-[11px] rounded-full bg-[#7E87EF]"></div>
                        <p className="text-[14px] text-[#b1b1b1]">{item}</p>
                      </div>
                    )
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-3 rounded-[12px] bg-black px-4 py-3">
          {mvmt?.execution.length > 0 && mvmt?.execution[0] !== '' && (
            <>
              <h3
                className="text-[20px] capitalize text-[#fff]"
                style={{ lineHeight: '32px' }}
              >
                Execution
              </h3>
              <div className="flex w-full flex-col items-start justify-start gap-3">
                {mvmt?.execution.map((item, index) => {
                  return (
                    item !== '' && (
                      <div
                        key={item}
                        className="flex w-full flex-row items-center justify-start gap-2"
                      >
                        <div className="h-[11px] min-w-[11px] max-w-[11px] rounded-full bg-[#5ECC7B]"></div>
                        <p className="text-[14px] text-[#b1b1b1]">{item}</p>
                      </div>
                    )
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-3 rounded-[12px] bg-black px-4 py-3">
          {mvmt?.completion.length > 0 && mvmt?.completion[0] !== '' && (
            <>
              <h3
                className="text-[20px] capitalize text-[#fff]"
                style={{ lineHeight: '32px' }}
              >
                Completion
              </h3>
              <div className="flex w-full flex-col items-start justify-start gap-3">
                {mvmt?.completion.map((item, index) => {
                  return (
                    item !== '' && (
                      <div
                        key={item}
                        className="flex w-full flex-row items-center justify-start gap-2"
                      >
                        <div className="h-[11px] min-w-[11px] max-w-[11px] rounded-full bg-[#F5C563]"></div>
                        <p className="text-[14px] text-[#b1b1b1]">{item}</p>
                      </div>
                    )
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-3 rounded-[12px] bg-black px-4 py-3">
          {mvmt?.key_tips.length > 0 && mvmt?.key_tips[0] !== '' && (
            <>
              <h3
                className="text-[20px] capitalize text-[#fff]"
                style={{ lineHeight: '32px' }}
              >
                Key Tips
              </h3>
              <div className="flex w-full flex-col items-start justify-start gap-3">
                {mvmt?.key_tips.map((item, index) => {
                  return (
                    item !== '' && (
                      <div
                        key={item}
                        className="flex w-full flex-row items-center justify-start gap-2"
                      >
                        <div className="h-[11px] min-w-[11px] max-w-[11px] rounded-full bg-[#DDF988]"></div>
                        <p className="text-[14px] text-[#b1b1b1]">{item}</p>
                      </div>
                    )
                  );
                })}
              </div>
            </>
          )}
        </div>
        <button
          className="mb-7 mt-3 w-full rounded-[12px] bg-[#7E87EF] py-3 text-center text-[18px] text-[#1f1f1f]"
          style={{ letterSpacing: '-0.54px', fontWeight: 590 }}
          onClick={() => {
            setShowDetail(false);
            setSelectedMovementDetail(null);
          }}
        >
          Back
        </button>
      </div>
    );
  };
  return (
    movementsList && (
      <div className="hide-scrollbar flex h-screen w-full flex-col justify-start gap-5 bg-[#1c1c1e] px-3 py-4">
        <div className="flex w-full flex-row items-center justify-between">
          {status === 'success' && (
            <h3
              className="text-[20px] capitalize text-[#fff]"
              style={{ lineHeight: '32px' }}
            >
              Pick Alternate Movement
            </h3>
          )}
          <img
            src={'/assets/close_icon.svg'}
            alt="close"
            onClick={() => setShowSwapOptions(false)}
          />
        </div>
        {status === 'success' && (
          <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2">
            {equipments?.length > 0 &&
              equipments.map((equip) => (
                <div
                  key={equip === '' ? 'All' : equip}
                  className={`rounded-[6px] px-5 py-1.5 text-[10px] ${currentEquipment === equip ? 'bg-[#5ecc7b] text-black' : 'bg-black text-[#fff]'}`}
                  onClick={() => setCurrentEquipment(equip)}
                >
                  {equip === '' ? 'All' : equip}
                </div>
              ))}
          </div>
        )}
        {status === 'success' && !showDetail && (
          <div className="hide-scrollbar flex h-full w-full flex-col items-start justify-start gap-3 overflow-y-scroll">
            {movementsList?.map((movement) => {
              return (
                <MovementTile
                  key={movement?._id}
                  mvmt={movement}
                  setSelectedMovementInfo={setSelectedMovementInfo}
                />
              );
            })}
          </div>
        )}
        {(status === 'loading' || swapMovementSectionStatus === 'loading') && (
          <Loader
            className={'fixed left-0 top-0 z-[100] h-screen w-full bg-black'}
          />
        )}
        {status === 'error' && (
          <Error className={'mx-auto w-full'}>
            <h3 className="text-red">
              Oops! <br /> Could not fetch the list of movements
            </h3>
          </Error>
        )}
        {swapMovementSectionStatus === 'error' && (
          <Error
            className={
              'fixed left-0 top-0 z-[100] mx-auto h-screen w-full bg-black'
            }
          >
            <h3 className="text-red">
              Oops! <br /> Could not swap the movement
            </h3>
          </Error>
        )}
        {showAlertDialog && (
          <AlertDialog
            handleAlertDialog={handleAlertMessage}
            message={
              'Are you sure you want to swap your current movement with this one?'
            }
          />
        )}
        {showDetail && selectedMovementDetail && (
          <MovementDetail mvmt={selectedMovementDetail} />
        )}
      </div>
    )
  );
}

export default SwapMovementOptions;
