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

export const fetchExercises = fetchEntities("workout");

export const fetchExerciseInstances = fetchEntities("exerciseInstance");

export const fetchExerciseInstances = fetchEntities("workoutInstance");

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

export const setExerciseInstanceWeight = (id, weight) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'UPDATE_EXERCISE_INSTANCE_REQUEST'
  });

  return api.setExerciseInstanceWeight(id, weight).then(
    response => {
      dispatch({
        type: 'UPDATE_EXERCISE_INSTANCE_SUCCESS',
        response: normalize(response, schema.exerciseInstance)
      });
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
      return Promise.resolve(response);
    }
  );
};


export const fetchExercise = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_EXERCISE_REQUEST'
  });

  return api.fetchExercise(id).then(
    response => {
      dispatch({
        type: 'FETCH_EXERCISE_SUCCESS',
        response: normalize(response, schema.exercise)
      });
      dispatch(fetchExercises());
    }
  );
};


export const addExercise = (name) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'ADD_EXERCISE_REQUEST'
  });

  const exercise = api.addWorkout(name).then(
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

export const addExerciseInstance = (workoutId) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'ADD_EXERCISE_INSTANCE_REQUEST'
  });

  const exerciseInstance = api.addWorkoutInstance(workoutId).then(
    response => {
      dispatch({
        type: 'ADD_EXERCISE_INSTANCE_SUCCESS',
        response: normalize(response, schema.exerciseInstance)
      });
      fetchExerciseInstances();
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'ADD_EXERCISE_INSTANCE_FAILURE',
        message: error.message || 'Something went wrong'
      });
      return Promise.resolve(error);
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
      dispatch(fetchExerciseInstances()).then(() => {
        dispatch(fetchExercises());
      });
    }
  );
};

export const updateExercise = (id, name, newExercise) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'UPDATE_EXERCISE_REQUEST'
  });

  const exercise = api.updateWorkout(id, name, newExercise).then(
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
    }
  );
  return exercise;
};

export const deleteExercise = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'DELETE_EXERCISE_REQUEST'
  });

  // index of the deleted exercise is returned
  const exercise = api.deleteWorkout(id).then(
    response => {
      dispatch({
        type: 'DELETE_EXERCISE_SUCCESS',
        index: response
      });
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'DELETE_EXERCISE_FAILURE',
        message: error.message || 'Something went wrong'
      });
    }
  );
  return exercise;
};
