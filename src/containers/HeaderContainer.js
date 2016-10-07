import React, { Component } from 'react'; 
import Header from '../components/Header';

class HeaderContainer extends Component {
  constructor(){
    super();
    this.menuItems = [
      {title: "Sign Up", link: "#"},
    ]
  }

  render() {
    return <Header menuItems={this.menuItems}/>
  }
}

export default HeaderContainer;