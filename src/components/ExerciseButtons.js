import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Row } from 'react-bootstrap';
import * as actions from '../actions';

class ExerciseButtons extends Component {
	componentDidMount() {
		const { exercise, dispatch} = this.props;
		dispatch(actions.startExercise(exercise.id));
	}
	render() {
		const { exercise } = this.props;
 		return (
			<Row>
			  {_.times(exercise.sets, (index) => 
			    <a key={index} 
			      className="menu"
			      onClick={() =>
			        console.log('here')
			      }
			    >
			      {exercise.reps}
			    </a>
			  )}
			</Row>	
		);
	}
}  
export default connect()(ExerciseButtons);