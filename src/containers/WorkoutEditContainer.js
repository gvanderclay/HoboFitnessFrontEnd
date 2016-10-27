import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAllExercises, getErrorMessage, getIsLoading } from '../reducers';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import LoadingError from '../components/LoadingError';
import * as actions from '../actions';

class WorkoutEditContainer extends Component {
  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    
  }

  addExerciseToWorkout() {

  }

  render() {
    const { isLoading, errorMessage, exercises, workout } = this.props;
    if(isLoading && !exercises.length) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    }
    if(errorMessage && !exercises.length) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }

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

const mapStateToProps = (state, props) => ({
  exercises: null,
  errorMessage: getErrorMessage(state),
  workout: null
});

WorkoutEditContainer = withRouter(connect(
  mapStateToProps,
  actions
));
