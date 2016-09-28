import React, { Component } from 'react';
import './Header.css'
import { Nav, Navbar, NavItem} from 'react-bootstrap'

class Header extends Component {
  constructor(props) {
    super(props);
    this.menuItems = props.menuItems;
  } 
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">HoboFitness</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {Object.keys(this.menuItems).map((key, index) => {
              return <NavItem eventKey={index} href={this.menuItems[key]}>{key}</NavItem>
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;