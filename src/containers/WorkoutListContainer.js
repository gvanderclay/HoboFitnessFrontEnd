import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getErrorMessage, getIsLoading, getAllWorkouts } from '../reducers';
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
          editLink={ id => '/workouts/' + id + '/edit' }
          startLink={ id => '/workouts/' + id }
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
