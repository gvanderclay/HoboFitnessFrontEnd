import React, { Component } from 'react';
import { Jumbotron} from 'react-bootstrap';
import './HomePage.css'

class HomePage extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <div className="container">
            <h1 className="title">Welcome To HoboFitness</h1>
            <p>Track your workouts effortlessly!</p>
          </div>
        </Jumbotron>
        {this.props.children}
      </div>
    );
  }
}

export default HomePage;