import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import hoboFitness from './reducers';

const configureStore = () => {
  const middlewares = [thunk];
  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const reducer = storage.reducer(hoboFitness);

  const engine = createEngine('hoboFitness');
  middlewares.push(storage.createMiddleware(engine));
  const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
  );
  const load = storage.createLoader(engine);

  load(store);
  return store;
};

export default configureStore;
