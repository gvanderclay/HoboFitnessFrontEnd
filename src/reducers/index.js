import { combineReducers } from 'redux';
import _ from 'lodash';
import  * as fromById from './byId';
import createList from './createList';
import * as fromCreateList from './createList';

const exercisesById = fromById.exercisesById;
const workoutsById = fromById.workoutsById;
const exerciseInstancesById = fromById.exerciseInstancesById;
const workoutInstancesById = fromById.workoutInstancesById;

const exerciseList = createList("exercise");
const workoutList = createList("workout");
const workoutInstanceList = createList("workout_instance");
const exerciseInstanceList = createList("exercise_instance");

const state = combineReducers({
  exerciseList,
  exercisesById,
  exerciseInstanceList,
  exerciseInstancesById,
  workoutList,
  workoutsById,
  workoutInstanceList,
  workoutInstancesById
});

export default state;

export const getAllExercises = (state) => {
  const ids = fromCreateList.getIds(state.exerciseList);
  return ids.map(id => fromById.getExercise(state.exercisesById, id));
};

export const getExerciseById = (state, id) => {
  const exercise = fromById.getExercise(state.exercisesById, id);
  return exercise;
};

export const getExerciseData = (state, id) => {
  const exercise = fromById.getExercise(state.exercisesById, id);
  const ids = fromCreateList.getIds(state.exerciseInstanceList);
  if(_.isEmpty(exercise) || _.isEmpty(ids)) {
    return [];
  }
  let data = {labels: [], data: []};
  return ids.reduce(((result, instanceId) => {
    const exerciseInstance = fromById.getExerciseInstance(state.exerciseInstancesById, instanceId);
    if(exerciseInstance.exerciseId === id) {
      result.labels.push(exerciseInstance.completedOn);
      result.data.push(parseInt(exerciseInstance.weight));
    }
    return result;
  }), data);
};

export const getAllExerciseInstances = (state) => {
  const ids = fromCreateList.getIds(state.exerciseInstanceList);
  return ids.map(id => fromById.getExerciseInstance(state.exerciseInstancesById, id));
};

export const getExerciseInstanceById = (state, id) =>
  fromById.getExerciseInstance(state.exerciseInstancesById, id);

export const getRepsOnSet = (state, id, setNumber) =>
  fromById.getExerciseInstance(state.exerciseInstancesById, id).repsPerSet[setNumber];

export const getExerciseByInstanceId = (state, id) => {
  const exerciseInstance = getExerciseInstanceById(state, id);
  return _.isEmpty(exerciseInstance) ?
    null : getExerciseById(state, exerciseInstance.exerciseId);
};

export const getWorkoutData = (state, id) => {
  const workout = getWorkoutById(state, id);
  if(_.isEmpty(workout)) {
    return [];
  }
  return workout.exercises.reduce((result, exerciseId) => {
    const exercise = getExerciseById(state, exerciseId);
    console.log(exercise);
    if(!exercise) return result;
    result[exerciseId] = {...getExerciseData(state, exerciseId), exercise };
    return result;
  }, {});
};

export const getAllWorkouts = (state) => {
  const ids = fromCreateList.getIds(state.workoutList);
  return ids.map(id => fromById.getWorkout(state.workoutsById, id));
};

export const getWorkoutById = (state, id) => {
  const workout = fromById.getWorkout(state.workoutsById, id);
  if(!workout) {
    return {};
  }
  return workout;
};

export const getExercisesForWorkout = (state, workoutId) => {
  const workout = getWorkoutById(state,workoutId);
  if(_.isEmpty(workout)) {
    return [];
  }
  return workout.exercises.reduce((result, id) => {
    const exercise = getExerciseById(state, id);
    if(exercise) {
      result.push(exercise);
    }
    return result;
  }, []);
};

export const getWorkoutInstanceById = (state, id) =>
  fromById.getWorkoutInstance(state.workoutInstancesById, id);

export const getAllWorkoutInstances = (state) => {
  const ids = fromCreateList.getIds(state.workoutInstanceList);
  return ids.map(id => fromById.getWorkoutInstance(state.workoutInstancesById, id));
};

export const getWorkoutInstancesForWorkout = (state, workoutId) =>  {
  const ids = fromCreateList.getIds(state.workoutInstanceList);
  return ids.reduce((result, id) => {
    const workoutInstance = getWorkoutInstanceById(state, id);
    if(workoutInstance && workoutInstance.workoutId === workoutId) {
      result.push(workoutInstance);
    }
    return result;
  }, []);
};

export const getExerciseInstancesForWorkoutInstance = (state, workoutInstanceId) => {
  const workoutInstance = getWorkoutInstanceById(state, workoutInstanceId);
  if(_.isEmpty(workoutInstance)) {
    return [];
  }
  return workoutInstance.exerciseInstances.reduce((result, id) => {
    const exerciseInstance = getExerciseInstanceById(state, id);
    if(exerciseInstance) {
      result.push(exerciseInstance);
    }
    return result;
  }, []);
};

export const getExercisesForWorkoutInstance = (state, workoutInstanceId) => {
  const workoutInstance = getWorkoutInstanceById(state, workoutInstanceId);
  if(_.isEmpty(workoutInstance)) {
    return [];
  }
  return workoutInstance.exerciseInstances.reduce((result, id) => {
    const exerciseInstance = getExerciseInstanceById(state, id);
    const exercise = getExerciseByInstanceId(state, id);
    if(exercise) {
      result.push(exercise);
    }
    return result;
  }, []);
};

export const getIsLoading = (state) =>
  fromCreateList.getIsLoading(state.exerciseList) ||
  fromCreateList.getIsLoading(state.workoutList) ||
  fromCreateList.getIsLoading(state.exerciseInstanceList) ||
  fromCreateList.getIsLoading(state.workoutInstanceList);

export const getErrorMessage = (state, filter) =>
  fromCreateList.getErrorMessage(state.exerciseList);
