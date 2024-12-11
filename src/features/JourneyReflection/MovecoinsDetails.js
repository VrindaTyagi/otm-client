import React from 'react';

const MovecoinsDetail = ({ apiData }) => {
  return (
    <div className="">
      <div className="mt-4 px-4 sm:mt-10 sm:px-10"></div>

      <div className="flex flex-col items-center ">
        <img src={'/assets/movecoinsgrouplogo.svg'} alt="img"></img>

        <h1 className="font-sf-pro mt-5 flex gap-1 text-left text-[22.33px] sm:mt-8 sm:text-center sm:text-2xl">
          <span className="purple-gradient-background flex gap-2 rounded-md border border-transparent px-1 font-semibold text-black">
            {apiData?.data?.totalMovecoins}{' '}
          </span>{' '}
          <span className="purple-gradient"> Movecoins Earned!!</span>
        </h1>
      </div>
    </div>
  );
};

export default MovecoinsDetail;
