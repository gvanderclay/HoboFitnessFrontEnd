import React from 'react';
import '../styles/ExerciseButton.scss';

const ExerciseButton = ({ isActive, activeExercise, repsOnSet, handleClick }) => (
  <a
      className={isActive()}
      onClick={handleClick}
  >
    {repsOnSet}
  </a>
);

export default ExerciseButton;
