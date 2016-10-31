import { Schema, arrayOf } from 'normalizr';

export const exercise = new Schema('exercises');
export const arrayOfExercises = arrayOf(exercise);
export const exerciseInstance = new Schema('exerciseInstances');
export const arrayOfExerciseInstances = arrayOf(exerciseInstance);


const workout = new Schema('workouts');
workout.define({
  exercises: arrayOfExercises
});
export const arrayOfWorkouts = arrayOf(workout);

const workoutInstance = new Schema('workoutInstances');
workoutInstance.define({
  exerciseInstances: arrayOfExerciseInstances
});

export const arrayOfWorkoutInstances = arrayOf(workoutInstance);

export { workout, workoutInstance };


