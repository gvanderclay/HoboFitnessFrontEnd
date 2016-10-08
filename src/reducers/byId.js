const byId = (state = {}, action) => {
  switch(action.type) {
    case 'FETCH_ROUTINES_SUCCESS':
      const nextState = {...state};
      action.response.forEach(routine => {
        nextState[routine.id] = routine;
      });
      return nextState;
    case 'ADD_ROUTINE_SUCCESS':
      return {
        ...state,
        [action.response.id]: action.response,
      };
    default:
      return state;
  }
};

export default byId;

export const getRoutine = (state, id) => state[id];