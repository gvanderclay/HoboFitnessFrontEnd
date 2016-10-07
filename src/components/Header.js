import React, { Component } from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap'
import '../styles/Header.scss'

class Header extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">HoboFitness</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.props.menuItems.map((item, index) => {
              return <NavItem key={index} href={item.link}>{item.title}</NavItem>
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;