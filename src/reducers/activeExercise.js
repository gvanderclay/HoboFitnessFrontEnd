export const activeExercise = (state = {}, action) => {
  switch(action.type) {
    case 'START_EXERCISE_SUCCESS':
      return action.activeExercise;
    case 'COMPLETE_EXERCISE_SUCCESS':
    	return {};
    default:
      return state
  }
}

export default activeExercise;