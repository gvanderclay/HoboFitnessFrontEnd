import { combineReducers } from 'redux';
import _ from 'lodash';
import  * as fromById from './byId';
import exerciseList from './exerciseList';
import activeExercise from './activeExercise';
import completedExercises from './completedExercise';
import workoutList from './workoutList';
import workoutInstanceList from './workoutInstanceList';
import exerciseInstanceList from './exerciseInstanceList';
import * as fromExerciseList from './exerciseList';
import * as fromWorkoutList from './workoutList';
import * as fromExerciseInstanceList from './exerciseInstanceList';
import * as fromWorkoutInstanceList from './workoutInstanceList';

const exercisesById = fromById.exercisesById;
const workoutsById = fromById.workoutsById;
const exerciseInstancesById = fromById.exerciseInstancesById;
const workoutInstancesById = fromById.workoutInstancesById;

const state = combineReducers({
  exerciseList,
  exercisesById,
  exerciseInstanceList,
  exerciseInstancesById,
  activeExercise,
  completedExercises,
  workoutList,
  workoutsById,
  workoutInstanceList,
  workoutInstancesById
});

export default state;

export const getAllExercises = (state) => {
  const ids = fromExerciseList.getIds(state.exerciseList);
  return ids.map(id => fromById.getExercise(state.exercisesById, id));
};

export const getExerciseById = (state, id) => {
  const exercise = fromById.getExercise(state.exercisesById, id);
  return exercise;
};

export const getAllWorkouts = (state) => {
  const ids = fromWorkoutList.getIds(state.workoutList);
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
  fromExerciseList.getIsLoading(state.exerciseList) ||
  fromWorkoutList.getIsLoading(state.workoutList);

export const getErrorMessage = (state, filter) =>
  fromExerciseList.getErrorMessage(state.exerciseList);

