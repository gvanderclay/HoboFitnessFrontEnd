import React from 'react';
import { withRouter } from 'react-router';
import ExerciseContainer from '../containers/ExerciseEditContainer';

const WorkoutExerciseEdit = ({ params }) => (
    <ExerciseContainer
      backRoute={"/workouts/" + params.workoutId + "/edit"}
      backText={"Back To Workout"}
    />
);

export default withRouter(WorkoutExerciseEdit);
