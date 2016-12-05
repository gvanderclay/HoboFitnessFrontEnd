import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import LoadingError from '../components/LoadingError';
import { getExerciseInstanceById, getExerciseByInstanceId, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';
import ExerciseStart from '../components/ExerciseStart';

class ExerciseStartContainer extends Component {
  constructor(props) {
    super(props);
    this.changeExerciseInstanceWeight =
      _.debounce(this.changeExerciseInstanceWeight, 500);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { fetchExerciseInstance, params } = this.props;
    fetchExerciseInstance(params.exerciseInstanceId);
  }

  handleChange(event) {
    this.changeExerciseInstanceWeight(event.target.value);
  }

  changeExerciseInstanceWeight(weight) {
    const { setExerciseInstanceWeight, exerciseInstance } = this.props;
    setExerciseInstanceWeight(exerciseInstance.id, weight);
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
      <ExerciseStart
          exerciseInstance={exerciseInstance}
          exercise={exercise}
          handleChange={this.handleChange}
          handleClick={this.handleClick.bind(this)}
      />
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
