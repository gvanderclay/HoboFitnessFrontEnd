import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { fetchExercises } from './actions';
import configureStore from './configureStore';
import './styles/index.scss';

const store = configureStore();
store.dispatch(fetchExercises());
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
