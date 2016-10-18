import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Row} from 'react-bootstrap';
import ExerciseButton from './ExerciseButton';

class ExerciseButtons extends Component {
  render() {
        const {
          exercise,
          activeExercise
        } = this.props;
        return (
        <Row>
          {_.times(exercise.sets, (index) =>
            <ExerciseButton
                exercise={exercise}
                key={index}
                activeExercise={activeExercise}
                setNumber={index}
            />
          )}
        </Row>
        );
    }
}

const mapStateToProps = (state, { params }) => {
  return {
    activeExercise: state.activeExercise
  };
};

export default connect(mapStateToProps)(ExerciseButtons);
