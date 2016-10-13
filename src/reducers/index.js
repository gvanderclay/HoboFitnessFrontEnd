import { combineReducers } from 'redux';
import  * as fromById from './byId';
import exerciseList from './exerciseList';
import activeExercise from './activeExercise';
import * as fromList from './createList';

// const routineList = createList('ROUTINE');
// const workoutList = createList('WORKOUT');

// const routinesById = fromById.routinesById;
// const workoutsById = fromById.workoutsById;
const exercisesById = fromById.exercisesById;

const routines = combineReducers({
  exerciseList,
  exercisesById,
  activeExercise
});

export default routines;

export const getAllExercises = (state) => {
  const ids = fromList.getIds(state.exerciseList);
  return ids.map(id => fromById.getExercise(state.exercisesById, id));
};

export const getExerciseById = (state, id) => {
  const exercise = fromById.getExercise(state.exercisesById, id);
  return exercise;
};

export const getIsLoading = (state) =>
  fromList.getIsLoading(state.exerciseList);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.exerciseList);

// export const getAllRoutines = (state) => {
//   const ids = fromList.getIds(state.routineList);
//   return ids.map(id => fromById.getRoutine(state.routinesById, id));
// }

// export const getRoutineById = (state, id) => {
//   const test = fromById.getRoutine(state.routinesById, id);
//   return test;
// }

// export const getActiveRoutine = (state) => 
//   state.routineList.active; 

// export const getIsLoading = (state) => 
//   fromList.getIsLoading(state.routineList);
  
// export const getErrorMessage = (state, filter) => 
//   fromList.getErrorMessage(state.routineList);
  
// export const getRoutineWorkouts = (state, id) => {
//   const routineWorkoutList = fromById.getRoutine(state.routinesById, id).workouts;
//   const workoutIds = fromList.getIds(state.workoutList);
//   return workoutIds.filter(id => routineWorkoutList.indexOf(id) > -1); 
// }
