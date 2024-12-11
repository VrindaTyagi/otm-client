import React, { useEffect, useMemo, useState } from 'react';
import {
  AfternoonCircleIcon,
  AlwaysActiveIcon,
  EveningCircleIcon,
  Mood1Icon,
  Mood2Icon,
  Mood3Icon,
  Mood4Icon,
  Mood5Icon,
  MorningCircleIcon,
  NightCircleIcon,
} from '../index';
// Import react-circular-progressbar module and styles
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatDate, getColor, isIPhone } from '../utils';
import CrossIcon from './icons/CrossIcon';

function CircleSummary({
  circleName,
  circleTasks,
  completionPercentage,
  setShowSummary,
  date,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0); // default is completed
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);

  const circleIcons = useMemo(
    () => ({
      'Morning Circle': <MorningCircleIcon />,
      'Afternoon Circle': <AfternoonCircleIcon />,
      'Evening Circle': <EveningCircleIcon />,
      'Night Circle': <NightCircleIcon />,
      'Always Active Circle': <AlwaysActiveIcon />,
    }),
    [],
  );

  const moodIcons = useMemo(
    () => ({
      1: <Mood1Icon />,
      2: <Mood2Icon />,
      3: <Mood3Icon />,
      4: <Mood4Icon />,
      5: <Mood5Icon />,
    }),
    [],
  );

  const colors = useMemo(
    () => [
      { threshold: 25, color: '#e74c3c' },
      { threshold: 50, color: '#F5C563' },
      { threshold: 75, color: '#7E87EF' },
      { threshold: 100, color: '#5ECC7B' },
    ],
    [],
  );

  const color = getColor(colors, completionPercentage);

  useEffect(() => {
    setCompletedTasks(circleTasks.filter((task) => task?.completed === true));
    setIncompletedTasks(circleTasks.filter((task) => task?.completed !== true));
  }, [circleTasks]);

  const hasAnyIconInCompletedTasks = useMemo(() => {
    return completedTasks.some((task) => task?.mood);
  }, [completedTasks]);
  const hasAnyIconInIncompletedTasks = useMemo(() => {
    return incompletedTasks.some((task) => task?.mood);
  }, [incompletedTasks]);

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-full overflow-y-scroll bg-[#1c1c1e]">
      <div className="flex w-full flex-col items-start justify-start">
        <div className="w-full bg-[#17171a] px-3 py-5">
          <div className="flex w-full flex-row items-center justify-center py-4">
            <h5 className="text-[#929292]">
              Summary, {formatDate(date)[0]} {formatDate(date)[1]}
            </h5>
            <div
              className="absolute right-3 top-2"
              onClick={() => setShowSummary(false)}
            >
              <CrossIcon />
            </div>
          </div>
          <div className="mb-2 mt-7 flex w-full flex-row items-center justify-between">
            <div className="flex w-fit flex-row items-center justify-center gap-2">
              {circleIcons[circleName]}
              <h3 className="text-[26px] capitalize text-[#f8f8f8]">
                {circleName}
              </h3>
            </div>
            <div className="relative top-[8px]">
              <CircularProgressbar
                value={completionPercentage}
                circleRatio={0.5}
                strokeWidth={14}
                styles={buildStyles({
                  rotation: 0.75,
                  strokeLinecap: 'round',
                  trailColor: '#ffffff1f',
                  pathColor: color,
                  pathTransitionDuration: 0.5,
                })}
                className="h-[81px] w-full"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-start gap-5">
            <div
              className={`box-border flex w-fit flex-col items-center justify-center gap-2 rounded-b-[3px] text-[14px] ${selectedIndex === 0 ? 'border-b-[3px] border-[#5ecc7b] text-[#5ecc7b]' : ' text-[#929292]'}`}
              onClick={() => setSelectedIndex(0)}
            >
              Complete
            </div>
            <div
              className={`box-border flex w-fit flex-col items-center justify-center gap-2 rounded-b-[3px] text-[14px] ${selectedIndex === 1 ? 'border-b-[3px] border-[#fa5757] text-[#fa5757]' : 'text-[#929292]'}`}
              onClick={() => setSelectedIndex(1)}
            >
              Incomplete
            </div>
          </div>
        </div>
        <div
          className="flex w-full flex-col items-start justify-start gap-5 px-5 py-5"
          style={{ paddingBottom: isIPhone() ? '100px' : '' }}
        >
          {selectedIndex === 0 ? (
            completedTasks === null || completedTasks?.length === 0 ? (
              <div className="text-[18.5px] text-[#929292]">No Tasks</div>
            ) : (
              completedTasks.map((task, index) => (
                <div
                  className="flex w-full flex-row items-center justify-start gap-4"
                  key={index}
                >
                  {hasAnyIconInCompletedTasks && (
                    <div>
                      {task?.mood ? (
                        moodIcons[task.mood]
                      ) : (
                        <div style={{ width: '36px', height: '36px' }}></div>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col items-start justify-center">
                    <h3 className="text-[18.5px] capitalize text-[#f8f8f8]">
                      {task?.name}
                    </h3>
                    <p className="text-[12px] text-[#545454]">
                      {task?.feedback}
                    </p>
                  </div>
                </div>
              ))
            )
          ) : incompletedTasks === null || incompletedTasks?.length === 0 ? (
            <div className="text-[18.5px] text-[#929292]">No Tasks</div>
          ) : (
            incompletedTasks.map((task, index) => (
              <div
                className="flex w-full flex-row items-center justify-start gap-4"
                key={index}
              >
                {hasAnyIconInIncompletedTasks && (
                  <div>
                    {task?.mood ? (
                      moodIcons[task.mood]
                    ) : (
                      <div style={{ width: '36px', height: '36px' }}></div>
                    )}
                  </div>
                )}
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-[18.5px] capitalize text-[#929292]">
                    {task?.name}
                  </h3>
                  <p className="text-[12px] text-[#545454]">{task?.feedback}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CircleSummary;
