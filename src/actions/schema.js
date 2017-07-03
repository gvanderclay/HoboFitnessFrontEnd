import { Schema, arrayOf } from 'normalizr';

export const workout = new Schema('exercises');
export const arrayOfExercises = arrayOf(workout);
export const exerciseInstance = new Schema('exerciseInstances');
export const arrayOfExerciseInstances = arrayOf(exerciseInstance);


const workout = new Schema('exercises');
workout.define({
  exercises: arrayOfExercises
});
export const arrayOfExercise = arrayOf(workout);

const exerciseInstance = new Schema('exerciseInstances');
exerciseInstance.define({
  exerciseInstances: arrayOfExerciseInstances
});

export const arrayOfExerciseInstances = arrayOf(exerciseInstance);

export { workout, exerciseInstance };


