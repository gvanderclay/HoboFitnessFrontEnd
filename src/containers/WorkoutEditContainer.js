import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { getExercisesForWorkout, getWorkoutById, getErrorMessage, getIsLoading, getWorkoutInstancesForWorkout } from '../reducers';
import List from '../components/List';
import EditListHeader from '../components/EditListHeader';
import LoadingError from '../components/LoadingError';
import * as actions from '../actions';

class WorkoutEditContainer extends Component {
  constructor() {
    super();
    this.changeWorkoutName = _.debounce(this.changeWorkoutName, 500);
  }
  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchWorkout, fetchWorkoutInstances, params } = this.props;
    fetchWorkout(params.workoutId).then(() => fetchWorkoutInstances());
  }

  addExerciseToWorkout() {
    const { addExercise, updateWorkout, workout, router } = this.props;
    addExercise('New ' + workout.name + ' exercise').then(exercise => {
      updateWorkout(workout.id, workout.name, exercise).then(workout => {
        router.push('/workouts/' + workout.id + '/exercise/' + exercise.id)
      })
    })
  }

  handleChange(event) {
    this.changeWorkoutName(event.target.value);
  }

  changeWorkoutName(name) {
    const { updateWorkout, workout } = this.props;
    updateWorkout(workout.id, name);
  };

  actionComponent(id, text, props) {
    return (
      <Link
          className="list-link"
          {...props}
      >
        {text}
      </Link>
    );
  }

  editExerciseComponent(id) {
    const { workout } = this.props;
    const props = {
      to: "/workouts/" + workout.id + "/exercise/" + id
    }
    return this.actionComponent(id, "Edit", props);
  }

  exerciseActionComponents(exercise) {
    const { id } = exercise;
    // put the components in the opposite order you want them to appear on screen
    return [
      this.editExerciseComponent(id)
    ]
  }

  startWorkoutComponent(id) {
    const { addWorkoutInstance, router, workoutInstances } = this.props;
    const props = {
      onClick: () => {
        let workoutInstance = workoutInstances.find((instance) => id === instance.workoutId && !instance.completed)
        if(_.isEmpty(workoutInstance)) {
          addWorkoutInstance(id).then(instance => {
            workoutInstance = instance;
            router.push("/workouts/" + workoutInstance.id);
          });
          return;
        }
        router.push("/workouts/" + workoutInstance.id);
      },
      className: "btn btn-default",
      style: {
        float: "right"
      }
    };
    return this.actionComponent(id, "Start Workout", props);
  }

  render() {
    const { isLoading, errorMessage, exercises, workout } = this.props;
    if(isLoading || exercises === null || _.isEmpty(workout))  {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    }
    if(errorMessage && !exercises.length && !workout) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }

    return (
      <div className="container">
        <Link
            to="/workouts"
            className="btn btn-default">
          Back To Workouts
        </Link>
        {this.startWorkoutComponent(workout.id)}
        <EditListHeader
            addType={"Exercise To Workout"}
            handleClick={this.addExerciseToWorkout.bind(this)}
            placeHolder="Workout Name"
            value={workout.name}
            handleChange={this.handleChange.bind(this)}
        />
        <List
            objects={exercises}
            actionComponents={this.exerciseActionComponents.bind(this)}
        />
      </div>
    );
  }
}


WorkoutEditContainer.propTypes = {
  exercises: PropTypes.array.isRequired,
  errorMessage: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  workout: PropTypes.object.isRequired
};

const mapStateToProps = (state, { params }) => ({
  workout: getWorkoutById(state, params.workoutId),
  exercises: getExercisesForWorkout(state, params.workoutId),
  errorMessage: getErrorMessage(state),
  isLoading: getIsLoading(state),
  workoutInstances: getWorkoutInstancesForWorkout(state, params.workoutId),
});

WorkoutEditContainer = withRouter(connect(
  mapStateToProps,
  actions
)(WorkoutEditContainer));

export default WorkoutEditContainer;
