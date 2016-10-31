import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import ExerciseEditFormContainer from './ExerciseEditFormContainer';
import LoadingError from '../components/LoadingError';
import Loading from '../components/Loading';
import { getExerciseById, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';

class ExerciseContainer extends Component { 
  componentDidMount() {
    this.props.fetchExercises();
  }

  render() {
    const { isLoading, errorMessage, exercise, router, backRoute, backText } = this.props;
    if(isLoading || !exercise) {
      return (
        <Loading />
      )
    }
    if(errorMessage && !exercise) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }
    return(
      <div className="container">
        <Row>
          <Col sm={12}>
            <Button style={{
                float: "left",
                marginTop:"10px"
              }}
              onClick={() => {
                router.push(backRoute);
              }}
            >
                {"<<" + backText}
            </Button>
          </Col>
        </Row>
        <ExerciseEditFormContainer
            exercise={exercise}/>
      </div>
    );
  }
}

ExerciseContainer.propTypes = {
  errorMessage: PropTypes.string,
  exercise: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
}


const mapStateToProps = (state, { params }) => {
  return {
    exercise: getExerciseById(state, params.exerciseId),
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
  }
}

export default withRouter(connect(mapStateToProps, actions)(ExerciseContainer));
