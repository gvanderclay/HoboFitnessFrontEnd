import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import { FormControl, Button, ControlLabel } from 'react-bootstrap';
import { updateExercise } from '../actions';
import '../styles/ExerciseHeader.scss';

class ExerciseEditContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      exerciseName: props.exercise.name,
      exerciseReps: props.exercise.reps,
      exerciseSets: props.exercise.sets,
      exerciseWeight: props.exercise.weight,
    }
  } 
  
  handleChange(event){
    this.setState({ [event.target.id]: event.target.value });
    // dispatch(updateExercise(exercise.id, event.target.value)); 
  }
  
  handleSubmit(event) {
    const { exercise, dispatch } = this.props;
    event.preventDefault();
    const exerciseName= ReactDOM.findDOMNode(this.refs.exerciseName).value;
    const exerciseReps= ReactDOM.findDOMNode(this.refs.exerciseReps).value;
    const exerciseSets= ReactDOM.findDOMNode(this.refs.exerciseSets).value;
    const exerciseWeight= ReactDOM.findDOMNode(this.refs.exerciseWeight).value;
    if(exerciseName === exercise.name && exerciseName === '') {
      return; 
    }
    dispatch(updateExercise(exercise.id, exerciseName, exerciseReps, exerciseSets, exerciseWeight)); 
  }

  render() {
      const { router } = this.props; 
      return(

      <div className="container list-header">
        <Button style={{
          float: "left",  
        }}
        onClick={() => {
          router.push('/exercises');
        }}>
          {"<<"} Back To Exercises 
        </Button>
        <form onSubmit={this.handleSubmit} >
          <Row>
            <Col sm={12}>
              <ControlLabel>Name</ControlLabel>
              <FormControl 
                ref={'exerciseName'} 
                id='exerciseName'
                type='text'
                placeholder='Exercise Name' 
                value={this.state.exerciseName} 
                onChange={this.handleChange}
              />

            </Col>
          </Row>
          <Row>
            <Col sm={4} >
              <ControlLabel>Sets</ControlLabel>
              <FormControl 
                ref={'exerciseSets'} 
                id='exerciseSets'
                type='number'
                placeholder='Sets' 
                value={this.state.exerciseSets} 
                onChange={this.handleChange}
                min={0}
              />
            </Col>
            <Col sm={4} >
              <ControlLabel>Reps</ControlLabel>
              <FormControl 
                ref={'exerciseReps'} 
                id='exerciseReps'
                type='number'
                placeholder='Reps' 
                value={this.state.exerciseReps} 
                onChange={this.handleChange}
                min={0}
              />
            </Col>
            <Col sm={4} >
              <ControlLabel>Weight</ControlLabel>
              <FormControl 
                ref={'exerciseWeight'} 
                id='exerciseWeight'
                type='number'
                placeholder='Weight' 
                value={this.state.exerciseWeight} 
                onChange={this.handleChange}
                min={0}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}> 
            <Button type="submit" >
              Save Changes
            </Button>
            </Col>
          </Row>
        </form> 
      </div>
    );
  }
}

export default withRouter(connect()(ExerciseEditContainer));