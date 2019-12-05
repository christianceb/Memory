import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class CommonModal extends Component {
  constructor() {
    super()

    this.state = {
      activated: false,
      file: null
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState( { activated: ! this.state.activated } )
  }

  render() {
    return (
      <Modal show={this.state.activated} onHide={this.toggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggle}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
