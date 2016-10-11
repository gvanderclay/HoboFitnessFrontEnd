import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ExerciseHeaderContainer from './ExerciseHeaderContainer';
import LoadingError from '../components/LoadingError';
import { getExerciseById, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';

class ExerciseContainer extends Component { 
  componentDidMount() {
    this.props.fetchExercises();
  } 

  render() {
    const { isLoading, errorMessage, exercise } = this.props;
    if(isLoading&& !exercise) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
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
        <ExerciseHeaderContainer exercise={exercise}/>
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