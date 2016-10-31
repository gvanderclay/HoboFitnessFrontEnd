import { combineReducers } from 'redux';

const ids = (state = [], action) => {
  switch(action.type) {
    case 'FETCH_WORKOUTS_SUCCESS':
      return action.response.result;
    case 'ADD_WORKOUT_SUCCESS':
      return [...state, action.response.result];
    case 'FETCH_WORKOUT_SUCCESS':
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
    case 'FETCH_WORKOUTS_REQUEST':
    case 'FETCH_WORKOUT_REQUEST':
    case 'ADD_WORKOUT_REQUEST':
    case 'UPDATE_WORKOUT_REQUEST':
    case 'START_WORKOUT_REQUEST':
    case 'COMPLETE_WORKOUT_REQUEST':
      return true;
    case 'FETCH_WORKOUTS_SUCCESS':
    case 'FETCH_WORKOUT_SUCCESS':
    case 'FETCH_WORKOUTS_FAILURE':
    case 'ADD_WORKOUT_SUCCESS':
    case 'ADD_WORKOUT_FAILURE':
    case 'UPDATE_WORKOUT_SUCCESS':
    case 'UPDATE_WORKOUT_FAILURE':
    case 'START_WORKOUT_SUCCESS':
    case 'START_WORKOUT_FAILURE':
    case 'COMPLETE_WORKOUT_SUCCESS':
    case 'COMPLETE_WORKOUT_FAILURE':
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch(action.type) {
    case 'FETCH_WORKOUTS_FAILURE':
    case 'ADD_WORKOUT_FAILURE':
    case 'START_WORKOUT_FAILURE':
    case 'COMPLETE_WORKOUT_FAILURE':
      return action.message;
    case 'FETCH_WORKOUTS_SUCCESS':
    case 'ADD_WORKOUT_SUCCESS':
    case 'START_WORKOUT_SUCCESS':
    case 'COMPLETE_WORKOUT_SUCCESS':
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
