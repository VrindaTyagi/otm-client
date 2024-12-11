import React from 'react';

import { useFormattedDateTime } from '../../hooks/useFormattedDateTime';
import { useTagAndColor } from '../../hooks/useTagAndColor';

import { useNavigate } from 'react-router-dom';
import { TagText } from '../Timeline/StyledComponents';

const TimelineDisplay = ({ data, timeline }) => {
  // custom hooks
  const [formattedDate, formattedTime] = useFormattedDateTime(data?.time);
  const [tag, color] = useTagAndColor(data?.fitnessScoreUpdates?.newScore);

  const navigate = useNavigate();

  return (
    <div
      className="flex w-full flex-col   gap-[2px] rounded-xl bg-[rgba(0,0,0,0.45)] px-1 pb-1"
      onClick={() => navigate(`/timeline/${timeline}`)}
    >
      <h1 className=" flex  h-[32px] items-center  pl-5 text-sm text-offwhite ">
        {timeline === 'personal' ? 'Personal' : 'Community'}
      </h1>
      <div className="flex w-full flex-col rounded-xl  bg-[rgba(0,0,0,0.40)] px-[11px] py-4">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="mb-2 flex flex-row items-center justify-center gap-2">
            <div className="text-[18px] text-offwhite">{data?.name}</div>
          </div>
          <div
            style={{ backgroundColor: color }}
            className="flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]"
          >
            <TagText>{tag}</TagText>
          </div>
        </div>

        <div className="text-[15px] text-white-opacity-50">{formattedDate}</div>
        <div className="timeline-tags mt-[6px] flex flex-row flex-wrap gap-[6px] text-xs">
          {/* <InfoTile>Horizontal Pull</InfoTile> */}
          <div className="flex items-center justify-center gap-[6px] rounded border border-white-opacity-23  bg-[rgba(59,59,59,0.06)] p-0.5 px-2 text-white-opacity-50 backdrop-blur-[17px]">
            {formattedTime}
          </div>
          <div className="flex items-center justify-center gap-[6px] rounded border border-white-opacity-23  bg-[rgba(59,59,59,0.06)] p-0.5 px-2 text-white-opacity-50 backdrop-blur-[17px]">
            Total Workouts {data?.consistency?.total}
          </div>
          <div className="flex items-center justify-center gap-[6px] rounded border border-white-opacity-23  bg-[rgba(59,59,59,0.06)] p-0.5 px-2 text-white-opacity-50 backdrop-blur-[17px]">
            <img
              src={`${process.env.PUBLIC_URL}/assets/move-coins-logo.svg`}
              className="h-4 w-4"
              alt="move coins logo"
            />
            <p>{data?.moveCoins} Coins</p>
          </div>

          {/* <InfoTile>700Kcal</InfoTile> */}
        </div>

        {/* <InfoTile>700Kcal</InfoTile> */}
      </div>
    </div>
  );
};

export default TimelineDisplay;
