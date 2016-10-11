import { combineReducers } from 'redux';

const ids = (state = [], action) => {
  switch(action.type) {
    case 'FETCH_EXERCISES_SUCCESS':
      return action.response.result;
    case 'ADD_EXERCISE_SUCCESS':
      return [...state, action.response.result]
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch(action.type) {
    case 'FETCH_EXERCISES_REQUEST':
    case 'ADD_EXERCISE_REQUEST':
    case 'UPDATE_EXERCISE_REQUEST':
      return true;
    case 'FETCH_EXERCISES_SUCCESS':
    case 'FETCH_EXERCISES_FAILURE':
    case 'ADD_EXERCISE_SUCCESS':
    case 'ADD_EXERCISE_FAILURE':
    case 'UPDATE_EXERCISE_SUCCESS':
    case 'UPDATE_EXERCISE_FAILURE':
      return false;
    default:
      return state;
  }
}

const errorMessage = (state = null, action) => {
  switch(action.type) {
    case 'FETCH_EXERCISES_FAILURE':
    case 'ADD_EXERCISE_FAILURE':
      return action.message;
    case 'FETCH_EXERCISES_SUCCESS':
    case 'ADD_EXERCISE_SUCCESS':
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  ids,
  isLoading,
  errorMessage,
});

export const getIds = state => state.ids;
export const getIsLoading = state => state.isLoading;
export const getErrorMessage = state => state.errorMess