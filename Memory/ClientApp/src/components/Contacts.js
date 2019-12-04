import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

export class Contacts extends Component {
  render() {
    const contacts = this.props.list.map( contact => {
      let active = false;

      if ( this.props.current !== null ) {
        active = contact.id === this.props.current.id
      }

      return (
        <ListGroup.Item
          variant="secondary"
          key={contact.id}
          active={active}
          onClick={() => this.props.setCurrent(contact)}
          action>
          {contact.name}
        </ListGroup.Item>
      )
    } );

    return (
      <ListGroup className="mb-1">{contacts}</ListGroup>
    );
  }
} 
