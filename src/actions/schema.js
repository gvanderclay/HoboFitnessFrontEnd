import { Schema, arrayOf } from 'normalizr';

export const exercise = new Schema('exercises');
export const arrayOfExercises = arrayOf(exercise);

const workout = new Schema('workouts');

workout.define({
  exercises: arrayOf(exercise)
});

export { workout };

export const arrayOfWorkouts = arrayOf(workout);


