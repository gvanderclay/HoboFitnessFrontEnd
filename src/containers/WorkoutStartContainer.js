import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import LoadingError from '../components/LoadingError';
import { getIsLoading, getErrorMessage, getExerciseInstancesForWorkoutInstance, getExercisesForWorkoutInstance } from '../reducers';
import * as actions from '../actions';
import ExerciseButtons from '../components/ExerciseButtons';

class WorkoutStartContainer extends Component {
  componentWillMount() {
    const { params, fetchWorkoutInstance } = this.props;
    fetchWorkoutInstance(params.workoutInstanceId);
  }

  render() {
    const { isLoading, errorMessage, exerciseInstances, exercises } = this.props;
    if(isLoading ||  !exerciseInstances) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    }
    if(errorMessage && !exerciseInstances) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }

    const exercisesById = _.keyBy("id", exercises);

    return (
      <div className="container">
        {_.each(exerciseInstances, (exerciseInstance, index) => {
          return (<ExerciseButtons
            exerciseInstance={exerciseInstance}
            exercise={exercisesById[exerciseInstance.exerciseId]}
            index={index}
          />
         )})}
      </div>
    );
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    exerciseInstances: getExerciseInstancesForWorkoutInstance(state, params.workoutInstanceId),
    exercises: getExercisesForWorkoutInstance(state, params.workoutInstanceId)
  }
}

export default withRouter(connect(mapStateToProps, actions)(WorkoutStartContainer));
