import { Schema, arrayOf } from 'normalizr';

export const exercise = new Schema('exercises');
export const arrayOfExercises = arrayOf(exercise);

export const workout = new Schema('workouts').define({
  exercises: arrayOf(exercise)
});


