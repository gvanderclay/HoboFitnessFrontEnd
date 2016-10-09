export const routinesById = (state = {}, action) => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities.routines,
    }
  } 
  return state;
};

export const workoutsById = (state = {}, action) => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities.workouts,
    }
  }
  return state;
}


export const getRoutine = (state, id) => state[id];