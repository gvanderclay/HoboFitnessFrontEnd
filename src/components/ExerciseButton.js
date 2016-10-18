import React, { Component } from 'react';
import '../styles/ExerciseButton.scss';

class ExerciseButton extends Component {
    render() {
      const { activeExercise, setNumber } = this.props;
      return (
        <a
            className="exercise-button"
            onClick={() =>
                console.log('here')
            }
        >
          {activeExercise.setsPerRep[setNumber]}
        </a>
      );
    }
}


export default ExerciseButton;
