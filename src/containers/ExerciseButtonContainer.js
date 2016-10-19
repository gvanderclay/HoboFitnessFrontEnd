import React, { Component } from 'react';
<<<<<<< HEAD
=======
import { connect } from 'react-redux';
import * as actions from '../actions';
>>>>>>> b00e33cf2270e69ee60e5de51dd70fcd4fb58676
import ExerciseButton from '../components/ExerciseButton';

class ExerciseButtonContainer extends Component {

<<<<<<< HEAD
    render() {
    }
=======
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
>>>>>>> b00e33cf2270e69ee60e5de51dd70fcd4fb58676
}

export default connect()(ExerciseButtonContainer);
