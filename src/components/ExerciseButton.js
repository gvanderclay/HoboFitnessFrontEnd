import React, { Component } from 'react';
import '../styles/ExerciseButton.scss';

const ExerciseButton = ({ activeExercise, setNumber, handleClick }) => (
  <a
      className="exercise-button"
      onClick={handleClick}
  >
    {activeExercise.setsPerRep[setNumber]}
  </a>
);

export default ExerciseButton;
