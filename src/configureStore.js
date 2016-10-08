import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import hoboFitness from './reducers';

const configureStore = () => {
  const middlewares = [promise];
  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  
  return createStore(
    hoboFitness,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;