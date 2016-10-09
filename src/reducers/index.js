import { combineReducers } from 'redux';
import  * as fromById from './byId';
import createList, * as fromList from './createList';

const routineList = createList('ROUTINE');
const workoutList = createList('WORKOUT');

const routinesById = fromById.routinesById;
const workoutsById = fromById.workoutsById;

const routines = combineReducers({
  routinesById,
  workoutsById,
  routineList,
  workoutList,
})

export default routines;

export const getAllRoutines = (state) => {
  const ids = fromList.getIds(state.routineList);
  return ids.map(id => fromById.getRoutine(state.routinesById, id));
}

export const getActiveRoutine = (state) => 
  state.routineList.active; 


export const getIsLoading = (state) => 
  fromList.getIsLoading(state.routineList);
  
export const getErrorMessage = (state, filter) => 
  fromList.getErrorMessage(state.routineList);
  
  