import { combineReducers } from 'redux';

const createList = (object) => {

  object = object.toUpperCase();

  const ids = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_' + object + 'S_SUCCESS':
        return action.response.result;
      case 'ADD_' + object + '_SUCCESS':
        return [...state, action.response.result];
      case 'FETCH_' + object + '_SUCCESS':
        const index = state.indexOf(action.response.result);
        return [
          ...state.slice(0, index),
          action.response.result,
          ...state.slice(index+1)
        ];
      case 'DELETE_' + object + '_SUCCESS':
        return [
          ...state.slice(0, action.index),
          ...state.slice(action.index + 1)
        ];
      default:
        return state;
    }
  };

  const isLoading = (state = false, action) => {
    switch(action.type) {
      case 'FETCH_' + object + 'S_REQUEST':
      case 'FETCH_' + object + '_REQUEST':
      case 'ADD_' + object + '_REQUEST':
      case 'UPDATE_' + object + '_REQUEST':
      case 'START_' + object + '_REQUEST':
      case 'COMPLETE_' + object + '_REQUEST':
      case 'DELETE_' + object + '_CONTAINER':
        return true;
      case 'FETCH_' + object + 'S_SUCCESS':
      case 'FETCH_' + object + '_SUCCESS':
      case 'FETCH_' + object + 'S_FAILURE':
      case 'ADD_' + object + '_SUCCESS':
      case 'ADD_' + object + '_FAILURE':
      case 'UPDATE_' + object + '_SUCCESS':
      case 'UPDATE_' + object + '_FAILURE':
      case 'START_' + object + '_SUCCESS':
      case 'START_' + object + '_FAILURE':
      case 'COMPLETE_' + object + '_SUCCESS':
      case 'COMPLETE_' + object + '_FAILURE':
      case 'DELETE_' + object + '_SUCCESS':
      case 'DELETE_' + object + '_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    switch(action.type) {
      case 'FETCH_' + object + 'S_FAILURE':
      case 'ADD_' + object + '_FAILURE':
      case 'START_' + object + '_FAILURE':
      case 'COMPLETE_' + object + '_FAILURE':
        return action.message;
      case 'FETCH_' + object + 'S_SUCCESS':
      case 'ADD_' + object + '_SUCCESS':
      case 'START_' + object + '_SUCCESS':
      case 'COMPLETE_' + object + '_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isLoading,
    errorMessage
  });
};

export default createList;

export const getIds = state => state.ids;
export const getIsLoading = state => state.isLoading;
export const getErrorMessage = state => state.errorMessage;
