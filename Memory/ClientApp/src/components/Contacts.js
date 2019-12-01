import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

export class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }

  render() {
    return (
      <ListGroup>
        <ListGroup.Item action href="#link1">Link 1</ListGroup.Item>
        <ListGroup.Item action href="#link2">Link 2</ListGroup.Item>
      </ListGroup>
    );
  }
}
