import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ExerciseButton from '../components/ExerciseButton';

class ExerciseButtonContainer extends Component {
  handleClick() {
    const { setExerciseInstanceSet, setNumber, exerciseInstance, maxReps } = this.props;
    const repsOnSet = exerciseInstance.repsPerSet[setNumber];

    if(repsOnSet === -1) {
      setExerciseInstanceSet(exerciseInstance.id, setNumber, maxReps)
    }
    else {
      setExerciseInstanceSet(exerciseInstance.id, setNumber, repsOnSet - 1);
    }
  }

  isActive() {
    const { exerciseInstance, setNumber } = this.props;
    const { repsPerSet } = exerciseInstance;
    return "exercise-button " + (repsPerSet[setNumber] === -1 ? "empty" : "");
  }

  render() {
    const { exerciseInstance, setNumber } = this.props;

    return(
      <ExerciseButton
          isActive={this.isActive.bind(this)}
          repsOnSet={exerciseInstance.repsPerSet[setNumber]}
          handleClick={this.handleClick.bind(this)}
      />
    );
  }
}

ExerciseButtonContainer.propTypes = {
}

const mapStateToProps = (state, { setNumber }) => {
   return {  }
};

export default connect(mapStateToProps, actions)(ExerciseButtonContainer);
