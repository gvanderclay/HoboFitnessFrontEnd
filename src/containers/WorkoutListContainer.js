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
    /* this.fetchData();*/
  }

  /* fetchData() {
   *   const { dispatch } = this.props;
   *   dispatch(fetchRoutines());
   *   dispatch(fetchWorkouts());
   * }*/

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
            handleClick={() => {}}
        />
        <List
          objects={workouts}
          onObjectClick={() => {}}
        />
      </div>
    );
  }
}

WorkoutListContainer.propTypes = {
  errorMessage: PropTypes.string,
  workouts: PropTypes.array.isRequired,
  routine: PropTypes.object.isRequired,
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
