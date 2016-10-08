import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const routineList = createList();

const routines = combineReducers({
  byId,
  routineList,
})

export default routines;

export const getAllRoutines = (state) => {
  const ids = fromList.getIds(state.list);
  return ids.map(id => fromById.getRoutine(state.byId, id));
}

export const getIsLoading = (state) => 
  fromList.getIsLoading(state.routineList);
  
export const getErrorMessage = (state, filter) => 
  fromList.getErrorMessage(state.routineList);