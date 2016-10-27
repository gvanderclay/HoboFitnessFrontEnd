import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ExerciseEditFormContainer from './ExerciseEditFormContainer';
import LoadingError from '../components/LoadingError';
import Loading from '../components/Loading';
import { getExerciseById, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';

class ExerciseContainer extends Component { 
  componentDidMount() {
    this.props.fetchExercises();
  }

  render() {
    const { isLoading, errorMessage, exercise } = this.props;
    if(isLoading || !exercise) {
      return (
        <Loading />
      )
    }
    if(errorMessage && !exercise) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }
    return(
      <div>
        <ExerciseEditFormContainer exercise={exercise}/>
      </div> 
    );
  }
}

ExerciseContainer.propTypes = {
  errorMessage: PropTypes.string,
  exercise: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
}


const mapStateToProps = (state, { params }) => {
  return {
    exercise: getExerciseById(state, params.exerciseId),
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
  }
}

export default connect(mapStateToProps, actions)(ExerciseContainer);
