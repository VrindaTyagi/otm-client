import React from 'react';
import {
  Container,
  Feedback,
  Rounds,
  WorkoutTileHeading,
} from './StyledComponents';

function WorkoutTile({ workoutName, rounds, feedback, workoutCompleted }) {
  return (
    <Container className="relative flex w-full flex-col items-start justify-start gap-3 p-2">
      <div className="flex flex-col items-start justify-center gap-1">
        <WorkoutTileHeading>{workoutName}</WorkoutTileHeading>
        {<Rounds>{rounds === '' ? '0 Rounds' : rounds}</Rounds>}
      </div>
      <div className="flex flex-col items-start justify-center gap-[1px]">
        {feedback &&
          feedback.map((feed, index) => {
            return <Feedback key={index}>•{feed}</Feedback>;
          })}
      </div>
      {workoutCompleted && (
        <img
          src={'/assets/done.svg'}
          alt="done"
          className="absolute right-[6px] top-[6px]"
        />
      )}
    </Container>
  );
}

export default WorkoutTile;
