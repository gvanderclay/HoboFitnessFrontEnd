import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Row, Button } from 'react-bootstrap';
import { getAllExercises, getErrorMessage, getIsLoading } from '../reducers';
import List from '../components/List';
import LoadingError from '../components/LoadingError';
import { fetchExercises, addExercise } from '../actions';
import '../styles/ListHeader.scss';

class ExerciseListContainer extends Component {
  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const { dispatch } = this.props;
    dispatch(fetchExercises());
  }

  render() {
    const { isLoading, errorMessage, exercises, router, dispatch } = this.props;
    if(isLoading && !exercises.length) {
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
      <div className="container list-header">
        <Row>
          <Col sm={9}>
            <h1>Exercises</h1>
          </Col>
          <Col sm={3}>
          <Button 
            bsSize='large' 
            onClick={() => {
              dispatch(addExercise('New Exercise')).then((result) => {
                router.push('/exercises/' + result.id + '/edit'); 
              });
            }
          }>
            + New Exercise
          </Button>
          </Col>
        </Row>
        <List
          objects={exercises}
          editLink={(id) => {
            return '/exercises/' + id + '/edit'; 
          }}
          startLink={(id) => {
            return '/exercises/' + id;
          }}
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
  }
}

ExerciseListContainer = withRouter(connect(
  mapStateToProps,
)(ExerciseListContainer));

export default ExerciseListContainer;
