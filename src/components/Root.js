import React, { PropTypes  } from 'react';
import { Provider } from 'react-redux';
import {  IndexRoute, Router, Route, browserHistory } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import ExerciseListContainer from '../containers/ExerciseListContainer';
import ExerciseEditContainer from '../containers/ExerciseEditContainer';
import ExerciseStartContainer from '../containers/ExerciseStartContainer';
import WorkoutListContainer from '../containers/WorkoutListContainer';
import WorkoutEditContainer from '../containers/WorkoutEditContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomePage}></IndexRoute>
        <Route path='/exercises' component={ExerciseListContainer}> </Route>
        <Route path='/exercises/:exerciseId/edit' component={ExerciseEditContainer}> </Route>
        <Route path='/exercises/:exerciseId' component={ExerciseStartContainer}> </Route>
        <Route path='/workouts' component={WorkoutListContainer}> </Route>
        <Route path='/workouts/:workoutId/edit' component={WorkoutEditContainer}> </Route>
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
