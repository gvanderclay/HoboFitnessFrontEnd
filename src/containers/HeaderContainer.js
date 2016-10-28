import React, { Component } from 'react'; 
import Header from '../components/Header';

class HeaderContainer extends Component {
  constructor(){
    super();
    this.menuItems = [
      {title: "Sign Up", link: "#"},
    ]
    this.dropDownItems = [
      { title: "Workouts", route: "/workouts" },
      { title: "Exercises", route: "/exercises" },
    ]
  }

  render() {
    return <Header menuItems={this.menuItems} dropDownItems={this.dropDownItems}/>
  }
}

export default HeaderContainer;
