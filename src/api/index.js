import { v4 } from 'node-uuid';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(err) {
    // TODO findout how to handle write errors
  }
}


const state = loadState() && loadState().routines ? loadState() : 
                                      {
                                        routines: [],
                                      };
saveState(state);

export const fetchRoutines = () => 
  new Promise((resolve, reject) => {
    try {
      resolve(loadState().routines);
    }
    catch(err) {
      reject(Error(err)); 
    }
  });


export const addRoutine = (title, workouts = []) =>  
  new Promise((resolve, reject) => {
    const routine = {
      id: v4(),
      title,
      workouts, 
    }
    try{
      var oldState = loadState();
      oldState.routines.push(routine);
      saveState(oldState);
      resolve(routine);
    }
    catch(err) {
      reject(Error(err));
    }    
  });

export const addWorkoutToRoutine = (id, workout) => (dispatch) =>
  new Promise((resolve, reject) => {
    const routine = loadState().routines.find(t => t.id === id);
    routine.workouts.push(workout);
    return routine;
  });