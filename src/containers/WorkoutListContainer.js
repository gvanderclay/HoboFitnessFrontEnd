import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getErrorMessage, getIsLoading, getAllWorkouts } from '../reducers';
import { Link } from 'react-router';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import LoadingError from '../components/LoadingError';
import * as actions from '../actions'
import '../styles/ListHeader.scss';

class WorkoutListContainer extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchWorkouts } = this.props;
    fetchWorkouts();
  }

  addWorkout() {
    const { addWorkout, router } = this.props;
    addWorkout('New Workout').then(result =>
      router.push('/workouts/' + result.id + '/edit')
    );
  }

  actionComponent(id, text, route, props) {
    return (
      <Link
          className="list-link"
          to={route(id)}
          props
      >
        {text}
      </Link>
    );
  }

  startWorkoutComponent(id) {
    const { addExerciseInstance } = this.props;
    const route = id => "/workouts/" + id;
    return this.actionComponent(id, "Start", route);
  }

  editWorkoutComponent(id) {
    const route = id => "/workouts/" + id + "/edit";
    return this.actionComponent(id, "Edit", route);
  }

  deleteWorkoutComponent(id) {
    const { deleteWorkout } = this.props;
    return (
      <Link
        className="list-link"
        onClick={deleteWorkout.bind(this, id)}
      >
        Delete
      </Link>
    );
  }

  workoutActionComponents(workout) {
    const { id } = workout;
    // put the components in the opposite order you want theme to appear on screen
    return [
      this.deleteWorkoutComponent(id),
      this.editWorkoutComponent(id),
      this.startWorkoutComponent(id),
    ];
  }

  render() {
    const { isLoading, errorMessage, workouts } = this.props;
    if(isLoading || !workouts) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      )
    }
    if(errorMessage && !workouts.length) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }

    return (
      <div className="container list-header">
        <ListHeader
            name="workout"
            handleClick={this.addWorkout.bind(this)}
        />
        <List
          objects={workouts}
          actionComponents={this.workoutActionComponents.bind(this)}
        />
      </div>
    );
  }
}

WorkoutListContainer.propTypes = {
  errorMessage: PropTypes.string,
  workouts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { params }) => {
  return {
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    workouts: getAllWorkouts(state)
  }
}

WorkoutListContainer = withRouter(connect(
  mapStateToProps,
  actions
)(WorkoutListContainer));

export default WorkoutListContainer;
