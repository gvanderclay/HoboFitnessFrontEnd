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
state = state ? state : {exercises: [], completedExercises: []};
saveDB(state);

export const fetchExercises = () =>
  new Promise((resolve, reject) => {
    try {
      const state = loadDB();
      resolve(state.exercises);
    } catch (err) {
      reject(Error(err));
    }
  })

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
  })
  
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


// export const fetchRoutines = () => 
//   new Promise((resolve, reject) => {
//     try {
//       const state = loadDB();
//       const routines = state.routineList.ids.map(id => state.routinesById[id]);
//       resolve(routines);
//     }
//     catch(err) {
//       reject(Error(err)); 
//     }
//   });


// export const addRoutine = (title, workouts = []) =>  
//   new Promise((resolve, reject) => {
//     const routine = {
//       id: v4(),
//       title,
//       workouts, 
//     }
//     try{
//       var oldState = loadDB();
//       oldState.routinesById[routine.id] = routine;
//       oldState.routineList.ids.push(routine.id);
//       saveDB(oldState);
//       resolve(routine);
//     }
//     catch(err) {
//       reject(Error(err));
//     }    
//   });
  
// export const updateRoutine = (id, title, workouts) => 
//   new Promise((resolve, reject) => {
//     let index;
//     let state = loadDB().routines;
//     state.routinesById[index].title = title;
//     state.routinesById[index].workouts = workouts;
//     saveDB(state);
//   });
  
// export const fetchWorkouts = () => 
//    new Promise((resolve, reject) => {
//       try {
//         resolve(loadDB().workouts);
//       }
//       catch(err) {
//         reject(Error(err)); 
//       }
//     }); 
    
// export const fetchWorkoutsForRoutine = (id) => 
//   new Promise((resolve, reject) => {
//     try {
//       const routine = loadDB().routinesById[id];
//       resolve(routine.workouts); 
//     } catch (err) {
//       reject(Error(err));
//     }
//   })
  
// export const addWorkoutToRoutine = (title, id, exercises = []) =>
//   new Promise((resolve, reject) => {
//     try {
//       const oldState = loadDB();
//       const routine = oldState.routinesById[id];
//       const workout = {
//         id: v4(),
//         title,
//         exercises,
//       }
//       routine.workouts.push(workout);
//       oldState.routinesById[id] = routine;
//       oldState.workoutsById[workout.id] = workout;
//       oldState.workoutList.ids.push(workout.id); 
//       saveDB(oldState);
//       resolve(workout);
//     } catch(err) {
//       reject(Error(err));
//     }
//   });
