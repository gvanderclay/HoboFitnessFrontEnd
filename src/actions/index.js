import { normalize } from 'normalizr';
import * as schema from './schema';
import * as api from '../api';
import { getIsLoading } from '../reducers';

export const fetchRoutines = () => (dispatch, getState) => {
    if (getIsLoading(getState())) {
        return Promise.resolve();
    }
    
    dispatch({
        type: 'FETCH_ROUTINES_REQUEST'
    });
    
    return api.fetchRoutines().then(
        response => {
            dispatch({
                type: 'FETCH_ROUTINES_SUCCESS',
                response: normalize(response, schema.arrayOfRoutines) ,
            });
        },
        error => {
            dispatch({
                type: 'FETCH_ROUTINES_FAILURE',
                message: error.message || 'Something went wrong.',
            });
        }
    );
};

export const addRoutine = (title) => (dispatch, getState) => {
    if(getIsLoading(getState())) {
        return Promise.resolve();
    }
    
    dispatch({
        type: 'ADD_ROUTINE_REQUEST'
    });
    
    return api.addRoutine(title).then(
        response => {
            dispatch({
                type: 'ADD_ROUTINE_SUCCESS',
                response: normalize(response, schema.routine),
            })
        },
        error => {
            dispatch({
                type: 'ADD_ROUTINE_FAILURE',
                message: error.message || 'Something went wrong',
            })
        }
    );
}

export const fetchWorkouts = () => (dispatch, getState) => {
    if (getIsLoading(getState())) {
        return Promise.resolve();
    }
    
    dispatch({
        type: 'FETCH_WORKOUTS_REQUEST'
    });
    
    return api.fetchRoutines().then(
        response => {
            dispatch({
                type: 'FETCH_WORKOUTS_SUCCESS',
                response: normalize(response, schema.arrayOfWorkouts) ,
            });
        },
        error => {
            dispatch({
                type: 'FETCH_WORKOUTS_FAILURE',
                message: error.message || 'Something went wrong.',
            });
        }
    );
};

export const addWorkout = (title) => (dispatch, getState) => {
    if(getIsLoading(getState())) {
        return Promise.resolve();
    }
    
    dispatch({
        type: 'ADD_WORKOUT_REQUEST'
    });
    
    return api.addRoutine(title).then(
        response => {
            dispatch({
                type: 'ADD_WORKOUT_SUCCESS',
                response: normalize(response, schema.workout),
            })
        },
        error => {
            dispatch({
                type: 'ADD_WORKOUT_FAILURE',
                message: error.message || 'Something went wrong',
            })
        }
    );
}