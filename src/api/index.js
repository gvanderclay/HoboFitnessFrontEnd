import { v4 } from 'node-uuid';

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
state = state ? state : {exercises: [], completedExercises: [], workouts: []};
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

export const addExercise = (name, reps = 5, sets = 5, weight = 45) =>
  new Promise((resolve, reject) => {
    const exercise = {
      id: v4(),
      name,
      reps,
      sets,
      weight
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

export const updateExercise = (id, name, reps, sets, weight) =>
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
        weight: weight ? weight : oldExercise.weight
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

export const addCompletedExercise = ({ exerciseId, setsPerRep }) =>
  new Promise((resolve, reject) => {
    try {
      const completedExercise = {
        exerciseId,
        setsPerRep
      };
      const db = loadDB();
      db.completedExercises.push(completedExercise);
      saveDB(db);
      resolve(completedExercise);
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
