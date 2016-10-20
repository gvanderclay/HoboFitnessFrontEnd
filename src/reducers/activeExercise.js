import { combineReducers } from 'redux';

const INITIAL_STATE = {exerciseId: null, setsPerRep: []};

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

const setsPerRep = (state = [], action) => {
  switch(action.type) {
    case 'START_EXERCISE_SUCCESS':
      return action.setsPerRep;
    case 'COMPLETE_EXERCISE_SUCCESS':
      return [];
    case 'SET_ACTIVE_SET':
      return action.setsPerRep;
    default:
      return state;
  }
};



export default combineReducers({
  exerciseId,
  setsPerRep
});

export const getRepsOnSet = (state, index) => {
  return state.setsPerRep[index];
};
