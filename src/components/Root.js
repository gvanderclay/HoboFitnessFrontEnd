import React, { PropTypes  } from 'react';
import { Provider } from 'react-redux';
import {  IndexRoute, Router, Route, browserHistory } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import ExerciseListContainer from '../containers/ExerciseListContainer';
import MainExerciseEdit from '../components/MainExerciseEdit';
import ExcerciseExerciseEdit from '../components/ExcerciseExerciseEdit';
import ExerciseStartContainer from '../containers/ExerciseStartContainer';
import MainExerciseHistoryContainer from '../containers/MainExerciseHistoryContainer';
import ExcerciseHistoryContainer from '../containers/ExcerciseHistoryContainer';
import ExcerciseStartContainer from '../containers/ExcerciseStartContainer';
import ExcerciseListContainer from '../containers/ExcerciseListContainer';
import ExcerciseEditContainer from '../containers/ExcerciseEditContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomePage}></IndexRoute>
        <Route path='/exercises' component={ExerciseListContainer}> </Route>
        <Route path='/exercises/:exerciseId/edit' component={MainExerciseEdit}> </Route>
        <Route path='/exercises/:exerciseId/history' component={MainExerciseHistoryContainer}> </Route>
        <Route path='/exercises/:exerciseInstanceId' component={ExerciseStartContainer}> </Route>
        <Route path='/excercises' component={ExcerciseListContainer}> </Route>
        <Route path='/excercises/:excerciseId/edit' component={ExcerciseEditContainer}> </Route>
        <Route path='/excercises/:excerciseId/exercise/:exerciseId' component={ExcerciseExerciseEdit}> </Route>
        <Route path='/excercises/:excerciseId/history' component={ExcerciseHistoryContainer}> </Route>
        <Route path='/excercises/:excerciseInstanceId' component={ExcerciseStartContainer}> </Route>
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
