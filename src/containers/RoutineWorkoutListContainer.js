import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Row, Button } from 'react-bootstrap';
import { getRoutineWorkouts, getRoutineById, getErrorMessage, getIsLoading } from '../reducers';
import List from '../components/List';
import LoadingError from '../components/LoadingError';
import H1TextBox from '../components/H1TextBox';
import { fetchRoutines, fetchWorkouts, addWorkoutToRoutine } from '../actions'
import '../styles/ListHeader.scss';

class RoutineWorkoutListContainer extends Component {
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    const { dispatch } = this.props;
    dispatch(fetchRoutines());
    dispatch(fetchWorkouts());
  }
  
  render() {
    const { isLoading, errorMessage, workouts, routine, router, dispatch } = this.props;
    if(isLoading&& !workouts.length) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      )
    }
    if(errorMessage && !workouts.length) {
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
            <H1TextBox placeHolder="Workout Name" value={routine.title} />
          </Col>
          <Col sm={3}>
          <Button 
            bsSize='large' 
            onClick={() => {
              dispatch(addWorkoutToRoutine('New Workout', routine.id)).then((result) => {
                // router.push('/routines/' + routine.id + '/workout/' + result.id); 
              });
            } 
              
          }>
            + New Workout
          </Button>
          </Col>
        </Row>
        <List 
          objects={workouts}
          onObjectClick={() => {}}
        />
      </div>
    );
  }
}

RoutineWorkoutListContainer.propTypes = {
  errorMessage: PropTypes.string,
  workouts: PropTypes.array.isRequired,
  routine: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { params }) => {
  return {
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    workouts: getRoutineWorkouts(state, params.routineId),
    routine: getRoutineById(state, params.routineId),
  }
}

RoutineWorkoutListContainer = withRouter(connect(
  mapStateToProps,
)(RoutineWorkoutListContainer));

export default RoutineWorkoutListContainer;