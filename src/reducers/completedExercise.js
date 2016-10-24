const completedExercises = (state = [], action) => {
  switch(action.type) {
    case 'COMPLETE_EXERCISE_SUCCESS':
      return [...state, action.completedExercise];
    default:
      return state;
  }
};

export default completedExercises;
