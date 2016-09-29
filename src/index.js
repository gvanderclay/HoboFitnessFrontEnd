import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import HomePage from './homepage/HomePage'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={HomePage}></IndexRoute>
    </Route>
  </Router>,
  document.getElementById('root')
);
