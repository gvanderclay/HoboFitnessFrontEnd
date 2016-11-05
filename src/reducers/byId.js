const createById = (objects) => (state = {}, action) => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities[objects]
    };
  }
  return state;
};


export const exercisesById = createById("exercises");

export const workoutsById = createById("workouts");

export const workoutInstancesById = createById("workoutInstances");

export const exerciseInstancesById = createById("exerciseInstances");

export const getExercise = (state, id) => state[id];

export const getWorkout = (state, id) => state[id];

export const getWorkoutInstance = (state, id) => state[id];

export const getExerciseInstance = (state, id) => state[id];
