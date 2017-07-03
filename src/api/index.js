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
state = state ? state : {exercises: [], excercises: [], excerciseInstances: [], exerciseInstances: []};
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


export const fetchExcercises = () =>
  new Promise((resolve, reject) => {
    try {
      const db = loadDB();
      resolve(db.excercises);
    } catch (err) {
      reject(Error(err));
    }
  });

export const addExcercise = (name) =>
  new Promise((resolve, reject) => {
    const excercise = {
      id: v4(),
      name,
      exercises: []
    };
    try {
      var oldDB = loadDB();
      oldDB.excercises.push(excercise);
      saveDB(oldDB);
      resolve(excercise);
    } catch(err) {
      reject(Error(err));
    }
  });

export const updateExcercise = (id, name, newExercise) =>
  new Promise((resolve, reject) => {
    const db = loadDB();
    try {
      const indexOfExcercise = db.excercises.findIndex(excercise => excercise.id === id);
      const oldExcercise = db.excercises[indexOfExcercise];
      oldExcercise.name = name;
      if(newExercise){
        oldExcercise.exercises.push(newExercise.id);
      }
      db.excercises[indexOfExcercise] = oldExcercise;
      saveDB(db);
      resolve(oldExcercise);
    } catch(err) {
      reject(Error(err));
    }
  });

export const fetchExcercise = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchExcercises().then((excercises) => {
        resolve(excercises.find(excercise => excercise.id === id));
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const deleteExcercise = (id) =>
  new Promise((resolve, reject) => {
    try {
      const db = loadDB();
      const index = db.excercises.findIndex(excercise => excercise.id === id);
      if (index > -1) {
        db.excercises.splice(index, 1);
      }
      saveDB(db);
      resolve(index);
    } catch(err) {
    }
  });

// id is id of the excercise not the instance
export const addExcerciseInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchExcercise(id).then((excercise) => {
        let repsPerSet = [];
        const excerciseInstance = {
          id: v4(),
          excerciseId: excercise.id,
          exerciseInstances: [],
          completed: false
        };
        const instances = createExerciseInstancesForExcercise(excercise);
        Promise.all(instances).then(values => {
          console.log(values);
          excerciseInstance.exerciseInstances = values;
          const db = loadDB();
          db.excerciseInstances.push(excerciseInstance);
          saveDB(db);
          resolve(excerciseInstance);
        });
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const completeExcerciseInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      let db = loadDB();
      const index = db.excerciseInstances.findIndex((instance) => instance.id === id);
      db.excerciseInstances[index].completed = true;
      saveDB(db);
      resolve(db.excerciseInstances[index]);
    } catch(err) {
      reject(Error(err));
    }
  });

const createExerciseInstancesForExcercise = (excercise) => {
  return _.map(excercise.exercises, (exerciseId) => {
    return addExerciseInstance(exerciseId).then((exerciseInstance) => {
      return exerciseInstance.id;
    });
  });
};

export const fetchExcerciseInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchExcerciseInstances().then((excerciseInstances) => {
        resolve(excerciseInstances.find(excercise => excercise.id === id));
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const fetchExcerciseInstances = () =>
  new Promise((resolve, reject) => {
    try {
      const state = loadDB();
      resolve(state.excerciseInstances);
    } catch (err) {
      reject(Error(err));
    }
  });
