import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

export class ContactBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="md" className="conversation-title">
        <Navbar.Brand className="mr-auto">{ this.props.current !== null ? [this.props.current.name, " ", <em>({this.props.current.number !== "" ? this.props.current.number : "no number provided" })</em>] : "-" }</Navbar.Brand>
        {
          this.props.current !== null ?
            
            <React.Fragment>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  <Button variant="danger" size="sm" className="mb-1 mr-md-1 mb-md-0" onClick={ () => this.props.delete(this.props.current) }>Delete</Button>
                  <Button variant="outline-info" size="sm" className=" mb-1 mr-md-1 mb-md-0" onClick={ () => this.props.edit(this.props.current ) }>Edit</Button>
                  <Button variant="warning" size="sm" onClick={ () => this.props.close() }>Close</Button>
                </Nav>
              </Navbar.Collapse>
              
            </React.Fragment> : null 
        }
      </Navbar>
    )
  }
} 
