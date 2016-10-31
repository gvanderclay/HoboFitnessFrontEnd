export const exercisesById = (state = {}, action) => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities.exercises
    };
  }
  return state;
};

export const workoutsById = (state= {}, action) => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities.workouts
    };
  }
  return state;
};

export const workoutInstancesById = (state = {}, action) => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities.workoutInstances
    };
  }
  return state;
};

export const exerciseInstancesById = (state = {}, action) => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities.exerciseInstances
    };
  }
  return state;
};

export const getExercise = (state, id) => state[id];

export const getWorkout = (state, id) => state[id];

export const getWorkoutInstance = (state, id) => state[id];

export const getExerciseInstance = (state, id) => state[id];
