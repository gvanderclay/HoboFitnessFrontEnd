import React, { PropTypes  } from 'react';
import { Provider } from 'react-redux';
import {  IndexRoute, Router, Route, browserHistory } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import Routines from './Routines';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomePage}></IndexRoute>
        <Route path='/routines' component={Routines}></Route>
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;