import React, { Component } from 'react'; 
import Header from './Header';

class HeaderContainer extends Component {
  constructor(){
    super();
    this.menuItems = {
      "Sign Up": "#"
    }
  }
  render() {
    return <Header menuItems={this.menuItems}/>
  }
}

export default HeaderContainer;