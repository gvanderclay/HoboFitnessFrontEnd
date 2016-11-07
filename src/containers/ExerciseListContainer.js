import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router';
import { getAllExerciseInstances, getAllExercises, getErrorMessage, getIsLoading } from '../reducers';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import LoadingError from '../components/LoadingError';
import * as actions from '../actions';

class ExerciseListContainer extends Component {
  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchExercises } = this.props;
    fetchExercises();
  }

  addExercise() {
    const { addExercise, router } = this.props;
    addExercise('New Exercise').then(result =>
      router.push('/exercises/' + result.id + '/edit')
    );
  }

  actionComponent(id, text, props) {
    return (
      <Link
          className="list-link"
          {...props}
      >
        {text}
      </Link>
    );
  }

  startExerciseComponent(id) {
    const { addExerciseInstance, router, exerciseInstances } = this.props;
    const props = {
      onClick: () => {
        let exerciseInstance = exerciseInstances.find((instance) => id === instance.exerciseId && !instance.completed)
        if(_.isEmpty(exerciseInstance)) {
          addExerciseInstance(id).then(instance => {
            exerciseInstance = instance;
            router.push("/exercises/" + exerciseInstance.id);
          });
          return;
        }
        router.push("/exercises/" + exerciseInstance.id);
      }
    };
    return this.actionComponent(id, "Start", props);
  }

  editExerciseComponent(id) {
    const props = {
      to: "/exercises/" + id + "/edit"
    }
    return this.actionComponent(id, "Edit", props);
  }

  exerciseActionComponents(exercise) {
    const { id } = exercise;
    // put the components in the opposite order you want them to appear on screen
    return [
      this.editExerciseComponent(id),
      this.startExerciseComponent(id),
    ]
  }

  render() {
    const { isLoading, errorMessage, exercises, exerciseInstances } = this.props;
    if(isLoading && !exercises.length && !exerciseInstances.length) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    }
    if(errorMessage && !exercises.length) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }

    return (
      <div className="container">
        <ListHeader
            name="exercise"
            handleClick={this.addExercise.bind(this)}
        />
        <List
          objects={exercises}
          actionComponents={this.exerciseActionComponents.bind(this)}
        />
      </div>
    );
  }
}

ExerciseListContainer.propTypes = {
  errorMessage: PropTypes.string,
  exercises: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { params }) => {
  return {
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    exercises: getAllExercises(state),
    exerciseInstances: getAllExerciseInstances(state)
  }
}

ExerciseListContainer = withRouter(connect(
  mapStateToProps,
  actions
)(ExerciseListContainer));

export default ExerciseListContainer;
