import React from 'react';
import { withRouter, Link } from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import '../styles/Header.scss'

const Header = ({ menuItems, dropDownItems, router }) => (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>HoboFitness</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {dropDownItems.map((item, index) => {
              return <NavItem
                            key={index}
                            onClick={() => router.push(item.route)}
                        >
                        {item.title}
                    </NavItem>
            })}
            {menuItems.map((item, index) => {
              return <NavItem key={index} href={item.link}>{item.title}</NavItem>
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

export default withRouter(Header);
