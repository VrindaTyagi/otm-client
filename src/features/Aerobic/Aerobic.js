import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import Duration from '../../components/Duration';
import AerobicHeading from './AerobicHeading';
import AerobicInitialTile from './AerobicInitialTile';
import AerobicInstructions from './AerobicInstructions';
import AerobicEquipment from './AerobicEquipment';

const Aerobic = () => {
  const navigate = useNavigate();
  const [aerobicDetail, setAerobicDetail] = useState(null);
  const [selectWorkoutId, setSelectWotkoutId] = useState(null);
  const [equipmentSelected, setEquipmentSelected] = useState(null);
  const [logScreen, setLogScreen] = useState(false);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(null);
  const code = JSON.parse(localStorage.getItem('user'))['code'];

  const IMAGE_URL = [
    './assets/aerobic-cardio.svg ',
    './assets/aerobic-skipping.svg ',
    './assets/aerobic-run.svg ',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDistance((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBackButton = () => {
    if (selectWorkoutId === null) {
      navigate('/home');
    }
    if (selectWorkoutId !== null) {
      setSelectWotkoutId(null);
    }
  };

  function getSubstringUntilSec(input) {
    if (input.includes('Max effort')) {
      const secIndex = input.lastIndexOf('sec');
      if (secIndex !== -1) {
        return input.slice(0, secIndex + 3); // +3 to include "sec" in the substring
      }
    }
    return input; // Return the original string if "Max effort" is not present or "sec" is not found
  }

  const handleAerobicPost = () => {
    try {
      const res = axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/workout/aerobic/score`,
        {
          memberCode: code,
          version: selectWorkoutId,
          duration: duration,
          calorie: calories,
          distance: Number(distance),
        },
      );
      if (res.data) {
        console.log('ress', res.data);
        setAerobicDetail(res.data);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      navigate('/home');
    }
  };

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/workout/aerobic`,
        );
        if (res.data) {
          console.log('ress', res.data);
          setAerobicDetail(res.data);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
      }
    }
    getUserData();
  }, []);

  return (
    <div className="bg-screenBackgroundColor relative h-screen overflow-y-scroll">
      <div className=" absolute left-3 top-3 z-40 flex h-[37px] w-[37px] items-center justify-center rounded-full bg-black-opacity-45 ">
        <FaArrowLeftLong onClick={() => handleBackButton()} />
      </div>

      <img
        src="./assets/aerobic-background.png "
        className="absolute z-10 h-[45%] w-full object-cover "
      />

      <AerobicHeading
        aerobicDetail={aerobicDetail}
        selectWorkoutId={selectWorkoutId}
      />

      {/* <img
        src="./assets/aerobic-gradient.svg "
        className="absolute right-0 top-0 z-20 h-screen w-full saturate-200  "
      /> */}
      {selectWorkoutId === null && (
        <AerobicInitialTile
          IMAGE_URL={IMAGE_URL}
          setSelectWotkoutId={setSelectWotkoutId}
          aerobicDetail={aerobicDetail}
          getSubstringUntilSec={getSubstringUntilSec}
        />
      )}
      {logScreen === false &&
        selectWorkoutId &&
        aerobicDetail?.msg?.workoutsDetails.map((item, index) => {
          if (item?.id === selectWorkoutId) {
            return (
              <div className="aerobic-gradient-opposite from-2% square relative top-0 z-30 flex  flex-col overflow-y-scroll  ">
                <AerobicInstructions
                  IMAGE_URL={IMAGE_URL}
                  getSubstringUntilSec={getSubstringUntilSec}
                  item={item}
                  index={index}
                />
                <AerobicEquipment
                  aerobicDetail={aerobicDetail}
                  equipmentSelected={equipmentSelected}
                  setEquipmentSelected={setEquipmentSelected}
                />

                <div className="mt-10 px-4 pb-10">
                  {equipmentSelected === null && (
                    <div className="text-xs text-red">
                      * Please select an equipment first
                    </div>
                  )}

                  <div
                    onClick={
                      equipmentSelected !== null
                        ? () => setLogScreen(true)
                        : undefined
                    }
                    style={{
                      backgroundColor:
                        equipmentSelected !== null
                          ? '#F8F8F8'
                          : 'rgba(221,221,221,0.08)',
                      color:
                        equipmentSelected !== null
                          ? 'rgba(0,0,0)'
                          : 'rgba(248,248,248,0.8)',
                      cursor:
                        equipmentSelected !== null ? 'pointer' : 'not-allowed',
                    }}
                    className="relative mt-1 flex h-[46px] w-full items-center justify-center gap-1 rounded-lg p-1 font-sfpro text-lg leading-8 text-black backdrop-blur-md"
                  >
                    Log Session Details
                  </div>
                </div>
              </div>
            );
          } else return null;
        })}

      {logScreen === true && (
        <div className="absolute top-0 z-[120] h-screen w-full  backdrop-blur-sm">
          <div className="absolute bottom-0 z-[100] flex h-[65%] w-screen flex-col justify-between overflow-y-scroll rounded-t-3xl bg-black px-[25px] py-[28px]">
            {' '}
            <div>
              <div className=" mb-[40px] flex justify-between">
                <h3 className="font-sfpro text-xl text-offwhite">
                  Log Your Session Details
                </h3>
                <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-mediumGray ">
                  <RxCross1 onClick={() => setLogScreen(false)} className="" />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Duration setDuration={setDuration} />
                <div>
                  <h3 className="font-sfpro text-[16px] text-offwhite">
                    Distance
                  </h3>
                  <div className="border-b-white-opacity-20 mt-[14px] flex h-[40px] items-center   gap-5  rounded-t-md border-b ">
                    <div className="flex w-full gap-2">
                      <input
                        type="number"
                        name="km"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="(e.g, 5)"
                        min="0"
                        className="w-full rounded-sm bg-black text-offwhite placeholder:text-sm"
                      />

                      <div className="w-min pt-[2px] text-center text-sm text-custompurple">
                        Km
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-sfpro text-[16px] text-offwhite">
                    Calories Burn
                  </h3>
                  <div className=" border-b-white-opacity-20 mt-[20px] flex h-[40px] border-b">
                    <input
                      type="number"
                      name="m"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="(e.g, 255)"
                      min="0"
                      max="999"
                      className="w-full rounded-sm bg-black text-offwhite placeholder:text-sm"
                    />
                    <div className="flex items-center pt-[2px] text-sm text-custompurple">
                      KCAL
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 pb-20 ">
              <div
                onClick={() => handleAerobicPost()}
                style={{
                  backgroundColor: '#F8F8F8',
                  color: 'rgba(0,0,0)',
                }}
                className="  flex h-[46px] w-full items-center justify-center gap-1 rounded-lg p-1 font-sfpro text-lg leading-8 text-black backdrop-blur-md"
              >
                Done
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aerobic;
