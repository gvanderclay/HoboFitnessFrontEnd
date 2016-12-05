import _ from 'lodash';
var axios = require('axios');

export const fetchExercises = () => {
  return axios.get('http://localhost:8000/exercises/');
};

export const addExercise = (name, reps = 5, sets = 5, increments = 5) => {
  return axios.post('http://localhost:8000/exercises/',
  {name : name,
   sets : sets,
   reps : reps,
   increments : increments});
};

// OLD CODE FOR REFERENCE
  // new Promise((resolve, reject) => {
  //   const exercise = {
  //     id: v4(),
  //     name,
  //     reps,
  //     sets,
  //     increments
  //   };
  //   try {
  //     var oldState = loadDB();
  //     oldState.exercises.push(exercise);
  //     saveDB(oldState);
  //     resolve(exercise);
  //   } catch(err) {
  //     reject(Error(err));
  //   }
  // });

export const updateExercise = (id, name, reps, sets, increments) => {
    return axios.put('http://localhost:8000/exercises/' + id,
    {id   : id,
     name : name,
     sets : sets,
     reps : reps,
     increments : increments});
  };


export const fetchExercise = (id) => {
  return axios.get('http://localhost:8000/exercises/' + id);
  };

export const fetchExerciseInstances = () =>
{
  return axios.get('http://localhost:8000/exerciseInstances/');
};

// COMING BACK TO THIS ONE
// id is id of the exercise not the instance
// export const addExerciseInstance = (id) =>
//   new Promise((resolve, reject) => {
//     try {
//       fetchExercise(id).then((exercise) => {
//         const db = loadDB();
//         let prevInstance;
//         db.exerciseInstances.forEach((exerciseInstance) => {
//           if(_.isEmpty(prevInstance)) {
//             prevInstance = exerciseInstance;
//             return;
//           }
//           const prevInstanceDate = moment(prevInstance.completedOn);
//           const exerciseInstanceDate = moment(exerciseInstance.completedOn);

//           if(exerciseInstance.exerciseId === exercise.id && exerciseInstance.completed) {
//             prevInstance = exerciseInstanceDate > prevInstanceDate ?
//               exerciseInstance : prevInstance;
//           }
//         });
//         let repsPerSet = [];
//         _.times(exercise.sets, index => repsPerSet[index] = -1);
//         const exerciseInstance = {
//           id: v4(),
//           exerciseId:  exercise.id,
//           repsPerSet,
//           completed: false,
//           weight: prevInstance ? parseInt(prevInstance.weight) + parseInt(exercise.increments) : 45
//         };
//         db.exerciseInstances.push(exerciseInstance);
//         saveDB(db);
//         resolve(exerciseInstance);
//       });
//     } catch(err) {
//       reject(Error(err));
//     }
//   });

// export const setExerciseInstanceSet = (id, setNumber, reps) =>
//   new Promise((resolve, reject) => {
//     try {
//       let db = loadDB();
//       const index = db.exerciseInstances.findIndex((instance) => instance.id === id);
//       db.exerciseInstances[index].repsPerSet[setNumber] = reps;
//       saveDB(db);
//       resolve(db.exerciseInstances[index]);
//     } catch(err) {
//       reject(Error(err));
//     }
//   });

// export const setExerciseInstanceWeight = (id, weight) =>
//   new Promise((resolve, reject) => {
//     try {
//       let db = loadDB();
//       const index = db.exerciseInstances.findIndex((instance) => instance.id === id);
//       db.exerciseInstances[index].weight = weight;
//       saveDB(db);
//       resolve(db.exerciseInstances[index]);
//     } catch(err) {
//       reject(Error(err));
//     }
//   });

// export const completeExerciseInstance = (id, setNumber, reps) =>
//   new Promise((resolve, reject) => {
//     try {
//       let db = loadDB();
//       const index = db.exerciseInstances.findIndex((instance) => instance.id === id);
//       const exercise = db.exercises.find((instance) => instance.id === db.exerciseInstances[index].exerciseId);
//       db.exerciseInstances[index].completed = true;
//       db.exerciseInstances[index].completedOn = moment().format("MMMM DD YYYY, hh:mm:ss");
//       saveDB(db);
//       resolve(db.exerciseInstances[index]);
//     } catch(err) {
//       reject(Error(err));
//     }
//   });


export const fetchExerciseInstance = (id) =>
{
  return axios.get('http://localhost:8000/exerciseInstances/' + id);
};


export const fetchWorkouts = () => {
  return axios.get('http://localhost:8000/workouts/');
};


export const addWorkout = (name) => {
  return axios.post('http://localhost:8000/workouts/',
  {
    name : name
  });
};

export const updateWorkout = (id, name, newExercise) =>
{
    return axios.put('http://localhost:8000/workouts/' + id,
    {id   : id,
     name : name,
     exercises : newExercise
    });
};

export const fetchWorkout = (id) =>{
  return axios.get('http://localhost:8000/workouts/' + id);
};

export const deleteWorkout = (id) =>{
  return axios.delete('http://localhost:8000/workouts/' + id);
};

// COMING BACK TO THIS ONE
// id is id of the workout not the instance
// export const addWorkoutInstance = (id) =>
//   new Promise((resolve, reject) => {
//     try {
//       fetchWorkout(id).then((workout) => {
//         let repsPerSet = [];
//         const workoutInstance = {
//           id: v4(),
//           workoutId: workout.id,
//           exerciseInstances: [],
//           completed: false
//         };
//         const instances = createExerciseInstancesForWorkout(workout);
//         Promise.all(instances).then(values => {
//           console.log(values);
//           workoutInstance.exerciseInstances = values;
//           const db = loadDB();
//           db.workoutInstances.push(workoutInstance);
//           saveDB(db);
//           resolve(workoutInstance);
//         });
//       });
//     } catch(err) {
//       reject(Error(err));
//     }
//   });

export const completeWorkoutInstance = (id) =>
{
  return axios.patch('http://localhost:8000/workoutInstances/' + id,
  {
  });
};

// const createExerciseInstancesForWorkout = (workout) => {
//   return _.map(workout.exercises, (exerciseId) => {
//     return addExerciseInstance(exerciseId).then((exerciseInstance) => {
//       return exerciseInstance.id;
//     });
//   });
// };

export const fetchWorkoutInstance = (id) =>
{
  return axios.get('http://localhost:8000/workoutInstances/' + id);
};

export const fetchWorkoutInstances = () =>
{
  return axios.get('http://localhost:8000/workoutInstances/');
};
