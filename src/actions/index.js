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

export const fetchExcercises = fetchEntities("excercise");

export const fetchExerciseInstances = fetchEntities("exerciseInstance");

export const fetchExcerciseInstances = fetchEntities("excerciseInstance");

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

export const completeExcerciseInstance = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'UPDATE_EXCERCISE_INSTANCE_REQUEST'
  });

  return api.completeExcerciseInstance(id).then(
    response => {
      dispatch({
        type: 'UPDATE_EXCERCISE_INSTANCE_SUCCESS',
        response: normalize(response, schema.excerciseInstance)
      });
      return Promise.resolve(response);
    }
  );
};


export const fetchExcercise = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_EXCERCISE_REQUEST'
  });

  return api.fetchExcercise(id).then(
    response => {
      dispatch({
        type: 'FETCH_EXCERCISE_SUCCESS',
        response: normalize(response, schema.excercise)
      });
      dispatch(fetchExercises());
    }
  );
};


export const addExcercise = (name) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'ADD_EXCERCISE_REQUEST'
  });

  const excercise = api.addExcercise(name).then(
    response => {
      dispatch({
        type: 'ADD_EXCERCISE_SUCCESS',
        response: normalize(response, schema.excercise)
      });
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'ADD_EXCERCISE_FAILURE',
        message: error.message || 'Something went wrong'
      });
      return Promise.resolve(error);
    }
  );
  return excercise;
};

export const addExcerciseInstance = (excerciseId) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'ADD_EXCERCISE_INSTANCE_REQUEST'
  });

  const excerciseInstance = api.addExcerciseInstance(excerciseId).then(
    response => {
      dispatch({
        type: 'ADD_EXCERCISE_INSTANCE_SUCCESS',
        response: normalize(response, schema.excerciseInstance)
      });
      fetchExerciseInstances();
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'ADD_EXCERCISE_INSTANCE_FAILURE',
        message: error.message || 'Something went wrong'
      });
      return Promise.resolve(error);
    }
  );
  return excerciseInstance;

};

export const fetchExcerciseInstance = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_EXCERCISE_INSTANCE_REQUEST'
  });

  return api.fetchExcerciseInstance(id).then(
    response => {
      dispatch({
        type: 'FETCH_EXCERCISE_INSTANCE_SUCCESS',
        response: normalize(response, schema.excerciseInstance)
      });
      dispatch(fetchExerciseInstances()).then(() => {
        dispatch(fetchExercises());
      });
    }
  );
};

export const updateExcercise = (id, name, newExercise) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'UPDATE_EXCERCISE_REQUEST'
  });

  const excercise = api.updateExcercise(id, name, newExercise).then(
    response => {
      dispatch({
        type: 'UPDATE_EXCERCISE_SUCCESS',
        response: normalize(response, schema.excercise)
      });
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'UPDATE_EXCERCISE_FAILURE',
        message: error.message || 'Something went wrong'
      });
    }
  );
  return excercise;
};

export const deleteExcercise = (id) => (dispatch, getState) => {
  if(getIsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'DELETE_EXCERCISE_REQUEST'
  });

  // index of the deleted excercise is returned
  const excercise = api.deleteExcercise(id).then(
    response => {
      dispatch({
        type: 'DELETE_EXCERCISE_SUCCESS',
        index: response
      });
      return Promise.resolve(response);
    },
    error => {
      dispatch({
        type: 'DELETE_EXCERCISE_FAILURE',
        message: error.message || 'Something went wrong'
      });
    }
  );
  return excercise;
};
