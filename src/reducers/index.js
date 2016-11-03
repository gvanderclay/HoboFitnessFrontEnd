import { combineReducers } from 'redux';
import _ from 'lodash';
import  * as fromById from './byId';
import createList from './createList';
import activeExercise from './activeExercise';
import * as fromCreateList from './createList';

const exercisesById = fromById.exercisesById;
const workoutsById = fromById.workoutsById;
const exerciseInstancesById = fromById.exerciseInstancesById;
const workoutInstancesById = fromById.workoutInstancesById;

const exerciseList = createList("exercise");
const workoutList = createList("workout");
const workoutInstanceList = createList("workout_instance");
const exerciseInstanceList = createList("exercise_instance");

const state = combineReducers({
  exerciseList,
  exercisesById,
  exerciseInstanceList,
  exerciseInstancesById,
  activeExercise,
  workoutList,
  workoutsById,
  workoutInstanceList,
  workoutInstancesById
});

export default state;

export const getAllExercises = (state) => {
  const ids = fromCreateList.getIds(state.exerciseList);
  return ids.map(id => fromById.getExercise(state.exercisesById, id));
};

export const getExerciseById = (state, id) => {
  const exercise = fromById.getExercise(state.exercisesById, id);
  return exercise;
};

export const getAllWorkouts = (state) => {
  const ids = fromCreateList.getIds(state.workoutList);
  return ids.map(id => fromById.getWorkout(state.workoutsById, id));
};

export const getWorkoutById = (state, id) => {
  const workout = fromById.getWorkout(state.workoutsById, id);
  if(!workout) {
    return {};
  }
  return workout;
};

export const getExercisesForWorkout = (state, workoutId) => {
  const workout = getWorkoutById(state,workoutId);
  if(_.isEmpty(workout)) {
    return [];
  }
  return workout.exercises.reduce((result, id) => {
    const exercise = getExerciseById(state, id);
    if(exercise) {
      result.push(getExerciseById(state, id));
    }
    return result;
  }, []);
};

export const getIsLoading = (state) => 
  fromCreateList.getIsLoading(state.exerciseList) ||
  fromCreateList.getIsLoading(state.workoutList);

export const getErrorMessage = (state, filter) =>
  fromCreateList.getErrorMessage(state.exerciseList);

