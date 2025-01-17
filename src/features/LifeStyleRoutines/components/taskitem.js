import axios from 'axios';
import mixpanel from 'mixpanel-browser';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toggleCompletion } from '../ReduxStore/actions';
import { getFormattedDate } from '../utils';
import TaskDetail from './TaskDetail';

function TaskItem({ task, SelectedCircle, date }) {
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const formattedDate = getFormattedDate();
  const finalDate = date === null || date === undefined ? formattedDate : date;

  const dispatch = useDispatch();
  const isCompleted = useSelector((state) => {
    const circle = state?.lifeStyleDetails?.circles.find(
      (circle) => circle?.name === SelectedCircle,
    );
    if (circle) {
      const mytask = circle?.tasks.find(
        (mappedTask) => mappedTask.taskId === task?.taskId,
      );
      return mytask ? task?.completed : false;
    }
    return false;
  });

  // [Monarch]testing for mealinfo implementation

  useEffect(() => {
    if (isCompleted) {
      console.log('current state in redux is: ', isCompleted);
    }
  }, [isCompleted]);

  // function for Mark as Done
  function handleMarkDone(event) {
    event.stopPropagation(); // Stop propagation to prevent opening the next page
    setTaskCompleted(true);
    dispatch(toggleCompletion(SelectedCircle, task?.taskId));

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/v1/lifestyle`, {
        user: JSON.parse(localStorage.getItem('user'))['code'],
        date: finalDate,
        taskId: task?.taskId,
        events: [
          {
            type: 'completed',
            input: task?.completed === undefined ? true : !task?.completed,
          },
        ],
      })
      .then((res) => {
        console.log('API response:', res);

        try {
          const isCompleted =
            task?.completed === undefined ? true : !task?.completed;
          mixpanel.track('LD item checked', { completed: isCompleted });
          console.log(isCompleted, 'Task completion status sent to Mixpanel');
        } catch (mixpanelError) {
          console.error('Error in Mixpanel tracking:', mixpanelError);
          toast.error('Mixpanel tracking failed');
        }
      })
      .catch((err) => {
        setTaskCompleted(false); // Revert completion if there's an error
        dispatch(toggleCompletion(SelectedCircle, task?.taskId));
        toast.error('Something went wrong');
        console.error('Error in API request:', err);
      });
  }
  return (
    <>
      {!showTaskDetail && (
        <div
          className="my-2 flex items-center rounded-xl bg-mediumGray px-5 py-4"
          onClick={() => {
            setShowTaskDetail(true);
          }}
        >
          {/* <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full text-2xl">
                {task.icon}
            </div> */}
          <div className="ml-4 flex-1">
            {/* <h3 className="text-custompurple font-sfpro text-base font-semibold ">{task.time}</h3> */}
            <p className="font-sfpro text-[18.5px] font-medium capitalize text-white">
              {task.name}
            </p>
          </div>
          <div className="text-2xl">
            {task?.completed || isCompleted ? (
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(event) => {
                  handleMarkDone(event);
                }}
              >
                <circle
                  cx="17"
                  cy="17"
                  r="15.5"
                  fill="#282828"
                  stroke="#7E87EF"
                  stroke-width="2"
                />
                <circle cx="17" cy="17" r="10.5" fill="#5ECC7B" />
              </svg>
            ) : (
              // <img src={'./assets/task-left.svg'} alt="" />
              <svg
                width="33"
                height="34"
                viewBox="0 0 33 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(event) => {
                  handleMarkDone(event);
                }}
              >
                <circle
                  id="Ellipse 1776"
                  cx="16.5"
                  cy="17"
                  r="15.5"
                  stroke="#3D3D3D"
                  stroke-width="2"
                />
              </svg>
            )}
          </div>
        </div>
      )}
      {showTaskDetail && (
        <TaskDetail
          SelectedCircle={SelectedCircle}
          task={task}
          setShowTaskDetail={setShowTaskDetail}
          taskCompleted={taskCompleted}
          setTaskCompleted={setTaskCompleted}
          date={date}
        />
      )}
    </>
  );
}

export default TaskItem;
