var axios = require('axios');

// EXERCISES
        // testing GET all exercises
        // axios.get('http://localhost:8000/exercises/')
        // .then(function(response){
        //     console.log(response.data); // ex.: { user: 'Your User'}
        //     //console.log(response.status); // ex.: 200
        //   });

        // testing GET specific exercise
        function fetchExercise(id){
        axios.get('http://localhost:8000/exercises/' + id)
        .then(function(response){
            console.log(response.data);
          });
        }

        // testing POST
          // axios.post('http://localhost:8000/exercises/', { name: 'Butt slaps', reps: 30, sets: 20, increments: 7})
          // .then(function(response){
          //   console.log('saved successfully')
          // });

        function addExercise(name, reps, sets, increments) {
            axios.post('http://localhost:8000/exercises/',
            {name : name,
            sets : sets,
            reps : reps,
            increments : increments})
            .then(function(response){
              console.log('posted!')
            });
          };

        // testing PUT
        function updateExercise(id, name, reps, sets, increments) {
            axios.put('http://localhost:8000/exercises/' + id,
            {id   : id,
             name : name,
             sets : sets,
             reps : reps,
             increments : increments})
            .then(function(response){
              console.log('updated!')
            });
          };

// EXERCISE INSTANCES

        // testing GET all exerciseInstances
        function fetchExerciseInstances(){
        axios.get('http://localhost:8000/exerciseInstances/')
        .then(function(response){
            console.log(response.data);
          });
        }

        // testing POST exerciseInstance
        // I STOPPED HERE
        function addExerciseInstance(exerciseId) {
            axios.post('http://localhost:8000/exerciseInstances/' + exerciseId,
            {name : name,
            sets : sets,
            reps : reps,
            increments : increments})
            .then(function(response){
              console.log('posted exerciseInstance!' + id)
            });
          };
          // i guess i'll come back to this one

// WORKOUTS
        // GET workouts
        function fetchWorkouts(){
        axios.get('http://localhost:8000/workouts/')
        .then(function(response){
            console.log(response.data);
          });
        }

        // GET workout
        // fetchWorkout('5844a8ee6a6a8a11dac06800')
        function fetchWorkout(id){
        axios.get('http://localhost:8000/workouts/' + id)
        .then(function(response){
            console.log(response.data);
          });
        }

        // POST workout
        function addWorkout(name){
        axios.post('http://localhost:8000/workouts/',
        {
          name : name
        })
        .then(function(response){
            console.log('added workout');
          });
        }

        // PUTS workout
        //updateWorkout('5844a8ee6a6a8a11dac06800', 'newWorkout', 'jump')
        function updateWorkout(id, name, newExercise){
            axios.put('http://localhost:8000/workouts/' + id,
            {id   : id,
             name : name,
             exercises : newExercise
           })
            .then(function(response){
              console.log('updated workout!')
            });
          };

          // DELETE workout
          // deleteWorkout('5844a8ee6a6a8a11dac06800')
          function deleteWorkout(id){
            axios.delete('http://localhost:8000/workouts/' + id)
            .then(function(response){
              console.log('workout deleted')
            });
          };

// WORKOUT INSTANCES
// id is id of the workout not the instance
function addWorkoutInstance (id){
  axios.post('http://localhost:8000/workoutInstances/',
  {
    name : name
  })
  .then(function(response){
      console.log('added workout');
    });
  }



}
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
