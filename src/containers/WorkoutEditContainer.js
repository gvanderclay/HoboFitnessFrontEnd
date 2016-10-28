import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getExercisesForWorkout, getWorkoutById, getErrorMessage, getIsLoading,  } from '../reducers';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import LoadingError from '../components/LoadingError';
import * as actions from '../actions';

class WorkoutEditContainer extends Component {
  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchEntities } = this.props;
    fetchEntities();
  }

  addExerciseToWorkout() {
    const { addExercise, updateWorkout, workout, router } = this.props;
    addExercise('New ' + workout.name + ' exercise').then(exercise => {
      console.log(exercise);
      updateWorkout(workout.id, workout.name, exercise).then(workout => {
        router.push('/exercises/' + exercise.id + '/edit')
      })
    })
  }

  render() {
    const { isLoading, errorMessage, exercises, workout } = this.props;
    if(isLoading || !exercises || !workout) {
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

    console.log(JSON.parse(localStorage.fakeDB));

    return (
      <div className="container">
        <ListHeader
            name={workout.name}
            handleClick={this.addExerciseToWorkout.bind(this)}
        />
        <List
            objects={exercises}
            editLink={ id => '/exercises/' + id + '/edit'}
            startLink={ id => '/exercises/' + id }
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
  isLoading: getIsLoading(state)
});

WorkoutEditContainer = withRouter(connect(
  mapStateToProps,
  actions
)(WorkoutEditContainer));

export default WorkoutEditContainer;
