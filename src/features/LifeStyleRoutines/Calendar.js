import React, { useEffect, useState } from 'react';
import CalendarTile from './components/CalendarTile';
import ProgressBar from './ProgressBar';

function Calendar({
  completionHistory,
  isSummaryPage,
  selectedDate,
  setSelectedDate,
}) {
  console.log(completionHistory, isSummaryPage, selectedDate, setSelectedDate);
  const [reversedCompletionHistory, setReversedCompletionHistory] = useState(
    [],
  );
  const [percentCompletionOfSelectedDate, setPercentCompletionOfSelectedDate] =
    useState(null);

  useEffect(() => {
    if (completionHistory && completionHistory.length > 0) {
      setReversedCompletionHistory(completionHistory.slice().reverse());
    }
  }, [completionHistory]);

  useEffect(() => {
    try {
      const todayDate =
        reversedCompletionHistory[reversedCompletionHistory.length - 1]?.date;
      console.log('selected date : ', selectedDate);
      if (!selectedDate) {
        setSelectedDate(todayDate);
      }
    } catch (err) {
      console.error('Error occurred while setting selected date:', err);
    }
  }, [selectedDate]);

  useEffect(() => {
    console.log('percentCompletionHistory : ', selectedDate);
    const percentCompletionHistory = completionHistory?.find(
      (history) => history.date === selectedDate,
    );
    setPercentCompletionOfSelectedDate(
      percentCompletionHistory?.completionPercentage ?? null,
    );
  }, [completionHistory, selectedDate]);

  return (
    <div className="flex w-full flex-col items-start justify-center">
      {/* {selectedDate && (
        <>
          {
            <h3 className="text-xl " style={{ lineHeight: '41.6px' }}>
              <span className="text-white">
                {formatDate(selectedDate)[0]},{' '}
              </span>
              <span className="text-darkTextGray">
                {formatDate(selectedDate)[1]}
              </span>
            </h3>
          }
        </>
      )} */}
      <div className="w-full rounded-lg">
        {percentCompletionOfSelectedDate !== null &&
          percentCompletionOfSelectedDate !== 0 && (
            <ProgressBar progress={percentCompletionOfSelectedDate} />
          )}

        {/* can be needed in future */}

        {/* {(percentCompletionOfSelectedDate === null ||
          percentCompletionOfSelectedDate === 0) && (
          <p className="font-body-condensed-bold font-sfpro text-[14px] text-lightGray">
            Let's make today count. Begin by completing your first task
          </p>
        )} */}
        <div className="mb-2 mt-4 flex flex-row items-center justify-around">
          {reversedCompletionHistory.map((history) => (
            <CalendarTile
              key={history.date}
              date={history.date}
              percentCompletion={history.completionPercentage}
              setSelectedDate={setSelectedDate}
              isToday={
                history.date ===
                reversedCompletionHistory[reversedCompletionHistory.length - 1]
                  ?.date
              }
              isSelected={history?.date === selectedDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
