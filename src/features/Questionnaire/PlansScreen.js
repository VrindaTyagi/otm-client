import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../../utils';
import JourneyScreen from './JourneyScreen';
import ProgramDetailScreen from './ProgramDetailScreen';

const ultimateShredSection = [
  { heading: 'Muscle', totalLevel: 4, givenLevel: 3 },
  { heading: 'Cardio', totalLevel: 4, givenLevel: 1 },
];

const PlansScreen = ({ setShowPlansScreen }) => {
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const [workoutLevel, setWorkoutLevel] = useState('beginner');
  const [program, setProgram] = useState(null);
  const [journeyScreen, setJourneyScreen] = useState(false);
  const firstName = fullName.split(' ')[0];
  const userProfilePicture = JSON.parse(
    localStorage?.getItem('profilePicture'),
  );
  const caiptalInitial = capitalizeFirstLetter(fullName);

  console.log(journeyScreen);

  const handleClick = () => {
    if (!journeyScreen) {
      setJourneyScreen(true);
    }

    if (journeyScreen) {
      setJourneyScreen(false);
      setProgram(null);
      setShowPlansScreen(false);
    }
  };

  return (
    <div className="relative left-0 top-0  h-screen w-screen    ">
      {program === null && !journeyScreen && (
        <div className="relative z-20 px-3 pt-[40px]">
          <div className="flex justify-between">
            <div className="font-sfpro text-[32px] text-offwhite">
              Hello, {firstName}
            </div>
            <div className=" flex justify-end ">
              {' '}
              <div className="h-[53px] min-w-[53px]">
                {' '}
                {userProfilePicture ? (
                  <img
                    loading="lazy"
                    src={userProfilePicture}
                    alt="img"
                    className="h-[53px] w-[53px] rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-[53px] w-[53px] items-center justify-center rounded-xl bg-black-opacity-45 text-3xl text-white">
                    {caiptalInitial}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-white-opacity-50">
            Please select a plan to continue
          </div>
          <div></div>
          <h5 className="mt-9 text-[20px] text-offwhite">Featured Plans</h5>

          <div className="mt-3 flex flex-col gap-3">
            <div
              onClick={() => setProgram('ultimateStrength')}
              className="relative rounded-xl bg-black-opacity-45 px-4 pb-3 pt-[23px]"
            >
              <img
                src="/assets/muscle-star.svg"
                className="h-[135px w-[135px]] absolute right-0 top-2"
              />

              <div className="flex gap-2">
                <img src="/assets/muscle-star-color.svg" className="" />
                <div className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text font-futura text-2xl text-transparent">
                  ULTIMATE SHRED
                </div>
              </div>

              <div className="mt-[9px] w-full font-sfpro text-sm font-medium text-white-opacity-50">
                the ultimate fat cut program
              </div>

              <div className="mt-[15px] flex flex-col gap-3">
                {ultimateShredSection.map((item) => (
                  <div className="flex items-center gap-3">
                    <div className="w-[53px] text-sm text-offwhite">
                      {item.heading}
                    </div>
                    <div className="flex gap-3">
                      {Array(4)
                        .fill(0)
                        .map((level, index) => (
                          <div
                            className={`if   h-[7px] w-[54px] rounded-3xl ${
                              index < item.givenLevel
                                ? 'bg-green'
                                : ' bg-white-opacity-50 '
                            } `}
                          ></div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              onClick={() => setProgram('evolve')}
              className="relative rounded-xl bg-black-opacity-45 px-[23px] pb-3 pt-2 "
            >
              <img
                src="/assets/v-sign.svg"
                className=" absolute right-2 top-0"
              />
              <div>
                <img src="/assets/evolve-white.svg" className="" />
                <div className="mt-[8px] w-full font-sfpro text-sm font-medium text-white-opacity-50">
                  Strength-focused for muscle growth
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!journeyScreen && program !== null && (
        <ProgramDetailScreen
          program={program}
          setWorkoutLevel={setWorkoutLevel}
          workoutLevel={workoutLevel}
        />
      )}
      {journeyScreen && <JourneyScreen />}
      {(journeyScreen || program) && (
        <div className="absolute bottom-0 left-0 z-30 mb-5 w-full px-3">
          <button
            onClick={() => handleClick(true)}
            className={`  h-[54px] w-full rounded-lg text-center  capitalize text-black ${
              !journeyScreen
                ? '  bg-gradient-to-r from-lightPurple to-blue px-[18px] '
                : 'bg-white'
            }`}
          >
            {!journeyScreen ? `Start ${program} Plan` : 'Get Started'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PlansScreen;
