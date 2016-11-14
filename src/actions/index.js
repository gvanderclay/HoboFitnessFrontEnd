import {
    normalize
} from 'normalizr';
import _ from 'lodash';
import toSnakeCase from 'to-snake-case';
import * as schema from './schema';
import * as api from '../api';
import {
    getIsLoading
} from '../reducers';

const fetchEntities = (entity) => () => (dispatch, getState) => {
  if (getIsLoading(getState())) {
    return Promise.resolve();
  }

  var type = `FETCH_${toSnakeCase(entity).toUpperCase()}S_REQUEST`;
  dispatch({
    type: `FETCH_${toSnakeCase(entity).toUpperCase()}S_REQUEST`
  });

  const capitalized = entity.charAt(0).toUpperCase(0) + entity.slice(1);
  return api[`fetch${capitalized}s`]().then(
    response => {
      dispatch({
        type: `FETCH_${toSnakeCase(entity).toUpperCase()}S_SUCCESS`,
        response: normalize(response, schema[`arrayOf${capitalized}s`])
      });
    }
  );
};

export const fetchExercises = fetchEntities("exercise");

export const fetchWorkouts = fetchEntities("workout");

export const fetchExerciseInstances = fetchEntities("exerciseInstance");

export const fetchWorkoutInstances = fetchEntities("workoutInstance");

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

export const addExerciseInstance = (id) => (dispatch, getState) => {
    if (getIsLoading(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'ADD_EXERCISE_INSTANCE_REQUEST'
    });

    const exerciseInstance = api.addExerciseInstance(id).then(
        response => {
            let repsPerSet = [];
            _.times(response.sets, (index) => {
              repsPerSet[index] = -1;
            });
            dispatch({
              type: 'ADD_EXERCISE_INSTANCE_SUCCESS',
              response: normalize(response, schema.exerciseInstance)
            });
          return Promise.resolve(response);
        },
        error => {

        }
    );
    return exerciseInstance;
};

export const fetchExerciseInstance = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_EXERCISE_INSTANCE_REQUEST'
  });

  return api.fetchExerciseInstance(id).then(
    response => {
      dispatch({
        type: 'FETCH_EXERCISE_INSTANCE_SUCCESS',
        response: normalize(response, schema.exerciseInstance)
      });
      dispatch(fetchExercises());
    }
  );
};

export const setExerciseInstanceSet = (id, setNumber, reps) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'UPDATE_EXERCISE_INSTANCE_REQUEST'
  });

  return api.setExerciseInstanceSet(id, setNumber, reps).then(
    response => {
      dispatch({
        type: 'UPDATE_EXERCISE_INSTANCE_SUCCESS',
        response: normalize(response, schema.exerciseInstance)
      });
    }
  );
};

export const completeExerciseInstance = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'UPDATE_EXERCISE_INSTANCE_REQUEST'
  });

  return api.completeExerciseInstance(id).then(
    response => {
      dispatch({
        type: 'UPDATE_EXERCISE_INSTANCE_SUCCESS',
        response: normalize(response, schema.exerciseInstance)
      });
    }
  );
};

export const completeWorkoutInstance = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'UPDATE_WORKOUT_INSTANCE_REQUEST'
  });

  return api.completeWorkoutInstance(id).then(
    response => {
      dispatch({
        type: 'UPDATE_WORKOUT_INSTANCE_SUCCESS',
        response: normalize(response, schema.workoutInstance)
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

export const addWorkoutInstance = (workoutId) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'ADD_WORKOUT_INSTANCE_REQUEST'
  });

  const workoutInstance = api.addWorkoutInstance(workoutId).then(
    response => {
      dispatch({
        type: 'ADD_WORKOUT_INSTANCE_SUCCESS',
        response: normalize(response, schema.workoutInstance)
      });
      fetchExerciseInstances();
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'ADD_WORKOUT_INSTANCE_FAILURE',
        message: error.message || 'Something went wrong'
      });
      return Promise.resolve(error);
    }
  );
  return workoutInstance;

};

export const fetchWorkoutInstance = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_WORKOUT_INSTANCE_REQUEST'
  });

  return api.fetchWorkoutInstance(id).then(
    response => {
      dispatch({
        type: 'FETCH_WORKOUT_INSTANCE_SUCCESS',
        response: normalize(response, schema.workoutInstance)
      });
      dispatch(fetchExerciseInstances()).then(() => {
        dispatch(fetchExercises());
      });
    }
  );
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
