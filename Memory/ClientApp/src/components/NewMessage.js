import React, { Component } from 'react';
import { Form, FormControl, InputGroup, Dropdown, Button, ButtonGroup } from 'react-bootstrap';

export class NewMessage extends Component {
  constructor() {
    super()

    this.draft = {
      body: "",
      sent: null,
      datetime: null
    }

    this.state = {
      saveAsYou: true,
      message: {...this.draft},
    }

    this.handleTextInput = this.handleTextInput.bind(this)
    this.add = this.add.bind(this)
    this.saveAsYou = this.saveAsYou.bind(this)
  }

  handleTextInput( event ) {
    this.state.message.body = event.target.value
    this.state.message.sent = this.state.saveAsYou ? true : false
    this.state.message.datetime = new Date()

    this.setState( {
      message: this.state.message
    } );
  }

  add() {
    let message = this.state.message
    message.datetime = new Date()

    this.props.add( message )

    // Clear textarea
    this.setState({
      message: {...this.draft}
    });
  }

  saveAsYou( you ) {
    // Toggle save (send) origin
    this.setState( {
      saveAsYou: you
    } );
  }

  render() {
    let saveLabel = this.state.saveAsYou ? "Send" : "Send as Contact"
    let variant = this.state.saveAsYou ? "primary" : "secondary"
    let active = false;

    if ( this.props.active !== null) {
      active = true;
    }

    return (
      <Form className="new-message" onSubmit={this.props.add}>
        <Form.Group className="mb-1">
          <InputGroup.Append>
            <FormControl as="textarea" aria-label="With textarea" className="mr-1" value={this.state.message.body} onChange={this.handleTextInput} disabled={!active}/>

            <Dropdown alignRight as={ButtonGroup}>
              <Button variant={variant} disabled={!active} onClick={this.add}>{saveLabel}</Button>

              <Dropdown.Toggle split variant={variant} />

              <Dropdown.Menu>
                <Dropdown.Item onClick={(event)=> {this.saveAsYou(true)}}>Send</Dropdown.Item>
                <Dropdown.Item onClick={(event)=> {this.saveAsYou(false)}}>Send as Contact</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup.Append>
        </Form.Group>
      </Form>
    )
  }
}
