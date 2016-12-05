import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Row, Col, Button } from 'react-bootstrap';
import ExerciseButtons from './ExerciseButtons';
import RestTimer from './RestTimer';
import H1Textbox from './H1TextBox';

const ExerciseStart = ({ exerciseInstance, exercise, handleChange, handleClick }) => (
    <div className="container">
        <Row>
          <Col xs={12} sm={5}>
            <ExerciseButtons exerciseInstance={exerciseInstance} exercise={exercise}/>
          </Col> 
          <Col xs={12} sm={2}>
            <h3>Rest Timer</h3>
            <RestTimer
                exerciseInstance={exerciseInstance}
            />
          </Col>
          <Col xs={12} sm={2}>
            <h3> Weight </h3>
            <H1Textbox
              placeHolder="weight"
              value={exerciseInstance.weight}
              handleChange={handleChange}
              style= {{
                marginTop: 0
              }}
            />
          </Col>
        </Row>
        { handleClick &&
              <Row>
                <Col xs={6}>
                  <Button onClick={handleClick}>Complete Exercise</Button>
                </Col>
              </Row>
        }
    </div>
);

export default ExerciseStart;
