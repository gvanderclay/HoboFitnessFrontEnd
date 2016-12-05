import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Row, Col } from 'react-bootstrap';
import Chart from 'chart.js';
import { withRouter } from 'react-router';
import LoadingError from '../components/LoadingError';
import Loading from '../components/Loading';
import { getExerciseById, getAllExerciseInstances, getExerciseData, getIsLoading, getErrorMessage } from '../reducers';
import * as actions from '../actions';

class ExerciseHistoryContainer extends Component {
  createChart() {
    const { exercise, data } = this.props;
    var chartCtx = document.getElementById(exercise.id + "-canvas");
    if(chartCtx){
      let myChart = new Chart(chartCtx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              pointBackgroundColor: 'black',
              data: data.data,
              label: exercise.name,
              fill: false,
              tension: false
            }
          ]
        },
        options: {
         legend: {
            display: false
          },
          tooltips: {
            enabled: true,
            displayColors: false,
            mode: 'single',
            callbacks: {
              label: (tooltipItems, data) => {
                return tooltipItems.yLabel + ' lbs';
              }
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 45
              }
            }]
          }
        },
      });
    }
  }

  componentDidMount() {
    console.log('here');
    this.createChart();
  }

  render() {
    const { exercise } = this.props;
    return (
      <div className="container">
        <Row>
          <Col>
            <h1>{exercise.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <canvas id={exercise.id + '-canvas'}></canvas>
          </Col>
        </Row>
      </div>
    );
  }
}


export default ExerciseHistoryContainer;
