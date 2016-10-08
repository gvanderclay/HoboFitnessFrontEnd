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

const delay = (ms) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchRoutines = () => {
  delay(100).then(() => {
    return loadState().routines;
  });
}

export const addRoutine = ({ workouts = [], title }) => {
  delay(100).then(() => {
    const routine = {
      id: v4(),
      title,
      workouts, 
    }
    var oldState = loadState();
    oldState.routines.push(routine);
    saveState(oldState);
  })
  
}