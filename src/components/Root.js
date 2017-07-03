import React, { PropTypes  } from 'react';
import { Provider } from 'react-redux';
import {  IndexRoute, Router, Route, browserHistory } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import ExerciseListContainer from '../containers/ExerciseListContainer';
import MainExerciseEdit from '../components/MainExerciseEdit';
import ExerciseExerciseEdit from '../components/WorkoutExerciseEdit';
import ExerciseStartContainer from '../containers/ExerciseStartContainer';
import MainExerciseHistoryContainer from '../containers/MainExerciseHistoryContainer';
import ExerciseHistoryContainer from '../containers/WorkoutHistoryContainer';
import ExerciseStartContainer from '../containers/WorkoutStartContainer';
import ExerciseListContainer from '../containers/WorkoutListContainer';
import ExerciseEditContainer from '../containers/WorkoutEditContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomePage}></IndexRoute>
        <Route path='/exercises' component={ExerciseListContainer}> </Route>
        <Route path='/exercises/:exerciseId/edit' component={MainExerciseEdit}> </Route>
        <Route path='/exercises/:exerciseId/history' component={MainExerciseHistoryContainer}> </Route>
        <Route path='/exercises/:exerciseInstanceId' component={ExerciseStartContainer}> </Route>
        <Route path='/exercises' component={WorkoutListContainer}> </Route>
        <Route path='/exercises/:workoutId/edit' component={WorkoutEditContainer}> </Route>
        <Route path='/exercises/:workoutId/exercise/:exerciseId' component={WorkoutExerciseEdit}> </Route>
        <Route path='/exercises/:workoutId/history' component={WorkoutHistoryContainer}> </Route>
        <Route path='/exercises/:workoutInstanceId' component={WorkoutStartContainer}> </Route>
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
