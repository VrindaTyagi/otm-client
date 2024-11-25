import React, { useEffect, useState } from 'react';

const WeeklyCheckinConsistency = ({
  suggestedWorkoutPerWeek,
  last8WeekConsistency,
}) => {
  const Bar = ({ progress }) => {
    const [basicgreen, intermediategreen, advancedgreen, red, yellow, gray] = [
      '#7FE08A',
      '#29C344',
      '#119832',
      '#FA5757',
      '#F5C563',
      '#323232',
    ]; // colors of the bar

    const [height, setHeight] = useState(0);
    const [color, setColor] = useState(gray);

    useEffect(() => {
      if (
        progress >= suggestedWorkoutPerWeek &&
        suggestedWorkoutPerWeek !== 0
      ) {
        // if workout per week is >= 4 the bar is filled completely
        setHeight((prev) => String(40));
      } else {
        // if the workout < 4 then the bar is filled accordingly (out of <suggestedWorkoutPerWeek> scale)
        const calculatedHeight = (progress / suggestedWorkoutPerWeek) * 40;
        setHeight((prev) => calculatedHeight.toString());
      }
      if (progress >= 2 * suggestedWorkoutPerWeek) {
        setColor((prev) => advancedgreen);
      } else if (
        progress < 2 * suggestedWorkoutPerWeek &&
        progress > suggestedWorkoutPerWeek
      ) {
        setColor((prev) => intermediategreen);
      } else if (progress === suggestedWorkoutPerWeek) {
        setColor((prev) => basicgreen);
      } else if (progress < suggestedWorkoutPerWeek && progress > 1) {
        setColor((prev) => yellow);
      } else {
        setColor((prev) => red);
      }
    }, [
      progress,
      color,
      height,
      basicgreen,
      intermediategreen,
      advancedgreen,
      red,
      yellow,
      gray,
    ]);

    const barStyles = {
      height: `${height}px`,
      backgroundColor: color,
      '--calculated-height': `${height}px`,
    };

    return (
      <div className="relative h-[40px] w-[6px] rounded-xl bg-[rgba(168,168,168,0.24)]">
        <div className="flex h-full w-full flex-col items-center justify-end bg-transparent">
          <div style={barStyles} className="barStyle w-full rounded-xl"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-[5px]">
      {last8WeekConsistency?.map((item, index) => (
        <Bar progress={item?.count} key={Math.random() * 1000} />
      ))}
    </div>
  );
};

export default WeeklyCheckinConsistency;
