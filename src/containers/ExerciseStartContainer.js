import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import LoadingError from '../components/LoadingError';
import { getExerciseById, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';
import ExerciseButtons from '../components/ExerciseButtons';
import '../styles/ExerciseStartContainer.scss';

class ExerciseStartContainer extends Component {
  render() {
    const { isLoading, exercise, errorMessage } = this.props;
    if(isLoading && !exercise) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    }
    if(errorMessage && !exercise) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }
    return (
      <div className="container">
        <Row>
          <Col>
            <h1>{exercise.name}</h1>
          </Col>
        </Row>
        <ExerciseButtons exercise={exercise} />
      </div>
    );
  }

}

ExerciseStartContainer.propTypes = {
  errorMessage: PropTypes.string,
  exercise: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};


const mapStateToProps = (state, { params }) => {
  return {
    exercise: getExerciseById(state, params.exerciseId),
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state)
  };
};

export default connect(mapStateToProps, actions)(ExerciseStartContainer);
