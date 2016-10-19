import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ExerciseButton from '../components/ExerciseButton';

class ExerciseButtonContainer extends Component {

  handleClick() {
    const { dispatch, setNumber, maxReps, activeExercise } = this.props;
    const reps = activeExercise[setNumber];
    console.log(maxReps);
    if(reps === -1) {
      dispatch(actions.setActiveExerciseSet(setNumber, maxReps))
    }
    else {
      dispatch(actions.setActiveExerciseSet(setNumber, reps - 1));
    }
  }

  render() {
    const { activeExercise, setNumber } = this.props;
    return(
      <ExerciseButton
          activeExercise={activeExercise}
          setNumber={setNumber}
          handleClick={this.handleClick.bind(this)}
      />
    );
  }
}

export default connect()(ExerciseButtonContainer);
