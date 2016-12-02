import React, { Component, PropTypes } from 'react';


class RestTimer extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      time: 0
    };
  }

  tick() {
    this.setState({time: this.state.time + 1});
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <div>{this.state.time}</div>
    );
  }
}

export default RestTimer;

