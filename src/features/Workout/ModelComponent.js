import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DataInputComponent from './DataInputComponent';
import { setLoading, updateWorkout } from './WorkoutSlice';

const WORKOUT_BASE_THEME_OPTIONS = [
  'Horizontal Push',
  'Horizontal Pull',
  'Squat',
  'Vertical Push',
  'Posterior Chain',
];

const EQUIPMENT_OPTIONS = ['At gym (full equipment)', 'At home (bands & dumbbell)'];

const WORKOUT_DURATION_OPTIONS = ['Regular', 'Shorter'];

Modal.setAppElement('#root'); // Set the root element for screen readers

const ModelComponent = () => {
  const { workout } = useSelector((store) => store.workoutReducer);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const WORKOUT_THEME_OPTIONS= WORKOUT_BASE_THEME_OPTIONS.filter(theme => theme != workout.theme)
  WORKOUT_THEME_OPTIONS.unshift(workout.theme)

  const handleUpdateWorkout = () => {
    try {
      setIsModalOpen(false);
      dispatch(setLoading());
      dispatch(updateWorkout());
    } catch (error) {
      // Handle errors if needed
      console.error('Error updating workout:', error);
    }
  };

  return (
    <>
      <button
        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-white bg-[#050505]"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="text-lg">Customize Workout</p>
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Customize Your Workout Modal"
        className="h-screen w-screen flex-shrink-0 bg-[#141414] p-4"
      >
        <span
          onClick={() => setIsModalOpen(false)}
          className="close-button relative left-[90%] top-2 mr-2 mt-2 cursor-pointer rounded-full p-2"
        >
          X
        </span>
        <div className="flex h-screen flex-col justify-around">
          <h3 className="workout-gradient-text text-center text-xl uppercase">
            Customize your workout
          </h3>

          <section>
            <DataInputComponent
              inputId="customTheme"
              inputType="select"
              inputOptions={WORKOUT_THEME_OPTIONS}
              placeholder="select"
              label="THEME"
              twClasses="block w-full px-4 py-2 border border-gray-300 bg-transparent focus:outline-none rounded-lg border-[1px] border-[solid] border-[#2A2A2A] gap-[8px]"
            />
            <DataInputComponent
              inputId="customEquipments"
              inputType="select"
              inputOptions={EQUIPMENT_OPTIONS}
              placeholder="Choose equipment"
              label="EQUIPMENT (OPTIONAL)"
              twClasses="block w-full px-4 py-2 border border-gray-300 bg-transparent focus:outline-none rounded-lg border-[1px] border-[solid] border-[#2A2A2A] gap-[8px]"
            />
            <DataInputComponent
              inputId="customDuration"
              inputType="select"
              inputOptions={WORKOUT_DURATION_OPTIONS}
              placeholder="REGULAR"
              label="WORKOUT DURATION"
              twClasses="block w-full px-4 py-2 border border-gray-300 bg-transparent focus:outline-none rounded-lg border border-[#2A2A2A] gap-[8px]"
            />
          </section>
          <button
            className="metallic-gradient h-11 w-full  items-center justify-center rounded-xl border border-[rgba(209,209,209,0.70)] text-xl text-black"
            onClick={() => handleUpdateWorkout()}
          >
            Update
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ModelComponent;