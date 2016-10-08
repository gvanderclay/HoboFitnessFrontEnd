import { combineReducers } from 'redux';

const createList = () => {
  const ids = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_ROUTINES_SUCCESS':
        return action.response.map(routine => routine.id);
      case 'ADD_ROUTINE_SUCCESS':
        return [...state, action.response.id]
      default:
        return state;
    }
  };
  
  const isLoading = (state = false, action) => {
    switch(action.type) {
      case 'FETCH_ROUTINES_REQUEST':
      case 'ADD_ROUTINE_REQUEST':
        return true;
      case 'FETCH_ROUTINES_SUCCESS':
      case 'FETCH_ROUTINES_FAILURE':
        return false;
      default:
        return state;
    }
  }
  
  const errorMessage = (state = null, action) => {
    switch(action.type) {
      case 'FETCH_ROUTINES_FAILURE':
      case 'ADD_ROUTINE_FAILURE':
        return action.message;
      case 'FETCH_ROUTINES_SUCCESS':
      case 'ADD_ROUTINE_SUCCESS':
        return null;
      default:
        return state;
    }
  }
  
  return combineReducers({
    ids,
    isLoading,
    errorMessage,
  });
}

export default createList;

export const getIds = state => state.ids;
export const getIsLoading = state => state.isLoading;
export const getErrorMessage = state => state.errorMessage;