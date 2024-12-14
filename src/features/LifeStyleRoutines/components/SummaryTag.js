import React from 'react';

function SummaryTag({ name, id, isCompleted }) {
  return (
    <p
      className={`rounded-[4px] px-[8px] py-[2px] text-[14px] ${isCompleted === true ? 'bg-[#5eff7b1f] text-[#5ECC7B]' : 'bg-[#fa575726] text-[#FA5757]'}`}
    >
      {name}
    </p>
  );
}

export default SummaryTag;
