import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import LoadingError from '../components/LoadingError';
import { getIsLoading, getErrorMessage, getWorkoutInstanceById, getExerciseInstancesForWorkoutInstance } from '../reducers';
import * as actions from '../actions';
import ExerciseButtons from '../components/ExerciseButtons';

class WorkoutStartContainer extends Component {
  componentWillMount() {

  }

  render() {
    const { isLoading, exerciseInstances } = this.props;
    if(isLoading || !exercises ||  !exerciseInstances) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    }
    if(errorMessage && !exercises) {
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
            exercise={exercisesById[exerciseInstance.exerciseId]}
            exerciseInstance={exerciseInstance}
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
    exerciseInstances: getExerciseInstancesForWorkoutInstance(state, params.id)
  }
}

export default withRouter(connect(mapStateToProps, actions)(WorkoutStartContainer));
