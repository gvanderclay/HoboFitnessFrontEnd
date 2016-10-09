import React, { Component, PropTypes } from 'react';
// import logo from '../logo.svg';
import '../styles/App.scss';
import Header from '../containers/HeaderContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
}

export default App;
