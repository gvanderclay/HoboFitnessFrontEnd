import { Schema, arrayOf } from 'normalizr';

export const exercise = new Schema('exercises');
export const arrayOfExercises = arrayOf(exercise);
export const exerciseInstance = new Schema('exerciseInstances');
export const arrayOfExerciseInstances = arrayOf(exerciseInstance);


const exercise = new Schema('workouts');
exercise.define({
  exercises: arrayOfExercises
});
export const arrayOfExercises = arrayOf(workout);

const exerciseInstance = new Schema('workoutInstances');
exerciseInstance.define({
  exerciseInstances: arrayOfExerciseInstances
});

export const arrayOfExerciseInstances = arrayOf(workoutInstance);

export { exercise, workoutInstance };


