import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import HomePage from './components/HomePage'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './styles/index.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={HomePage}></IndexRoute>
    </Route>
  </Router>,
  document.getElementById('root')
);
