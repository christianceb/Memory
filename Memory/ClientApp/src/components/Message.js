import React, { Component } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

export class Message extends Component {
  constructor() {
    super()

    this.renderTooltip = this.renderTooltip.bind(this)
  }

  renderTooltip = (props) => {
    return <Tooltip {...props}>{this.props.message.datetime.toString()}</Tooltip>
  }

  render() {
    // let active = contact.id == this.props.current
    let classes = "d-inline-block mb-2"
    let bg = "primary"
    let align = "text-right"
    let position = "left"

    if ( this.props.message.sent === false ) {
      classes += " mr-auto"
      bg = "secondary"
      align = undefined
      position = "right"
    } else {
      classes += " ml-auto text-right"
    }

    return (
      <div className={align}>
        <OverlayTrigger placement={position} delay={{ show: 250, hide: 400 }} overlay={this.renderTooltip}>
          <Card bg={bg} text="white" className={classes}>
            <Card.Body className="p-2">
              <Card.Text>
                {this.props.message.body}
              </Card.Text>
            </Card.Body>
          </Card>
        </OverlayTrigger>
      </div>
    )
  }
}
