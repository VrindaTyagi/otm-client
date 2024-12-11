import React, { useEffect, useMemo, useState } from 'react';
import Arrow from '../Leaderboard/Arrow';
import {
  AssesmentPara,
  AssesmentText,
  FitnessScore,
  Score,
} from './StyledComponents';

function AssesmentTile({ currScore, prevScore, assessmentFeedback }) {
  const colors = useMemo(() => ['#5ECC7B', '#FA5757'], []);
  const [scoreData, setScoreData] = useState({
    color: colors[0],
    isPositiveChange: true,
    percentChange: '0%',
  });

  useEffect(() => {
    const diff =
      currScore >= prevScore ? currScore - prevScore : prevScore - currScore;
    const percentChange = `${currScore >= prevScore ? '+' : '-'}${diff.toFixed(1)}`;
    const color = currScore >= prevScore ? colors[0] : colors[1];
    const isPositiveChange = currScore >= prevScore;

    setScoreData({ color, isPositiveChange, percentChange });
  }, [currScore, prevScore, colors]);

  return (
    <div className="mt-1 flex h-[88px] w-full flex-row items-center justify-around rounded-[10.9px] border-[1px] border-[#3F3F3F] backdrop-blur-xl">
      <div className="flex w-6/12 flex-col items-start justify-center gap-1 p-2">
        <AssesmentText>Assesment</AssesmentText>
        {assessmentFeedback?.map((feedback, index) => {
          return <AssesmentPara key={index}>•{feedback}</AssesmentPara>;
        })}
      </div>
      <div className="flex w-6/12 flex-col items-center justify-center gap-1">
        <FitnessScore>Fitness Score</FitnessScore>
        <div className="flex flex-row items-center justify-center gap-2">
          <Score style={{ color: scoreData.color }}>{currScore}</Score>
          {currScore !== prevScore && (
            <div className="flex flex-col items-center justify-center">
              <Arrow value={currScore - prevScore} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssesmentTile;
