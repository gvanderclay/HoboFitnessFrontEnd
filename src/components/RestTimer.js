import React, { Component, PropTypes } from 'react';
import _ from 'lodash';


class RestTimer extends Component {
  constructor(props) {
    super(props);
    this.interval = false;
    this.tick = this.tick.bind(this);
    this.state = {
      time: ""
    };
  }

  componentWillUpdate() {
    // sets have been completed
    let yesSet = false;
    // there are sets that haven't been completed
    let noSet = false;
    _.forEach(this.props.exerciseInstance.repsPerSet, (reps) => {
      if(reps === -1) {
        noSet = true;
      }
      else {
        yesSet = true;
      }
    });
    if(((yesSet && !noSet) || (!yesSet && noSet)) && this.interval) {
      this.stop();
    }
    else if(yesSet && noSet && this.interval === false){
      this.start();
    }
  }

  /* shouldComponentUpdate(nextProps, nextState) {
   *   return !_.isEqual(nextProps.exerciseInstance.repsPerSet, this.props.exerciseInstance.repsPerSet);
   * }*/

  tick() {
    const time = this.state.time === "" ? 0 : this.state.time;
    this.setState({time: time + 1});
  }

  start() {
    this.interval = setInterval(this.tick, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = false;
    this.setState({time: ""});
  }

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  pad(num, size) {
    var s = num+"";
    while(s.length < size) s = "0" + s;
    return s;
  }

  render() {
    const minutes = Math.floor(this.state.time / 60);
    const seconds = this.state.time % 60;
    return (
        <div>{minutes + ":" + this.pad(seconds, 2)}</div>
    );
  }
}

export default RestTimer;

