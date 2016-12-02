import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import LoadingError from '../components/LoadingError';
import { getExerciseInstanceById, getExerciseByInstanceId, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';
import ExerciseButtons from '../components/ExerciseButtons';
import H1Textbox from '../components/H1TextBox';
import RestTimer from '../components/RestTimer';

class ExerciseStartContainer extends Component {
  constructor(props) {
    super(props);
    this.changeExerciseInstanceWeight =
      _.debounce(this.changeExerciseInstanceWeight, 500);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { fetchExerciseInstance, params } = this.props;
    fetchExerciseInstance(params.exerciseInstanceId);
  }

  handleChange(event) {
    this.changeExerciseInstanceWeight(event.target.value);
  }

  changeExerciseInstanceWeight(weight) {
    const { setExerciseInstanceWeight, exerciseInstance } = this.props;
    setExerciseInstanceWeight(exerciseInstance.id, weight);
  }

  handleSubmit(event) {
    const { exerciseInstance, dispatch, setExerciseInstanceWeight } = this.props;
    event.preventDefault();
    const instanceWeight = ReactDOM.findDOMNode(this.refs.instanceWeight).value;
    dispatch(setExerciseInstanceWeight(exerciseInstance.id, instanceWeight));
  }

  handleClick() {
    const { router, completeExerciseInstance, exerciseInstance } = this.props;
    completeExerciseInstance(exerciseInstance.id);
    router.push('/exercises');
  }

  render() {
    const { isLoading, exercise, exerciseInstance, errorMessage } = this.props;
    if(isLoading || !exercise) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    }
    if(errorMessage && !exercise) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }
    return (
      <div className="container">
        <Row>
          <Col>
            <h1>{exercise.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={5}>
            <ExerciseButtons exerciseInstance={exerciseInstance} exercise={exercise}/>
          </Col> 
          <Col xs={12} sm={2}>
            <h3>Rest Timer</h3>
            <RestTimer />
          </Col>
          <Col xs={12} sm={2}>
            <h3>
              Weight
            </h3>
            <H1Textbox
                placeHolder="weight"
                value={exerciseInstance.weight}
                handleChange={this.handleChange}
                style= {{
                        marginTop: 0
                       }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Button onClick={this.handleClick.bind(this)}>Complete Exercise</Button>
          </Col>
        </Row>
     </div>
    );
  }

}

ExerciseStartContainer.propTypes = {
  errorMessage: PropTypes.string,
  exercise: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, { params }) => {
  return {
    exerciseInstance: getExerciseInstanceById(state, params.exerciseInstanceId),
    exercise: getExerciseByInstanceId(state, params.exerciseInstanceId),
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
  };
};

export default withRouter(connect(mapStateToProps, actions)(ExerciseStartContainer));
