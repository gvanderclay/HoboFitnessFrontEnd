import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import H1TextBox from '../components/H1TextBox';

class ExerciseHeaderContainer extends Component {
  render() {

    const { dispatch, exercise } = this.props;    
    return(
      <div className="container list-header">
        <Row>
          <Col sm={9}>
            <H1TextBox placeholder='Exercise Name' value={exercise.name} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(connect()(ExerciseHeaderContainer));