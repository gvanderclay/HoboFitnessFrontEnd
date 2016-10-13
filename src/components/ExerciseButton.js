import React, { Component } from 'react';

class ExerciseButton extends Component {
    render() {
      const { exercise } = this.props;
      return (
        <a
            className="menu"
            onClick={() =>
                console.log('here')
            }
        >
            {exercise.reps}
        </a>
      );
    }
}

export default ExerciseButton;
