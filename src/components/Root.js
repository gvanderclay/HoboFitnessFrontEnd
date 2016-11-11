import React, { PropTypes  } from 'react';
import { Provider } from 'react-redux';
import {  IndexRoute, Router, Route, browserHistory } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import ExerciseListContainer from '../containers/ExerciseListContainer';
import MainExerciseEdit from '../components/MainExerciseEdit';
import WorkoutExerciseEdit from '../components/WorkoutExerciseEdit';
import ExerciseStartContainer from '../containers/ExerciseStartContainer';
import WorkoutStartContainer from '../containers/WorkoutStartContainer';
import WorkoutListContainer from '../containers/WorkoutListContainer';
import WorkoutEditContainer from '../containers/WorkoutEditContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomePage}></IndexRoute>
        <Route path='/exercises' component={ExerciseListContainer}> </Route>
        <Route path='/exercises/:exerciseId/edit' component={MainExerciseEdit}> </Route>
        <Route path='/exercises/:exerciseInstanceId' component={ExerciseStartContainer}> </Route>
        <Route path='/workouts' component={WorkoutListContainer}> </Route>
        <Route path='/workouts/:workoutId/edit' component={WorkoutEditContainer}> </Route>
        <Route path='/workouts/:workoutId/exercise/:exerciseId' component={WorkoutExerciseEdit}> </Route>
        <Route path='/workouts/:workoutInstanceId' component={WorkoutStartContainer}> </Route>
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
