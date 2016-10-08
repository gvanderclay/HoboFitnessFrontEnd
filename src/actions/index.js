import * as api from '../api';
import { getIsLoading } from '../reducers';

export const fetchRoutines = (filter) => (dispatch, getState) => {
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
                response,
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
    
    api.addRoutine(title).then(
        response => {
            dispatch({
                type: 'ADD_ROUTINE_SUCCESS',
                response,
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
    