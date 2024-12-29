import React from 'react';
import styled from 'styled-components';

const StarterText = styled.div`
  color: var(--New-White, rgba(222.37, 222.37, 222.37, 0.5));
  /* H1 */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: ${(props) =>
    props.fontSize !== undefined ? props.fontSize : '14px'};
  font-style: normal;

  line-height: 16px; /* 125% */
`;

const prgramDetails = [
  {
    id: 'ultimateStrength',
    heading: 'ULTIMATE SHRED',
    img: '/assets/muscle-star.svg',
    description: 'Strength-focused for muscle growth',
    workouts: [
      {
        rounds: '3-4',
        roundsDescription: 'x Strength Training',
      },
      {
        rounds: '0-1',
        roundsDescription: 'x Aerobic Session',
      },
    ],
    levels: [
      {
        id: 'beginner',
        heading: 'Beginner',
        weeklyStructure: [
          {
            rounds: '3x',
            duration: '30 Min',
            description: 'strength training sessions',
          },
          {
            rounds: '1x',
            duration: '30 Min',
            description: 'aerobic sessions',
          },
        ],
      },
      {
        id: 'intermediate',
        heading: 'Intermediate',
        weeklyStructure: [
          {
            rounds: '3x',
            duration: '30 Min',
            description: 'strength training sessions',
          },
          {
            rounds: '1x',
            duration: '30 Min',
            description: 'aerobic sessions',
          },
        ],
      },
      {
        id: 'advance',
        heading: 'Advance',
        weeklyStructure: [
          {
            rounds: '3x',
            duration: '30 Min',
            description: 'strength training sessions',
          },
          {
            rounds: '1x',
            duration: '30 Min',
            description: 'aerobic sessions',
          },
        ],
      },
    ],
  },
  {
    id: 'evolve',
    heading: 'EVOLVE',
    img: '/assets/muscle-star.svg',
    description: 'Strength-focused for muscle growth',
    workouts: [
      {
        rounds: '3-4',
        roundsDescription: 'x Strength Training',
      },
      {
        rounds: '0-1',
        roundsDescription: 'x Aerobic Session',
      },
    ],
    levels: [
      {
        id: 'beginner',
        heading: 'Beginner',
        weeklyStructure: [
          {
            rounds: '3x',
            duration: '30 Min',
            description: 'strength training sessions',
          },
          {
            rounds: '1x',
            duration: '30 Min',
            description: 'aerobic sessions',
          },
        ],
      },
      {
        id: 'intermediate',
        heading: 'Intermediate',
        weeklyStructure: [
          {
            rounds: '3x',
            duration: '30 Min',
            description: 'strength training sessions',
          },
          {
            rounds: '1x',
            duration: '30 Min',
            description: 'aerobic sessions',
          },
        ],
      },
      {
        id: 'advance',
        heading: 'Advance',
        weeklyStructure: [
          {
            rounds: '3x',
            duration: '30 Min',
            description: 'strength training sessions',
          },
          {
            rounds: '1x',
            duration: '30 Min',
            description: 'aerobic sessions',
          },
        ],
      },
    ],
  },
];

const ProgramDetailScreen = ({ program, setWorkoutLevel, workoutLevel }) => {
  console.log(workoutLevel);

  return (
    <div className="relative z-20 h-screen overflow-y-scroll px-4 pb-[100px] pt-[80px]">
      <h5 className="px-4 font-sfpro text-sm font-medium text-white-opacity-50">
        Program details
      </h5>
      {prgramDetails.map((item) => {
        if (item.id === program) {
          return (
            <div className="flex flex-col gap-4">
              {' '}
              <div className="relative rounded-xl bg-gradient-to-r from-lightPurple to-blue px-[18px]  pb-[24px] pt-[10px]">
                <img
                  src="/assets/muscle-transparent.svg"
                  className="absolute bottom-4 right-0 "
                />
                <div className="flex w-full justify-center gap-2">
                  <img src="/assets/muscle-star-black.svg" className="" />
                  <div className=" font-futura text-2xl text-black">
                    {item.heading}
                  </div>
                </div>

                <div className="mt-[25px] pr-[133px] font-sfpro text-sm text-black">
                  {item.description}
                </div>
                <div className="mt-[6px] flex w-fit gap-1 rounded-[4px] bg-black-opacity-45 px-1">
                  <img src="/assets/calender-white.svg" />
                  <div className=" font-sfpro text-sm font-light text-white">
                    week includes
                  </div>
                </div>

                <div className="mt-4">
                  {item.workouts.map((workout) => (
                    <div className="flex gap-2">
                      <div className="font-futura text-[21px] leading-6 text-black">
                        {' '}
                        {workout.rounds}
                      </div>
                      <div className=" text-sm text-black ">
                        {' '}
                        {workout.roundsDescription}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between gap-2 overflow-x-scroll">
                {item.levels.map((level) => (
                  <div
                    onClick={() => setWorkoutLevel(level.id)}
                    className={`relative z-30 grow rounded-md bg-black-opacity-45 px-[17px] py-[11px] text-center ${
                      level.id === workoutLevel &&
                      'border border-blue text-blue'
                    }`}
                  >
                    {level.heading}
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-black-opacity-45 px-4 py-[10px]">
                <div className=" font-sfpro text-sm text-white">
                  Weekly Structure
                </div>

                <div className="mt-4">
                  {item.levels.map((level) => {
                    if (level.id === workoutLevel) {
                      return (
                        <div className="flex flex-col gap-2">
                          {level.weeklyStructure.map((structure) => (
                            <div className="flex gap-2">
                              <div
                                style={{
                                  border: '0.5px solid rgba(221,249,136,0.4)',
                                }}
                                className=" flex w-fit rounded-md border border-floYellow bg-dark-green-opacity-66  px-1 font-sfpro text-[12px] text-floYellow"
                              >
                                {structure.rounds}
                                <div className="flex w-[16px] items-center">
                                  <img
                                    src="/assets/yellowTimer.svg"
                                    className="mx-[2px]"
                                    alt="img"
                                  />
                                </div>

                                {structure.duration}
                              </div>
                              <div className="text-offWhite-opacity-1 font-sfpro text-sm ">
                                {structure.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    } else return null;
                  })}
                </div>
              </div>
              <div>
                <div className="w-full rounded-xl bg-black-opacity-45 p-[40px]">
                  <div className="flex flex-col items-center ">
                    <div className="flex w-full ">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6 "
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        <span className="text-offwhite">Rishi Solanki</span> to
                        guide you every step of the way
                      </StarterText>
                    </div>

                    <div className="flex w-full ">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6"
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        Your{' '}
                        <span className="text-offwhite">
                          weekly workout schedule
                        </span>{' '}
                        to meet your goals
                      </StarterText>
                    </div>

                    <div className="flex w-full ">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6"
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        <span className="text-offwhite">
                          Custom made meal planning
                        </span>{' '}
                        suited to your taste
                      </StarterText>
                    </div>
                    <div className="flex w-full ">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6"
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        <span className="text-offwhite">
                          A personalised lifestyle design that works
                        </span>{' '}
                      </StarterText>
                    </div>

                    <div className="flex w-full">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6"
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        <span className="text-offwhite">
                          An accountability coach
                        </span>{' '}
                        to full proof your success
                      </StarterText>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else return null;
      })}
    </div>
  );
};

export default ProgramDetailScreen;
