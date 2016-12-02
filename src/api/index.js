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
state = state ? state : {exercises: [], workouts: [], workoutInstances: [], exerciseInstances: []};
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

          if(exerciseInstance.exerciseId === exercise.id && exerciseInstance.completed) {
            prevInstance = exerciseInstanceDate > prevInstanceDate ?
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


export const fetchWorkouts = () =>
  new Promise((resolve, reject) => {
    try {
      const db = loadDB();
      resolve(db.workouts);
    } catch (err) {
      reject(Error(err));
    }
  });

export const addWorkout = (name) =>
  new Promise((resolve, reject) => {
    const workout = {
      id: v4(),
      name,
      exercises: []
    };
    try {
      var oldDB = loadDB();
      oldDB.workouts.push(workout);
      saveDB(oldDB);
      resolve(workout);
    } catch(err) {
      reject(Error(err));
    }
  });

export const updateWorkout = (id, name, newExercise) =>
  new Promise((resolve, reject) => {
    const db = loadDB();
    try {
      const indexOfWorkout = db.workouts.findIndex(workout => workout.id === id);
      const oldWorkout = db.workouts[indexOfWorkout];
      oldWorkout.name = name;
      if(newExercise){
        oldWorkout.exercises.push(newExercise.id);
      }
      db.workouts[indexOfWorkout] = oldWorkout;
      saveDB(db);
      resolve(oldWorkout);
    } catch(err) {
      reject(Error(err));
    }
  });

export const fetchWorkout = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchWorkouts().then((workouts) => {
        resolve(workouts.find(workout => workout.id === id));
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const deleteWorkout = (id) =>
  new Promise((resolve, reject) => {
    try {
      const db = loadDB();
      const index = db.workouts.findIndex(workout => workout.id === id);
      if (index > -1) {
        db.workouts.splice(index, 1);
      }
      saveDB(db);
      resolve(index);
    } catch(err) {
    }
  });

// id is id of the workout not the instance
export const addWorkoutInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchWorkout(id).then((workout) => {
        let repsPerSet = [];
        const workoutInstance = {
          id: v4(),
          workoutId: workout.id,
          exerciseInstances: [],
          completed: false
        };
        const instances = createExerciseInstancesForWorkout(workout);
        Promise.all(instances).then(values => {
          console.log(values);
          workoutInstance.exerciseInstances = values;
          const db = loadDB();
          db.workoutInstances.push(workoutInstance);
          saveDB(db);
          resolve(workoutInstance);
        });
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const completeWorkoutInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      let db = loadDB();
      const index = db.workoutInstances.findIndex((instance) => instance.id === id);
      db.workoutInstances[index].completed = true;
      saveDB(db);
      resolve(db.workoutInstances[index]);
    } catch(err) {
      reject(Error(err));
    }
  });

const createExerciseInstancesForWorkout = (workout) => {
  return _.map(workout.exercises, (exerciseId) => {
    return addExerciseInstance(exerciseId).then((exerciseInstance) => {
      return exerciseInstance.id;
    });
  });
};

export const fetchWorkoutInstance = (id) =>
  new Promise((resolve, reject) => {
    try {
      fetchWorkoutInstances().then((workoutInstances) => {
        resolve(workoutInstances.find(workout => workout.id === id));
      });
    } catch(err) {
      reject(Error(err));
    }
  });

export const fetchWorkoutInstances = () =>
  new Promise((resolve, reject) => {
    try {
      const state = loadDB();
      resolve(state.workoutInstances);
    } catch (err) {
      reject(Error(err));
    }
  });
