import React from 'react';
import { withRouter } from 'react-router';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import '../styles/Header.scss'

const Header = ({ menuItems, dropDownItems, router }) => (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={() => router.push('/')}>HoboFitness</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown title="Entities" id="entities">
              { dropDownItems.map((item, index) => {
                  return <MenuItem
                             key={index}
                             onClick={() => router.push(item.route)}
                         >
                          {item.title}
                        </MenuItem>
              })}
            </NavDropdown>
            {menuItems.map((item, index) => {
              return <NavItem key={index} href={item.link}>{item.title}</NavItem>
             })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

export default withRouter(Header);
