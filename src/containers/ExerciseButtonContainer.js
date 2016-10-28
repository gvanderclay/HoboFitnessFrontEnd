import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getRepsOnSet } from '../reducers/activeExercise';
import ExerciseButton from '../components/ExerciseButton';

class ExerciseButtonContainer extends Component {
  handleClick() {
    const { dispatch, maxReps, repsOnSet, setNumber } = this.props;
    if(repsOnSet === -1) {
      dispatch(actions.setActiveExerciseSet(setNumber, maxReps))
    }
    else {
      dispatch(actions.setActiveExerciseSet(setNumber, repsOnSet - 1));
    }
  }

  isActive() {
    const { repsOnSet } = this.props;
    return "exercise-button " + (repsOnSet === -1 ? "empty" : "");
  }

  render() {
    const { repsOnSet } = this.props;
    return(
      <ExerciseButton
          isActive={this.isActive.bind(this)}
          repsOnSet={repsOnSet}
          handleClick={this.handleClick.bind(this)}
      />
    );
  }
}

ExerciseButtonContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state, { setNumber }) => {
   return { repsOnSet: getRepsOnSet(state.activeExercise, setNumber) }
};

export default connect(mapStateToProps)(ExerciseButtonContainer);
