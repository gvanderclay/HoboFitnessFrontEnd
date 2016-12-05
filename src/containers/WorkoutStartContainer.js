import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import LoadingError from '../components/LoadingError';
import { getIsLoading, getErrorMessage, getExerciseInstancesForWorkoutInstance, getExercisesForWorkoutInstance } from '../reducers';
import * as actions from '../actions';
import ExerciseButtons from '../components/ExerciseButtons';
import ExerciseStart from '../components/ExerciseStart';
import '../styles/WorkoutStart.scss';

class WorkoutStartContainer extends Component {
  componentWillMount() {
    const { params, fetchWorkoutInstance } = this.props;
    fetchWorkoutInstance(params.workoutInstanceId);
    this.changeExerciseInstanceWeight =
      _.debounce(this.changeExerciseInstanceWeight, 500);
  }

  handleClick () {
    const { router, completeWorkoutInstance, completeExerciseInstance, params } = this.props;
    completeWorkoutInstance(params.workoutInstanceId).then((result) => {
      let p = Promise.resolve();
      _.forEach(result.exerciseInstances, (instance) => {
        p = p.then(() => completeExerciseInstance(instance));
      });
    });
    router.push('/workouts');
  }

  handleChange(event, exerciseInstance) {
    this.changeExerciseInstanceWeight(exerciseInstance, event.target.value);
  }

  changeExerciseInstanceWeight(exerciseInstance, weight) {
      const { setExerciseInstanceWeight } = this.props;
      setExerciseInstanceWeight(exerciseInstance.id, weight);
  }

  render() {
    const { isLoading, errorMessage, exerciseInstances, exercises, setExerciseInstanceWeight } = this.props;
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
        <Row>
          <Col>
            <Link className="btn btn-default" to="/workouts"> Back To Workouts </Link>
          </Col>
        </Row>
        {
          exerciseInstances.map((exerciseInstance, index) => {
            return (
              <ExerciseStart
                exerciseInstance={exerciseInstance}
                setExerciseInstanceWeight={setExerciseInstanceWeight}
                exercise={exercisesById[exerciseInstance.exerciseId]}
                handleChange={_.bind(this.handleChange, this, _, exerciseInstance)}
                key={index}
              />
            );
          })
        }
        <Row>
          <Col>
            <Button onClick={this.handleClick.bind(this)}>Complete Workout</Button>
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
