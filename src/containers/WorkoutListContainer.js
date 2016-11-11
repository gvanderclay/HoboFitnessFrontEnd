import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getErrorMessage, getIsLoading, getAllWorkouts, getAllWorkoutInstances } from '../reducers';
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
      }
    };
    return this.actionComponent(id, "Start", props);
  }

  editWorkoutComponent(id) {
    const props = {
      to: "/workouts/" + id + "/edit"
    }
    return this.actionComponent(id, "Edit", props);
  }

  deleteWorkoutComponent(id) {
    const { deleteWorkout } = this.props;
    const props = {
      onClick: deleteWorkout.bind(this, id)
    }
    return this.actionComponent(id, "Delete", props);
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
    workouts: getAllWorkouts(state),
    workoutInstances: getAllWorkoutInstances(state),
  }
}

WorkoutListContainer = withRouter(connect(
  mapStateToProps,
  actions
)(WorkoutListContainer));

export default WorkoutListContainer;
