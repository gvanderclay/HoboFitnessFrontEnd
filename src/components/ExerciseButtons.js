import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Row} from 'react-bootstrap';
import * as actions from '../actions';
import ExerciseButton from './ExerciseButton';

class ExerciseButtons extends Component {
    componentDidMount() {
        const {
            exercise,
            dispatch
        } = this.props;
        dispatch(actions.startExercise(exercise.id));
    }
    render() {
        const {
            exercise
        } = this.props;
        return (
        <Row>
          {_.times(exercise.sets, (index) =>
            < ExerciseButton
                exercise={exercise}
                key={index}
            />
          )}
        </Row>
        );
    }
}

export default connect()(ExerciseButtons);
