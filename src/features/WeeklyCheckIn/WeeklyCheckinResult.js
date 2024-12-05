import React, { useRef } from 'react';
import { FaHome } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../Profile/apiProfileClient';
import { capitalizeFirstLetter } from '../../utils';
import WeightLineChart from './Component/Chart';
import domtoimage from 'dom-to-image';
import { GiNightSleep } from 'react-icons/gi';
import { IoIosNutrition } from 'react-icons/io';
import { MdArrowDropDown } from 'react-icons/md';
import { MdArrowDropUp } from 'react-icons/md';
import ShareWeeklyCheckinScreen from './ShareWeeklyCheckinScreen';
import { Loader } from '../../components';

const WeeklyCheckinResult = ({ setScreen, week, weeklyReport }) => {
  const navigate = useNavigate();
  const userProfilePicture = JSON.parse(
    localStorage?.getItem('profilePicture'),
  );
  const name = JSON.parse(localStorage.getItem('user'))['name'];

  const summaryRef = useRef(null);

  function reverseArray(arr) {
    // Create a copy of the array to avoid modifying the original
    const reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    return reversed;
  }

  function convertToWeekFormat(input) {
    // Ensure the input is a string
    if (typeof input !== 'string') {
      console.error('Input must be a string');
      return 'Invalid Date Format';
    }

    // Match the pattern to extract the parts (handles single-digit dates too)
    const regex = /^(\d{1,2}[A-Za-z]+)-(\d{1,2}[A-Za-z]+)-(\d{4})$/;
    const match = input.match(regex);

    if (!match) {
      console.error(
        "Input format is incorrect. Expected format: 'DDMMM-DDMMM-YYYY'. Received:",
        input,
      );
      return 'Invalid Date Format';
    }

    const [_, start, end, year] = match;

    // Extract day and month for the start and end
    const startDay = start.match(/^\d+/)?.[0]; // Extract digits
    const startMonth = start.match(/[A-Za-z]+$/)?.[0]; // Extract letters

    const endDay = end.match(/^\d+/)?.[0]; // Extract digits
    const endMonth = end.match(/[A-Za-z]+$/)?.[0]; // Extract letters

    if (!startDay || !startMonth || !endDay || !endMonth) {
      console.error('Unable to parse start or end date from input:', input);
      return 'Invalid Date Format';
    }

    // Combine into the desired format
    return `Week ${startDay}-${endDay} ${startMonth}`;
  }

  function formatToK(number) {
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return `${number}`;
  }

  const weightLiftedComapre = () => {
    const report = weeklyReport?.last8WeekWeightLifted;
    const latest = report?.[0]?.totalWeightLifted;
    const secondLatest = report?.[1]?.totalWeightLifted;
    return latest - secondLatest;
  };
  const numbersColor = [
    //Give UI to our stress /nutrition etc levels.
    {
      bg: 'bg-[rgba(250,87,87,0.20)]',
      text: 'text-[#FA5757]',
    },
    {
      bg: 'bg-[rgba(206,138,71,0.20)]',
      text: 'text-[#CE8A47]',
    },
    {
      bg: 'bg-[rgba(245,197,99,0.20)]',
      text: 'text-[#F5C563]',
    },
    {
      bg: 'bg-[rgba(148,176,48,0.08)]',
      text: 'text-[#94B030]',
    },
    {
      bg: 'bg-[rgba(94,204,123,0.20)]',
      text: 'text-[#5ECC7B]',
    },
  ];

  const captureAndShareToWhatsApp = async () => {
    //function to take screenshot of our result screen and later share it.
    if (summaryRef.current) {
      try {
        // Capture screenshot
        const dataUrl = await domtoimage.toPng(summaryRef.current);

        // Create share text
        const shareText = `  Check out my weekly checkin report!`;

        // Check if Web Share API is supported
        if (navigator.share) {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'workout-summary.png', {
            type: 'image/png',
          });

          await navigator.share({
            text: shareText,
            files: [file],
          });
        } else {
          // Fallback for desktop browsers
          const encodedText = encodeURIComponent(shareText);
          const whatsappUrl = `https://web.whatsapp.com/send?text=${encodedText}`;
          window.open(whatsappUrl, '_blank');
        }

        // console.log('summary share tracking initiated');
        // mixpanel.track('Workout Summary Shared', {
        //   device_type: getDeviceType(),
        // });
      } catch (error) {
        console.error('Error capturing or sharing screenshot:', error);
      }
    }
  };

  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];

  const caiptalInitial = capitalizeFirstLetter(fullName);

  async function getMemberData(code) {
    try {
      const res = await axiosClient.get(`/profile`, {
        params: { code: code },
      });
      if (res.data.profilePicture) {
        localStorage.setItem(
          'profilePicture',
          JSON.stringify(res.data.profilePicture),
        );
      } else {
        localStorage.setItem('profilePicture', JSON.stringify(''));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  if (!userProfilePicture && userProfilePicture !== '') {
    getMemberData(code);
  }
  if (!weeklyReport) {
    return <Loader />;
  }

  return <div></div>;
};

export default WeeklyCheckinResult;
