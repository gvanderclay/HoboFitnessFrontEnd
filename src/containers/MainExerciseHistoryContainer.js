import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Row, Col } from 'react-bootstrap';
import Chart from 'chart.js';
import { withRouter } from 'react-router';
import LoadingError from '../components/LoadingError';
import Loading from '../components/Loading';
import ExerciseHistoryContainer from './ExerciseHistoryContainer';
import { getExerciseById, getAllExerciseInstances, getExerciseData, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';

class MainExerciseHistoryContainer extends Component {
  componentDidMount() {
    this.props.fetchExercises().then(() => {
      this.props.fetchExerciseInstances();
    });

  }

  render() {
    const { isLoading, errorMessage, exercise, exerciseInstances, data, router, backRoute, backText } = this.props;
    if(isLoading || !exercise || _.isEmpty(exerciseInstances) || _.isEmpty(data)) {
      return (
        <Loading />
      )
    }
    if(errorMessage || !exercise || _.isEmpty(exerciseInstances) || _.isEmpty(data)) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }
    return(
      <ExerciseHistoryContainer
          exercise={exercise}
          data={data}
      />
    );
  }
}

MainExerciseHistoryContainer.propTypes = {
  errorMessage: PropTypes.string,
  exercise: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
}


const mapStateToProps = (state, { params }) => {
  return {
    exercise: getExerciseById(state, params.exerciseId),
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    exerciseInstances: getAllExerciseInstances(state),
    data: getExerciseData(state, params.exerciseId)
  }
}

export default withRouter(connect(mapStateToProps, actions)(MainExerciseHistoryContainer));
