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
          axios.post('http://localhost:8000/exercises/', { name: 'Butt slaps', reps: 30, sets: 20, increments: 7})
          .then(function(response){
            console.log('saved successfully')
          });

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
        axios.get('http://localhost:8000/exerciseInstances/')
        .then(function(response){
            console.log(response.data);
          });

        // testing POST exerciseInstance
        // I STOPPED HERE
        function addExerciseInstance(exerciseId) {
            axios.post('http://localhost:8000/exerciseInstances/' + exerciseId,
            {name : name,
            sets : sets,
            reps : reps,
            increments : increments})
            .then(function(response){
              console.log('posted exerciseInstance!')
            });
          };
