import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export class DataSource extends Component {
  constructor() {
    super()

    this.state = {
      activated: false,
      file: null
    }

    this.toggle = this.toggle.bind(this)
    this.upload = this.upload.bind(this)
    this.uploadChange = this.uploadChange.bind(this)
  }

  toggle() {
    this.setState( { activated: ! this.state.activated } )
  }

  uploadChange( event ) {
    this.setState({file:event.target.files[0]});
  }

  upload(event) {
    event.preventDefault()
    this.props.upload(this.state.file);
  }

  render() {
    return (
      <Modal show={this.state.activated} onHide={this.toggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Data Source Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.upload}>
            <Form.Group>
              <Form.Label>Upload a data source. Accepts CSV and JSON</Form.Label>
              <Form.Control type="file" accept=".csv,.json" onChange={ (event) => {this.uploadChange(event)} } />
            </Form.Group>
            <Button type="submit" variant="primary">Save changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
