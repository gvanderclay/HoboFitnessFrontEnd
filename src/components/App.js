import React, { Component } from 'react';
import { fetchExercises } from '../actions';
// import logo from '../logo.svg';
import '../styles/App.scss';
import Header from '../containers/HeaderContainer';

class App extends Component {
  constructor(props) {
    super(props);
    fetchExercises();
  }
  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <Header/>
        {children}
      </div>
    );
  }


}
  export default App;
