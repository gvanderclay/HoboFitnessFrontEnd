import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import LoadingError from '../components/LoadingError';
import { getExerciseById, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';
import ExerciseButtons from '../components/ExerciseButtons';

class ExerciseStartContainer extends Component {
  componentWillMount() {
    const { exercise, startExercise } = this.props;
    if(exercise) {
      startExercise(exercise.id);
    }
  }

  handleClick() {
    const { router, completeActiveExercise } = this.props;
    completeActiveExercise();
    router.push('/exercises');
  }

  render() {
    const { isLoading, exercise, errorMessage } = this.props;
    if(isLoading || !exercise) {
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
        <Button onClick={this.handleClick.bind(this)}>Complete Exercise</Button>
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
    errorMessage: getErrorMessage(state),
  };
};

export default withRouter(connect(mapStateToProps, actions)(ExerciseStartContainer));
