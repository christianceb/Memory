import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export class NewContact extends Component {
  constructor() {
    super()

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
    this.saveUser = this.saveUser.bind(this)
  }

  toggle() {
    this.setState({ activated: !this.state.activated })
  }

  saveUser( event ) {
    event.preventDefault();

    this.setState( {
      contact: this.draft
    } );

    console.log(this.state);
  }

  handleTextInput( event ) {
    switch ( event.target.name ) {
      case "name" :
        this.draft.name = event.target.name;
        break;
      case "number" :
        this.draft.number = event.target.number;
        break;
    }
  }

  render() {
    return (
      <Modal show={this.state.activated} onHide={this.toggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.saveUser}>
            <Form.Group controlId="contactName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name" onChange={this.handleTextInput} />
            </Form.Group>

            <Form.Group controlId="contactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" placeholder="Enter contact number" name="number" onChange={this.handleTextInput} />
              <Form.Text className="text-muted">
                Optional
              </Form.Text>
            </Form.Group>

            <Button type="submit" variant="secondary">Close</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
