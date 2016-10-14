import React, { Component } from 'react';
import '../styles/ExerciseButton.scss'

const ExerciseButton = ({ exercise }) => (
    <a
        className="exercise-button"
        onClick={() =>
            console.log('here')
        }
    >
        {exercise.reps}
    </a>
)

export default ExerciseButton;
