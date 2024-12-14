// src/components/WeeklyCheckInSuccessPopup.js
import React from 'react';
import { IoMdClose } from 'react-icons/io'; // Make sure to install react-icons if you haven't already
import { Link } from 'react-router-dom';

const WeeklyCheckInSuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative w-full max-w-md rounded-md bg-gradient-to-b from-gradientStart to-gradientEnd p-6 shadow-lg">
        <button
          onClick={onClose}
          className="hover:text-gray-700 absolute right-2 top-2 text-black"
        >
          <IoMdClose size={24} />
        </button>
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="anton-black mb-4 text-lg sm:text-xl md:text-2xl">
            Weekly Check-In Recorded
          </h2>
          <p className="mb-6 max-w-[280px] font-sfpro text-xs leading-tight text-black sm:text-sm">
            This Week's Weekly CheckIn Successfully Recorded
          </p>
          <Link
            to="/home"
            onClick={onClose}
            className="whitespace-nowrap rounded-full bg-black px-6 py-3 font-sfpro text-sm font-semibold text-white transition duration-300 hover:bg-opacity-90"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCheckInSuccessPopup;
