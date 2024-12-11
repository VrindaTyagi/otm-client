import React from 'react';

const HomeBar = () => {
  return (
    <div className="fixed bottom-0 h-[139px] w-[358px] flex-shrink-0 bg-[rgba(0,_0,_0,_0.85)] backdrop-blur-[37px] backdrop-filter">
      <div className="relative left-7 flex h-[49px] w-[290px] justify-between pt-5">
        <img src={'/assets/home.svg'} alt="img"></img>
        <img src={'/assets/stats.svg'} alt="img"></img>
        <img src={'/assets/community.svg'} alt="img"></img>
        <img src={'/assets/setting.svg'} alt="img"></img>
      </div>
    </div>
  );
};

export default HomeBar;
