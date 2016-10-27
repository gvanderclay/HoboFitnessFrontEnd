// export const routinesById = (state = {}, action) => {
//   if(action.response) {
//     return {
//       ...state,
//       ...action.response.entities.routines,
//     }
//   } 
//   return state;
// };

// export const workoutsById = (state = {}, action) => {
//   if(action.response) {
//     return {
//       ...state,
//       ...action.response.entities.workouts,
//     }
//   }
//   return state;
// }

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


export const getExercise = (state, id) => state[id];

export const getWorkout = (state, id) => state[id];
