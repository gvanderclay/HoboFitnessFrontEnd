import { combineReducers } from 'redux';

const exerciseId = (state = null, action) => {
  switch(action.type) {
    case 'START_EXERCISE_SUCCESS':
      return action.exerciseId;
    case 'COMPLETE_EXERCISE_SUCCESS':
      return null;
    default:
      return state;
  }
};

const repsPerSet = (state = [], action) => {
  switch(action.type) {
    case 'START_EXERCISE_SUCCESS':
      return action.repsPerSet;
    case 'COMPLETE_EXERCISE_SUCCESS':
      return [];
    case 'SET_ACTIVE_SET':
      return action.repsPerSet;
    default:
      return state;
  }
};



export default combineReducers({
  exerciseId,
  repsPerSet
});

export const getRepsOnSet = (state, index) => {
  return state.repsPerSet[index];
};
