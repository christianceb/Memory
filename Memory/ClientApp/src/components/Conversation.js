import React, { Component } from 'react';
import { Message } from './Message';

export class Conversation extends Component {
  constructor( props ) {
    super( props )

    this.conversationBottom = React.createRef();

    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.conversationBottom.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    let messages = null

    if ( this.props.current !== null ) {
      
      messages = this.props.current.conversation.map( message => {
        return <Message key={message.id} message={message} />
      } );
    }

    return (
      <div className="conversation my-1 px-2 py-2">
        {messages}
        <div ref={(element) => { this.conversationBottom = element }}></div>
      </div>
    );
  }
}
