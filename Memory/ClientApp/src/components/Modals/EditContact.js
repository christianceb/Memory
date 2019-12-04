import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export class EditContact extends Component {
  constructor(props) {
    super(props)

    this.draft = {
      name: "",
      number: ""
    }

    this.state = {
      activated: false,
      contact: this.draft
    }

    this.toggle = this.toggle.bind(this)
    this.handleTextInput = this.handleTextInput.bind(this)
    this.edit = this.edit.bind(this)
  }

  toggle() {
    this.setState( {
      activated: ! this.state.activated,
      contact: this.props.current
    } )
  }

  edit( event ) {
    event.preventDefault();

    this.props.amend( this.state.contact );
    
    this.setState( {
      contact: this.draft
    } );
  }

  handleTextInput( event ) {
    let name = event.target.name
    let whitelist = [ 'name', 'number' ]
    let contact = this.state.contact

    if ( whitelist.includes( name ) ) {
      contact[name] = event.target.value;
      
      this.setState( {
        contact: contact
      } );
    }
  }

  render() {
    return (
      <Modal show={this.state.activated} onHide={this.toggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.edit}>
            <Form.Group controlId="contactName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name" value={this.state.contact.name} onChange={this.handleTextInput} />
            </Form.Group>

            <Form.Group controlId="contactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" placeholder="Enter contact number" name="number" value={this.state.contact.number} onChange={this.handleTextInput} />
              <Form.Text className="text-muted">
                Optional
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="primary">Save changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
