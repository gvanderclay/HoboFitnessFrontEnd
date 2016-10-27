import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAllExercises, getErrorMessage, getIsLoading } from '../reducers';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import LoadingError from '../components/LoadingError';
import * as actions from '../actions';

class WorkoutEditContainer extends Component {
  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    
  }

  addExerciseToWorkout() {

  }

  render() {
    
  }
}


WorkoutEditContainer.propTypes = {
  
};

const mapStateToProps = (state, props) => {
  
};

WorkoutEditContainer = withRouter(connect(
  mapStateToProps,
  actions
));
