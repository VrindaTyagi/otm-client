import React, { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AfternoonCircleIcon,
  AlwaysActiveIcon,
  EveningCircleIcon,
  MorningCircleIcon,
  NightCircleIcon,
} from '../index.js';
import { formatDate, isIPhone } from '../utils.js';
import TaskItem from './taskitem.js';

const CircleTask = ({
  SelectedCircle,
  tasks,
  date,
  setShowCircleDetails,
  setReloadCounter,
  setIsCircleOpen,
}) => {
  tasks.map((task, index) => console.log('Task ID are' + task?.taskId));

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

  return (
    <div
      className="fixed left-0 top-0 z-50 h-screen w-full overflow-y-scroll rounded-lg bg-black p-2 text-white"
      style={{ paddingBottom: isIPhone() ? '100px' : '' }}
    >
      <div className="fixed top-0 z-[200]">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <div className="relative flex items-center bg-black p-4 text-white">
        {/* BackButton */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          onClick={() => {
            setShowCircleDetails(false);
            setReloadCounter(false);
            setIsCircleOpen(false);
          }}
        >
          <path
            d="M0 8.70206C0 9.03638 0.127827 9.32153 0.393314 9.57719L8.06293 17.0796C8.26942 17.296 8.54474 17.4041 8.85939 17.4041C9.49853 17.4041 10 16.9125 10 16.2635C10 15.9489 9.87217 15.6637 9.65585 15.4474L2.74336 8.70206L9.65585 1.95674C9.87217 1.73058 10 1.44543 10 1.13078C10 0.491642 9.49853 0 8.85939 0C8.54474 0 8.26942 0.108161 8.06293 0.324484L0.393314 7.82694C0.127827 8.0826 0.00983284 8.36775 0 8.70206Z"
            fill="#7E87EF"
          />
        </svg>
        {/* Date */}
        <div className="flex w-full justify-center">
          <span className="font-sfpro text-sm font-medium text-lightGray ">
            {formatDate(date)[0]}, {formatDate(date)[1]}
          </span>
        </div>
      </div>
      <div className="flex p-2">
        {circleIcons[SelectedCircle]}
        <h1 className="p-1 font-sfpro text-[26px] font-medium capitalize leading-normal text-white">
          {SelectedCircle}
        </h1>
      </div>

      <div className="p-2">
        {tasks.map((task, index) => (
          <>
            {task.taskId && task.name && (
              <TaskItem
                key={task?.taskId}
                task={task}
                SelectedCircle={SelectedCircle}
                index={index}
                date={date}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default CircleTask;
