import { combineReducers } from 'redux';
import  * as fromById from './byId';
import exerciseList from './exerciseList';
import activeExercise from './activeExercise';
import completedExercises from './completedExercise';
import workoutList from './workoutList';
import * as fromExerciseList from './exerciseList';
import * as fromWorkoutList from './workoutList';

// const routineList = createList('ROUTINE');
// const workoutList = createList('WORKOUT');

// const routinesById = fromById.routinesById;
// const workoutsById = fromById.workoutsById;
const exercisesById = fromById.exercisesById;

const workoutsById = fromById.workoutsById;

const routines = combineReducers({
  exerciseList,
  exercisesById,
  activeExercise,
  completedExercises,
  workoutList,
  workoutsById
});

export default routines;

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
  return workout;
};

export const getExercisesForWorkout = (state, workoutId) => {
  const workout = getWorkoutById(state,workoutId);
  if(!workout) {
    return null;
  }
  return workout.exercises.map(id => getExerciseById(state, id));
};

export const getIsLoading = (state) =>
  fromExerciseList.getIsLoading(state.exerciseList) ||
  fromWorkoutList.getIsLoading(state.workoutList);

export const getErrorMessage = (state, filter) =>
  fromExerciseList.getErrorMessage(state.exerciseList);

// export const getAllRoutines = (state) => {
//   const ids = fromExerciseList.getIds(state.routineList);
//   return ids.map(id => fromById.getRoutine(state.routinesById, id));
// }

// export const getRoutineById = (state, id) => {
//   const test = fromById.getRoutine(state.routinesById, id);
//   return test;
// }

// export const getActiveRoutine = (state) => 
//   state.routineList.active; 

// export const getIsLoading = (state) => 
//   fromExerciseList.getIsLoading(state.routineList);
  
// export const getErrorMessage = (state, filter) => 
//   fromExerciseList.getErrorMessage(state.routineList);
  
// export const getRoutineWorkouts = (state, id) => {
//   const routineWorkoutList = fromById.getRoutine(state.routinesById, id).workouts;
//   const workoutIds = fromExerciseList.getIds(state.workoutList);
//   return workoutIds.filter(id => routineWorkoutList.indexOf(id) > -1); 
// }
