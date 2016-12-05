import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Row, Col } from 'react-bootstrap';
import Chart from 'chart.js';
import { withRouter } from 'react-router';
import LoadingError from '../components/LoadingError';
import Loading from '../components/Loading';
import ExerciseHistoryContainer from './ExerciseHistoryContainer';
import { getWorkoutById, getWorkoutData, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';

class WorkoutHistoryContainer extends Component {
  componentDidMount() {
    this.props.fetchWorkouts().then(() => {
      this.props.fetchExercises().then(() => {
        this.props.fetchExerciseInstances();
      });
    });
  }


  render() {
    const { isLoading, errorMessage, workout, data, router, backRoute, backText } = this.props;
    if(isLoading || !workout || _.isEmpty(data)) {
      return (
          <Loading />
      );
    }
    if(errorMessage || _.isEmpty(data)) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }
    return(
      <div>
      {
        Object.keys(data).map((key, index) => {
          const exerciseData = data[key];
          return (
            <ExerciseHistoryContainer
                key={index}
                exercise={exerciseData.exercise}
                data={exerciseData}
            />
          );
        })
      }
      </div>
    );
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    workout: getWorkoutById(state, params.workoutId),
    data: getWorkoutData(state, params.workoutId)
  };
};


export default withRouter(connect(mapStateToProps, actions)(WorkoutHistoryContainer));
