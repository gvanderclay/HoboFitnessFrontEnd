import { normalize } from 'normalizr';
import * as schema from './schema';
import * as api from '../api';
import { getIsLoading } from '../reducers';

export const fetchExercises = () => (dispatch, getState) => {
    if(getIsLoading(getState())) {
        return Promise.resolve();
    }
    
    dispatch({
        type: 'FETCH_EXERCISES_REQUEST',
    })
    
    return api.fetchExercises().then(
        response => {
            dispatch({
                type: 'FETCH_EXERCISES_SUCCESS',
                response: normalize(response, schema.arrayOfExercises),
            })
        }
    )
}

export const addExercise = (name, reps, sets, weight) => (dispatch, getState) => {
    if(getIsLoading(getState())) {
        return Promise.resolve();
    }
    
    dispatch({
        type: 'ADD_EXERCISE_REQUEST'
    });
    
    const exercise = api.addExercise(name, reps, sets, weight).then(
        response => {
            dispatch({
                type: 'ADD_EXERCISE_SUCCESS',
                response: normalize(response, schema.exercise),
            })
            return Promise.resolve(response);
        },
        error => {
            dispatch({
                type: 'ADD_EXERCISE_FAILURE',
                message: error.message || 'Something went wrong',
            })
            return Promise.resolve(error);
        }
    );
     return exercise;
}

// export const fetchRoutines = () => (dispatch, getState) => {
//     if (getIsLoading(getState())) {
//         return Promise.resolve();
//     }
    
//     dispatch({
//         type: 'FETCH_ROUTINES_REQUEST'
//     });
    
//     return api.fetchRoutines().then(
//         response => {
//             dispatch({
//                 type: 'FETCH_ROUTINES_SUCCESS',
//                 response: normalize(response, schema.arrayOfRoutines) ,
//             });
//         },
//         error => {
//             dispatch({
//                 type: 'FETCH_ROUTINES_FAILURE',
//                 message: error.message || 'Something went wrong.',
//             });
//         }
//     );
// };

// export const addRoutine = (title) => (dispatch, getState) => {
//     if(getIsLoading(getState())) {
//         return Promise.resolve();
//     }
    
//     dispatch({
//         type: 'ADD_ROUTINE_REQUEST'
//     });
    
//     return api.addRoutine(title).then(
//         response => {
//             dispatch({
//                 type: 'ADD_ROUTINE_SUCCESS',
//                 response: normalize(response, schema.routine),
//             })
//             return Promise.resolve(response);
//         },
//         error => {
//             dispatch({
//                 type: 'ADD_ROUTINE_FAILURE',
//                 message: error.message || 'Something went wrong',
//             })
//             return Promise.resolve(error);
//         }
//     );
// }

// export const fetchWorkouts = () => (dispatch, getState) => {
//     if (getIsLoading(getState())) {
//         return Promise.resolve();
//     }
    
//     dispatch({
//         type: 'FETCH_WORKOUTS_REQUEST'
//     });
    
//     return api.fetchRoutines().then(
//         response => {
//             dispatch({
//                 type: 'FETCH_WORKOUTS_SUCCESS',
//                 response: normalize(response, schema.arrayOfRoutines) ,
//             });
//         },
//         error => {
//             dispatch({
//                 type: 'FETCH_WORKOUTS_FAILURE',
//                 message: error.message || 'Something went wrong.',
//             });
//         }
//     )    
// }

// export const fetchWorkoutsForRoutine = (id) => (dispatch, getState) => {
//     if (getIsLoading(getState())) {
//         return Promise.resolve();
//     }
    
//     dispatch({
//         type: 'FETCH_WORKOUTS_REQUEST',
//     });
    
//     return api.fetchWorkoutsForRoutine(id).then(
//         response => {
//             dispatch({
//                 type: 'FETCH_WORKOUTS_SUCCESS',
//                 response: normalize(response, schema.arrayOfWorkouts) ,
//             });
//             return Promise.resolve(response)
//         },
//         error => {
//             dispatch({
//                 type: 'FETCH_WORKOUTS_FAILURE',
//                 message: error.message || 'Something went wrong.',
//             });
//             return Promise.reject(error);
//         }
//     );
// };

// export const addWorkoutToRoutine = (title, id) => (dispatch, getState) => {
//     if(getIsLoading(getState())) {
//         return Promise.resolve();
//     }
    
//     dispatch({
//         type: 'ADD_WORKOUT_REQUEST',
//         title: title,
//     });
    
//     return api.addWorkoutToRoutine(title, id).then(
//         response => {
//             dispatch({
//                 type: 'ADD_WORKOUT_SUCCESS',
//                 response: normalize(response, schema.workout),
//                 routineId: id,
//             })
//             return Promise.resolve(response)
//         },
//         error => {
//             dispatch({
//                 type: 'ADD_WORKOUT_FAILURE',
//                 message: error.message || 'Something went wrong',
//             })
//             return Promise.reject(error);
//         }
//     );
// }

// export const updateRoutine = (id, title, workouts) => (dispatch, getState) => {
//     if(getIsLoading(getState())) {
//         return Promise.resolve();
//     }
    
//     dispatch({
//         type: 'UPDATE_ROUTINE_REQUEST',
//         title,
//         workouts,
//     });
    
//     return api.updateRoutine(id, title, workouts).then(
//         response => {
//             dispatch({
//                 type: 'UPDATE_ROUTINE_SUCCESS',
//                 response: normalize(response, schema.routine)
//             })
//             return Promise.resolve(response);
//         },
//         error => {
//             dispatch({
//                 type: 'UPDATE_WORKOUT_FAILURE',
//                 message: error.message || 'Something went wrong',
//             })
//             return Promise.reject(error)
//         }
//     )
// }