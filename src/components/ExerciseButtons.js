import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Row} from 'react-bootstrap';
import ExerciseButtonContainer from '../containers/ExerciseButtonContainer';

const ExerciseButtons = ({ exercise, exerciseInstance }) => (
        <Row>
          {_.times(exercise.sets, (index) =>
            <ExerciseButtonContainer
                maxReps={exercise.reps}
                exerciseInstance={exerciseInstance}
                key={index}
                setNumber={index}
            />
          )}
        </Row>
);


export default connect()(ExerciseButtons);
