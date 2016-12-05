import React, { Component, PropTypes } from 'react';
import _ from 'lodash';


class RestTimer extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      time: 0
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.exerciseInstance.repsPerSet, this.props.exerciseInstance.repsPerSet);
  }

  tick() {
    this.setState({time: this.state.time + 1});
  }

  start() {
    this.interval = setInterval(this.tick, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.setState({time: ""});
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  render() {
    return (
        <div>{this.state.time}</div>
    );
  }
}

export default RestTimer;

