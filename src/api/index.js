import moment from 'moment';
import { v4 } from 'node-uuid';
import _ from 'lodash';

export const loadDB = () => {
  try {
    const serializedState = localStorage.getItem('fakeDB');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveDB = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('fakeDB', serializedState);
  } catch(err) {
    // TODO findout how to handle write errors
  }
};

let state = loadDB();
state = state ? state : {exercises: [], exercises: [], workoutInstances: [], exerciseInstances: []};
saveDB(state);

export const fetchExercises = () =>
  new Promise((resolve, reject) => {
    try {
      const state = loadDB();
      resolve(state.exercises);
    } catch (err) {
      reject(Error(err));
    }
  });

export const addExercise = (name, reps = 5, sets = 5, increments = 5) =>
  new Promise((resolve, reject) => {
    const exercise = {
      id: v4(),
      name,
      reps,
      sets,
      increments
    };
    try {
      var oldState = loadDB();
      oldState.exercises.push(exercise);
      saveDB(oldState);
      resolve(exercise);
    } catch(err) {
      reject(Error(err));
    }
  });

export const updateExercise = (id, name, reps, sets, increments) =>
  new Promise((resolve, reject) => {
    try {
      const db = loadDB();
      const indexOfExercise = db.exercises.findIndex(exercise => exercise.id === id);
      const oldExercise = db.exercises[indexOfExercise];
      const newExercise = {
        id,
        name: name ? name : oldExercise.name,
        reps: reps ? reps : oldExercise.reps,
        sets: sets ? sets : oldExercise.sets,
        increments: increments ? increments : oldExercise.increments
      };
      db.exercises[indexOfExercise] = newExercise;
      saveDB(db);
      resolve(newExercise);
    } catch(err) {
      reject(Error(err));
    }
  });

export const fetchExercise = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchExercises().then((exercises) => {
        resolve(exercises.find(exercise => exercise.id === id));
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const fetchExerciseInstances = () =>
  new Promise((resolve, reject) => {
    try {
      const state = loadDB();
      resolve(state.exerciseInstances);
    } catch (err) {
      reject(Error(err));
    }
  });

const allSetsCompleted = (exerciseInstance) => {
  let finished = true;
  _.forEach(exerciseInstance.repsPerSet, (reps) => {
    if(reps === -1) {
      finished = false;
      return;
    }
  });
  console.log(finished);
  return finished;
};

// id is id of the exercise not the instance
export const addExerciseInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchExercise(id).then((exercise) => {
        const db = loadDB();
        let prevInstance;
        db.exerciseInstances.forEach((exerciseInstance) => {
          if(_.isEmpty(prevInstance)) {
            prevInstance = exerciseInstance;
            return;
          }
          const prevInstanceDate = moment(prevInstance.completedOn);
          const exerciseInstanceDate = moment(exerciseInstance.completedOn);

          if(exerciseInstance.exerciseId === exercise.id && exerciseInstance.completed && allSetsCompleted(exerciseInstance)) {
            prevInstance = exerciseInstanceDate > prevInstanceDate?
              exerciseInstance : prevInstance;
          }
        });
        let repsPerSet = [];
        _.times(exercise.sets, index => repsPerSet[index] = -1);
        const exerciseInstance = {
          id: v4(),
          exerciseId:  exercise.id,
          repsPerSet,
          completed: false,
          weight: prevInstance ? parseInt(prevInstance.weight) + parseInt(exercise.increments) : 45
        };
        db.exerciseInstances.push(exerciseInstance);
        saveDB(db);
        resolve(exerciseInstance);
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const setExerciseInstanceSet = (id, setNumber, reps) =>
  new Promise((resolve, reject) => {
    try {
      let db = loadDB();
      const index = db.exerciseInstances.findIndex((instance) => instance.id === id);
      db.exerciseInstances[index].repsPerSet[setNumber] = reps;
      saveDB(db);
      resolve(db.exerciseInstances[index]);
    } catch(err) {
      reject(Error(err));
    }
  });

export const setExerciseInstanceWeight = (id, weight) =>
  new Promise((resolve, reject) => {
    try {
      let db = loadDB();
      const index = db.exerciseInstances.findIndex((instance) => instance.id === id);
      db.exerciseInstances[index].weight = weight;
      saveDB(db);
      resolve(db.exerciseInstances[index]);
    } catch(err) {
      reject(Error(err));
    }
  });

export const completeExerciseInstance = (id, setNumber, reps) =>
  new Promise((resolve, reject) => {
    try {
      let db = loadDB();
      const index = db.exerciseInstances.findIndex((instance) => instance.id === id);
      const exercise = db.exercises.find((instance) => instance.id === db.exerciseInstances[index].exerciseId);
      db.exerciseInstances[index].completed = true;
      db.exerciseInstances[index].completedOn = moment().format("MMMM DD YYYY, hh:mm:ss");
      saveDB(db);
      resolve(db.exerciseInstances[index]);
    } catch(err) {
      reject(Error(err));
    }
  });


export const fetchExerciseInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchExerciseInstances().then((exerciseInstances) => {
        resolve(exerciseInstances.find(exerciseInstance => exerciseInstance.id === id));
      });
    } catch(err) {
      reject(Error(err));
    }
  });


export const fetchExercises = () =>
  new Promise((resolve, reject) => {
    try {
      const db = loadDB();
      resolve(db.exercises);
    } catch (err) {
      reject(Error(err));
    }
  });

export const addExercise = (name) =>
  new Promise((resolve, reject) => {
    const exercise = {
      id: v4(),
      name,
      exercises: []
    };
    try {
      var oldDB = loadDB();
      oldDB.exercises.push(workout);
      saveDB(oldDB);
      resolve(exercise);
    } catch(err) {
      reject(Error(err));
    }
  });

export const updateExercise = (id, name, newExercise) =>
  new Promise((resolve, reject) => {
    const db = loadDB();
    try {
      const indexOfExercise = db.workouts.findIndex(workout => workout.id === id);
      const oldExercise = db.workouts[indexOfWorkout];
      oldExercise.name = name;
      if(newExercise){
        oldExercise.exercises.push(newExercise.id);
      }
      db.exercises[indexOfWorkout] = oldWorkout;
      saveDB(db);
      resolve(oldExercise);
    } catch(err) {
      reject(Error(err));
    }
  });

export const fetchExercise = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchExercises().then((workouts) => {
        resolve(exercises.find(workout => workout.id === id));
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const deleteExercise = (id) =>
  new Promise((resolve, reject) => {
    try {
      const db = loadDB();
      const index = db.exercises.findIndex(workout => workout.id === id);
      if (index > -1) {
        db.exercises.splice(index, 1);
      }
      saveDB(db);
      resolve(index);
    } catch(err) {
    }
  });

// id is id of the exercise not the instance
export const addExerciseInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchExercise(id).then((workout) => {
        let repsPerSet = [];
        const exerciseInstance = {
          id: v4(),
          exerciseId: workout.id,
          exerciseInstances: [],
          completed: false
        };
        const instances = createExerciseInstancesForExercise(workout);
        Promise.all(instances).then(values => {
          console.log(values);
          exerciseInstance.exerciseInstances = values;
          const db = loadDB();
          db.exerciseInstances.push(workoutInstance);
          saveDB(db);
          resolve(exerciseInstance);
        });
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const completeExerciseInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      let db = loadDB();
      const index = db.exerciseInstances.findIndex((instance) => instance.id === id);
      db.exerciseInstances[index].completed = true;
      saveDB(db);
      resolve(db.exerciseInstances[index]);
    } catch(err) {
      reject(Error(err));
    }
  });

const createExerciseInstancesForExercise = (workout) => {
  return _.map(exercise.exercises, (exerciseId) => {
    return addExerciseInstance(exerciseId).then((exerciseInstance) => {
      return exerciseInstance.id;
    });
  });
};

export const fetchExerciseInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchExerciseInstances().then((workoutInstances) => {
        resolve(exerciseInstances.find(workout => workout.id === id));
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const fetchExerciseInstances = () =>
  new Promise((resolve, reject) => {
    try {
      const state = loadDB();
      resolve(state.exerciseInstances);
    } catch (err) {
      reject(Error(err));
    }
  });
