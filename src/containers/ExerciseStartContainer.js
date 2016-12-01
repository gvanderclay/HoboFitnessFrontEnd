import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import LoadingError from '../components/LoadingError';
import { getExerciseInstanceById, getExerciseByInstanceId, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';
import ExerciseButtons from '../components/ExerciseButtons';

class ExerciseStartContainer extends Component {
  componentWillMount() {
    const { fetchExerciseInstance, params } = this.props;
    fetchExerciseInstance(params.exerciseInstanceId);
  }

  handleClick() {
    const { router, completeExerciseInstance, exerciseInstance } = this.props;
    completeExerciseInstance(exerciseInstance.id);
    router.push('/exercises');
  }

  render() {
    const { isLoading, exercise, exerciseInstance, errorMessage } = this.props;
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
        <Row>
          <Col xs={8}>
            <ExerciseButtons exerciseInstance={exerciseInstance} exercise={exercise}/>
          </Col>
          <Col xs={4}>
          </Col>

        </Row>
        <Row>
          <Col>
            <Button onClick={this.handleClick.bind(this)}>Complete Exercise</Button>
          </Col>
        </Row>
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
    exerciseInstance: getExerciseInstanceById(state, params.exerciseInstanceId),
    exercise: getExerciseByInstanceId(state, params.exerciseInstanceId),
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
  };
};

export default withRouter(connect(mapStateToProps, actions)(ExerciseStartContainer));
