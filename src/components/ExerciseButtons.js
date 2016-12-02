import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Row} from 'react-bootstrap';
import ExerciseButtonContainer from '../containers/ExerciseButtonContainer';

const ExerciseButtons = ({ exercise, exerciseInstance }) => (
        <div>
          <h3>
            {exercise.name}
          </h3>
          {_.times(exercise.sets, (index) =>
            <ExerciseButtonContainer
                maxReps={exercise.reps}
                exerciseInstance={exerciseInstance}
                key={index}
                setNumber={index}
            />
          )}
        </div>
);


export default connect()(ExerciseButtons);
