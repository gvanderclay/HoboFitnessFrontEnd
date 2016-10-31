import { combineReducers } from 'redux';

const ids = (state = [], action) => {
  switch(action.type) {
    case 'FETCH_EXERCISE_INSTANCES_SUCCESS':
      return action.response.result;
    case 'ADD_EXERCISE_INSTANCE_SUCCESS':
      return [...state, action.response.result];
    case 'FETCH_EXERCISE_INSTANCE_SUCCESS':
      const index = state.indexOf(action.response.result);
      return [
        ...state.slice(0, index),
        action.response.result,
        ...state.slice(index+1)
      ];
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch(action.type) {
    case 'FETCH_EXERCISE_INSTANCES_REQUEST':
    case 'FETCH_EXERCISE_INSTANCE_REQUEST':
    case 'ADD_EXERCISE_INSTANCE_REQUEST':
    case 'UPDATE_EXERCISE_INSTANCE_REQUEST':
    case 'START_EXERCISE_INSTANCE_REQUEST':
    case 'COMPLETE_EXERCISE_INSTANCE_REQUEST':
      return true;
    case 'FETCH_EXERCISE_INSTANCES_SUCCESS':
    case 'FETCH_EXERCISE_INSTANCE_SUCCESS':
    case 'FETCH_EXERCISE_INSTANCES_FAILURE':
    case 'ADD_EXERCISE_INSTANCE_SUCCESS':
    case 'ADD_EXERCISE_INSTANCE_FAILURE':
    case 'UPDATE_EXERCISE_INSTANCE_SUCCESS':
    case 'UPDATE_EXERCISE_INSTANCE_FAILURE':
    case 'START_EXERCISE_INSTANCE_SUCCESS':
    case 'START_EXERCISE_INSTANCE_FAILURE':
    case 'COMPLETE_EXERCISE_INSTANCE_SUCCESS':
    case 'COMPLETE_EXERCISE_INSTANCE_FAILURE':
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch(action.type) {
    case 'FETCH_EXERCISE_INSTANCES_FAILURE':
    case 'ADD_EXERCISE_INSTANCE_FAILURE':
    case 'START_EXERCISE_INSTANCE_FAILURE':
    case 'COMPLETE_EXERCISE_INSTANCE_FAILURE':
      return action.message;
    case 'FETCH_EXERCISE_INSTANCES_SUCCESS':
    case 'ADD_EXERCISE_INSTANCE_SUCCESS':
    case 'START_EXERCISE_INSTANCE_SUCCESS':
    case 'COMPLETE_EXERCISE_INSTANCE_SUCCESS':
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  isLoading,
  errorMessage
});

export const getIds = state => state.ids;
export const getIsLoading = state => state.isLoading;
export const getErrorMessage = state => state.errorMessage;
