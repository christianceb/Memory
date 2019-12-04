import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class ContactsBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" className="mb-1">
        <Navbar.Brand className="mr-auto">Contacts</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="Menu" alignRight>
              <NavDropdown.Item onClick={this.props.toggleNewContact}>New Contact</NavDropdown.Item>
              <NavDropdown.Item onClick={this.props.iHateMyEyesMode}>Toggle Night Light</NavDropdown.Item>
              <NavDropdown.Item onClick={this.props.toggleDataSourceModal}>Load Data Source</NavDropdown.Item>
              <NavDropdown.Item onClick={this.props.saveDataSource}>Save Current Data Source</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
} 
