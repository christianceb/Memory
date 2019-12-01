import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export class DataSourceModal extends Component {
  constructor() {
    super()

    this.state = { activated: false }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState( { activated: ! this.state.activated } )
  }

  render() {
    return (
      <Modal show={this.state.activated} onHide={this.toggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Data Source Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Upload a data source</div>
        </Modal.Body>
      </Modal>
    );
  }
}
