import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Row} from 'react-bootstrap';
import ExerciseButtonContainer from '../containers/ExerciseButtonContainer';

class ExerciseButtons extends Component {
  render() {
        const {
          exercise,
        } = this.props;
        return (
        <Row>
          {_.times(exercise.sets, (index) =>
            <ExerciseButtonContainer
                maxReps={exercise.reps}
                key={index}
                setNumber={index}
            />
          )}
        </Row>
        );
    }
}

export default connect()(ExerciseButtons);
