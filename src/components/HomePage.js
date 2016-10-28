import React, { Component } from 'react';
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import '../styles/HomePage.scss'

class HomePage extends Component {
  constructor() {
    super();
    this.sections = [
      {
        title: "Customize Workouts",
        description: "Bless up. Bless up. The key is to drink coconut, fresh coconut, trust me. Learning is cool, but knowing is better, and I know the key to success. Congratulations, you played yourself. The ladies always say Khaled you smell good, I use no cologne. Cocoa butter is the key. Don’t ever play yourself. They never said winning was easy. Some people can’t handle success, I can. Major key, don’t fall for the trap, stay focused. It’s the ones closest to you that want to see you fail. " 
      },
      {
        title: "Track Progress",
        description: "Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel. Stay focused. You see the hedges, how I got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh. To succeed you must believe. When you believe, you will succeed. Every chance I get, I water the plants, Lion! Fan luv. The key to success is to keep your head above the water, never give up."
      },
      {
        title: "Get Fit",
        description: "The key to success is to keep your head above the water, never give up. Stay focused. The first of the month is coming, we have to get money, we have no choice. It cost money to eat and they don’t want you to eat. You see the hedges, how I got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh. Bless up. Mogul talk. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! You see that bamboo behind me though, you see that bamboo? Ain’t nothin’ like bamboo. Bless up."
      }
    ];
  }
  render() {
    return (
      <div>
        <Jumbotron>
          <div className="container">
            <h1 className="title">Welcome To HoboFitness</h1>
            <p>Track your workouts effortlessly!</p>
            <p><Button onClick={() => {
              this.props.router.push('/workouts');
            }}>
            Get Started
            </Button></p>
          </div>
        </Jumbotron>
        <div className="container">
          <Row>
            {this.sections.map(function(section, index) {
              return (
                <Col md={4} key={index}>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
