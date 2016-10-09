import { Schema, arrayOf } from 'normalizr';

export const routine = new Schema('routines');
export const arrayOfRoutines = arrayOf(routine);
export const workout = new Schema('workouts');
export const arrayOfWorkouts = arrayOf(workout);