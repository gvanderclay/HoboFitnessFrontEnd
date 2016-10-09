import { combineReducers } from 'redux';

const createList = (type) => {
  const ids = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_' + type + 'S_SUCCESS':
        return action.response.result;
      case 'ADD_' + type + '_SUCCESS':
        return [...state, action.response.result]
      default:
        return state;
    }
  };
  
  const active = (state = null, action) => {
    switch(action.type) {
      case 'ADD_' + type + '_SUCCESS':
        return action.response.result;
      default: 
        return state;
    }
  }
  
  const isLoading = (state = false, action) => {
    switch(action.type) {
      case 'FETCH_' + type + '_REQUEST':
      case 'ADD_' + type + '_REQUEST':
        return true;
      case 'FETCH_' + type + 'S_SUCCESS':
      case 'FETCH_' + type + 'S_FAILURE':
      case 'ADD_' + type + '_SUCCESS':
      case 'ADD_' + type + '_FAILURE':
        return false;
      default:
        return state;
    }
  }
  
  const errorMessage = (state = null, action) => {
    switch(action.type) {
      case 'FETCH_' + type + 'S_FAILURE':
      case 'ADD_' + type + '_FAILURE':
        return action.message;
      case 'FETCH_' + type + 'S_SUCCESS':
      case 'ADD_' + type + '_SUCCESS':
        return null;
      default:
        return state;
    }
  }
  
  return combineReducers({
    ids,
    active,
    isLoading,
    errorMessage,
  });
}

export default createList;

export const getIds = state => state.ids;
export const getIsLoading = state => state.isLoading;
export const getErrorMessage = state => state.errorMessage;