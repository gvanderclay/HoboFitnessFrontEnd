import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExerciseHeaderContainer from './ExerciseHeaderContainer';
import { getExerciseById } from '../reducers';

class ExerciseContainer extends Component { 
  componentDidMount() {
    console.log(this.exercise);
  } 

  render() {
    const { exercise } = this.props;
    return(
      <div>
        <ExerciseHeaderContainer exercise={exercise}/>
      </div> 
    );
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    exercise: getExerciseById(state, params.exerciseId),
  }
}


export default connect(mapStateToProps,)(ExerciseContainer);