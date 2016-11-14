import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
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

  handleClick () {
    const { router, completeWorkoutInstance, workoutInstance } = this.props;
    completeWorkoutInstance(workoutInstance.id);
    router.push('workouts');
  }

  render() {
    const { isLoading, errorMessage, exerciseInstances, exercises } = this.props;
    if(isLoading || _.isEmpty(exerciseInstances) || _.isEmpty(exercises)) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    }
    if(errorMessage && _.isEmpty(exerciseInstances) && _.isEmpty(exercises)) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }

    const exercisesById = _.keyBy(exercises, 'id');

    return (
      <div className="container">
        {
          exerciseInstances.map((exerciseInstance, index) => {
            return (
              <ExerciseButtons
                exerciseInstance={exerciseInstance}
                exercise={exercisesById[exerciseInstance.exerciseId]}
                key={index}
              />
            );
          })
        }
        <Row>
          <Col>
            <Button onClick={null}>Complete Workout</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

WorkoutStartContainer.propTypes = {
  exercises: PropTypes.array,
  exerciseInstances: PropTypes.array
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
