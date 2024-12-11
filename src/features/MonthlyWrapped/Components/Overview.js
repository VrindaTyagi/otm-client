import React from 'react';

function Overview({ weightInfoData }) {
  const { imgUrl, caption } = weightInfoData;
  return (
    <div
      className="h-[457px] w-[100%] max-w-[326px] rounded-[22.291px] object-cover"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover', // Add this to ensure the image covers the entire div
        backgroundPosition: 'center', // Add this to center the image
      }}
    >
      <div
        className="relative flex h-full w-full flex-col items-start justify-between rounded-[22.291px] px-4 pb-3"
        style={{
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
        }}
      >
        <img
          src="/assets/overview_streak.png"
          alt="star"
          height={74}
          width={74}
          className="relative right-[10px]"
        />
        <p
          className="bar-chart-text z-[2] text-start text-white/90"
          style={{ textShadow: '1px 1px #000000' }}
        >
          {caption}
        </p>
        {/* Mask */}
        <div className="absolute bottom-0 left-0 z-[1] h-[100px] w-full rounded-b-[22.291px] bg-transparent backdrop-blur-[1px]">
          <div
            className="h-full w-full rounded-b-[22.291px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, #535353 100%)',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
