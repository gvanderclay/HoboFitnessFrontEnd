import {
    normalize
} from 'normalizr';
import _ from 'lodash';
import * as schema from './schema';
import * as api from '../api';
import {
    getIsLoading
} from '../reducers';

export const fetchExercises = () => (dispatch, getState) => {
    if (getIsLoading(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_EXERCISES_REQUEST'
    });

    return api.fetchExercises().then(
        response => {
            dispatch({
                type: 'FETCH_EXERCISES_SUCCESS',
                response: normalize(response, schema.arrayOfExercises)
            });
        }
    );
};

export const addExercise = (name, reps, sets, weight) => (dispatch, getState) => {
    if (getIsLoading(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'ADD_EXERCISE_REQUEST'
    });

    const exercise = api.addExercise(name, reps, sets, weight).then(
        response => {
            dispatch({
                type: 'ADD_EXERCISE_SUCCESS',
                response: normalize(response, schema.exercise)
            });
            return Promise.resolve(response);
        },
        error => {
            dispatch({
                type: 'ADD_EXERCISE_FAILURE',
                message: error.message || 'Something went wrong'
            });
            return Promise.resolve(error);
        }
    );
    return exercise;
};

export const updateExercise = (id, name, reps, sets, weight) => (dispatch, getState) => {
    if (getIsLoading(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'UPDATE_EXERCISE_REQUEST'
    });

    const exercise = api.updateExercise(id, name, reps, sets, weight).then(
        response => {
            dispatch({
                type: 'UPDATE_EXERCISE_SUCCESS',
                response: normalize(response, schema.exercise)
            });
            return Promise.resolve(response);
        },
        error => {
            dispatch({
                type: 'UPDATE_EXERCISE_FAILURE',
                message: error.message || 'Something went wrong'
            });
            return Promise.resolve(error);
        }
    );
    return exercise;
};

export const startExercise = (id) => (dispatch, getState) => {
    if (getIsLoading(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'START_EXERCISE_REQUEST'
    });

    const activeExercise = api.fetchExercise(id).then(
        response => {
            let setsPerRep = [];
            _.times(response.sets, (index) => {
              setsPerRep[index] = -1;
            });
            dispatch({
              type: 'START_EXERCISE_SUCCESS',
              exerciseId: response.id,
              setsPerRep
            });
        },
        error => {

        }
    );
    return activeExercise;
};

export const setActiveExerciseSet = (index, sets) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  const setsPerRep = getState().activeExercise.setsPerRep;
  const newSetsPerRep = [...setsPerRep.slice(0, index), sets, ...setsPerRep.slice(index + 1)];
  dispatch({
    type: 'SET_ACTIVE_SET',
    setsPerRep: newSetsPerRep
  });
  return setsPerRep;
};

export const completeActiveExercise = () => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'COMPLETE_EXERCISE_REQUEST'
  });
  const activeExercise = getState().activeExercise;
  const completedExercise = api.addCompletedExercise(activeExercise).then(
    response => {
      dispatch({
        type: 'COMPLETE_EXERCISE_SUCCESS',
        completedExercise: response
      });
    },
    error => {

    }
  );
  return completedExercise;
};

export const fetchWorkouts = () => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_WORKOUTS_REQUEST'
  });

  return api.fetchWorkouts().then(
    response => {
      dispatch({
        type: 'FETCH_WORKOUTS_SUCCESS',
        response: normalize(response, schema.arrayOfWorkouts)
      });
    }
  );
};

export const fetchWorkout = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_WORKOUT_REQUEST'
  });

  return api.fetchWorkout(id).then(
    response => {
      dispatch({
        type: 'FETCH_WORKOUT_SUCCESS',
        response: normalize(response, schema.workout)
      });
      dispatch(fetchExercises());
    }
  );
};


export const addWorkout = (name) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'ADD_WORKOUT_REQUEST'
  });

  const workout = api.addWorkout(name).then(
    response => {
      dispatch({
        type: 'ADD_WORKOUT_SUCCESS',
        response: normalize(response, schema.workout)
      });
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'ADD_WORKOUT_FAILURE',
        message: error.message || 'Something went wrong'
      });
      return Promise.resolve(error);
    }
  );
  return workout;
};

export const updateWorkout = (id, name, newExercise) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'UPDATE_WORKOUT_REQUEST'
  });

  const workout = api.updateWorkout(id, name, newExercise).then(
    response => {
      dispatch({
        type: 'UPDATE_WORKOUT_SUCCESS',
        response: normalize(response, schema.workout)
      });
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'UPDATE_WORKOUT_FAILURE',
        message: error.message || 'Something went wrong'
      });
    }
  );
  return workout;
};

export const deleteWorkout = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'DELETE_WORKOUT_REQUEST'
  });

  // index of the deleted workout is returned
  const workout = api.deleteWorkout(id).then(
    response => {
      dispatch({
        type: 'DELETE_WORKOUT_SUCCESS',
        index: response
      });
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'DELETE_WORKOUT_FAILURE',
        message: error.message || 'Something went wrong'
      });
    }
  );
  return workout;
};
