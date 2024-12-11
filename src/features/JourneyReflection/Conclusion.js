import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

const Conclusion = ({ apiData }) => {
  const handleClick = () => {
    window.open(
      'https://lx7tw3786s6.typeform.com/to/ik4t8g1r?typeform-source=www.google.com',
      '_blank',
    );
  };
  const nameParts = apiData?.data?.name.split(' ');
  const firstName = nameParts?.[0];
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 px-4 sm:gap-10 sm:px-16">
        <h3 className="font-sf-pro text-left text-base sm:text-center sm:text-xl">
          By following this future plan and addressing those areas for
          improvement, you'll be unstoppable on your quest for ultimate fitness
          glory! Get ready to conquer new heights and{' '}
          <span className="text-[#7E87EF]">
            have an absolute blast along the way, {firstName}
          </span>{' '}
          !
        </h3>
        <h3 className="font-sf-pro text-left text-base sm:text-center sm:text-xl">
          Take our <span className="italic">2 mins</span> Survey to personalize
          your program and unlock even better results.
          <span className="text-[#7E87EF]">
            Your feedback helps us keep you crushing your goals!
          </span>
        </h3>
      </div>
      <div className="mx-2 mt-6 flex items-center justify-center sm:mx-10 sm:mt-8">
        <button
          onClick={handleClick}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#7E87EF] py-4 text-base text-black sm:text-xl"
        >
          <span>Take Survey</span>
          <span className="text-black">
            <FaArrowRightLong />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Conclusion;
