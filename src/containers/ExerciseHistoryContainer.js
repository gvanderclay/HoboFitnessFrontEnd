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
  componentDidMount() {
    this.props.fetchExercises().then(() => {
      this.props.fetchExerciseInstances();
    });

  }

  componentDidUpdate() {
    const { exercise, data } = this.props;
    var chartCtx = document.getElementById("chart");
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

  render() {
    const { isLoading, errorMessage, exercise, exerciseInstances, data, router, backRoute, backText } = this.props;
    if(isLoading || !exercise || _.isEmpty(exerciseInstances) || _.isEmpty(data)) {
      return (
        <Loading />
      )
    }
    if(errorMessage || !exercise || _.isEmpty(exerciseInstances) || _.isEmpty(data)) {
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
          <Col>
            <h1>{exercise.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <canvas id={'chart'}></canvas>
          </Col>
        </Row>
      </div>
    );
  }
}

ExerciseHistoryContainer.propTypes = {
  errorMessage: PropTypes.string,
  exercise: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
}


const mapStateToProps = (state, { params }) => {
  return {
    exercise: getExerciseById(state, params.exerciseId),
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    exerciseInstances: getAllExerciseInstances(state),
    data: getExerciseData(state, params.exerciseId)
  }
}

export default withRouter(connect(mapStateToProps, actions)(ExerciseHistoryContainer));
