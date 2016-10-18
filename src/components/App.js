import React, { Component } from 'react';
import '../styles/App.scss';
import Header from '../containers/HeaderContainer';

class App extends Component {
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
