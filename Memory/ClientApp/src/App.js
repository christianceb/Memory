import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { Contacts } from './components/Contacts';
import { NewMessage } from './components/NewMessage';
import { Conversation } from './components/Conversation';
import { ContactBar } from './components/ContactBar';
import { ContactsBar } from './components/ContactsBar';
import Help from './components/Help';

import { CommonModal as CommonModal } from './components/Modals/CommonModal';
import { DataSource as DataSourceModal } from './components/Modals/DataSource';
import { NewContact as NewContactModal } from './components/Modals/NewContact';
import { EditContact as EditContactModal } from './components/Modals/EditContact';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: null,
      contacts: [],
      modal: {
        title: null,
        content:null
      }
    }

    this.dataSourceModal = React.createRef()
    this.newContactModal = React.createRef()
    this.editContactModal = React.createRef()
    this.commonModal = React.createRef()

    // Bind this to functions because for some reason this is still "ES6" >:(
    this.toggleDataSourceModal = this.toggleDataSourceModal.bind(this)
    this.toggleNewContact = this.toggleNewContact.bind(this)
    
    this.uploadSource = this.uploadSource.bind(this)
    this.processCSVSource = this.processCSVSource.bind(this)
    this.addContact = this.addContact.bind(this)
    this.editContact = this.editContact.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.setCurrent = this.setCurrent.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.closeConversation = this.closeConversation.bind(this)
    this.findId = this.findId.bind(this)
    this.saveDataSource = this.saveDataSource.bind(this)
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  uploadSource = async ( file ) => {
    if ( file.type === "application/json" ) {
      try {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
  
        reader.onload = ( event ) => {
          this.setState( {
            contacts: JSON.parse( event.target.result )
          } );
        }
      }
      catch ( exception ) {
        this.setState({
          modal: {
            title: "Error",
            content: "Error processing JSON. Will continue with no data source."
          }
        })
        this.toggleCommonModal()
      }
    }
    else {
      const data = new FormData();
      data.append("file", file)
  
      
      try {
        let response = await fetch(
          'api/Memory',
          {
            method: "POST",
            body: data
          }
        )
        
        let json = await response.json();
        
        this.processCSVSource(json)
      } catch ( exception ) {
        this.setState({
          modal: {
            title: "Error",
            content: "Error processing CSV. Will continue with no data source."
          }
        })
        this.toggleCommonModal()
      }
  
    }

    this.toggleDataSourceModal()
  }

  processCSVSource( array ) {
    array.forEach(contact => {
      let messages = [];
      contact.messages.forEach(message => {
        messages.push( {
          id: message.id,
          sent: message.sent,
          body: message.content,
          datetime: new Date( message.dateTime )
        } );
      });
      this.addContact( {
        name: contact.name,
        number: contact.number,
        conversation: [ ...messages ],
        lastMessage: new Date( contact.lastMessage )
      } )
    });
  }

  setCurrent = ( contact ) => {
    this.setState( {
      current: contact
    } );
  }

  addContact = ( contact ) => {
    let contacts = this.state.contacts;

    if ( typeof contact.id === "undefined" ) {
      contact.id = this.findId()
    }

    if ( typeof contact.conversation === "undefined" ) {
      contact.conversation = []
    }

    if ( typeof contact.lastMessage === "undefined" ) {
      contact.lastMessage = new Date()
    }

    contacts.push( contact )

    this.setState( { contacts: [ ...contacts ] } )
  }

  addMessage = ( message ) => {
    let current = this.state.current
    current.conversation.push( message )

    current.lastMessage = message.datetime;

    this.editContact( current );
  }

  editContact = ( contact ) => {
    let index = this.state.contacts.findIndex( (c) => c.id === contact.id )

    // Insert "oh f-yeah spread it" meme
    let mergedContacts = [
      ...this.state.contacts.slice(0, index),
      ...contact,
      ...this.state.contacts.slice(index++)
    ];

    // Reasonable to re-sort when editing contacts
    mergedContacts.sort( ( a, b ) => b.lastMessage.getTime() - a.lastMessage.getTime() );

    this.setState( {
      contacts: mergedContacts
    } );
  }

  deleteContact = ( contact ) => {
    let newContacts = this.state.contacts

    newContacts.splice(
      newContacts.findIndex( (c) => c.id === contact.id ), 1 
    );

    this.setState( {
      current: null,
      contacts: [ ...newContacts ]
    } );
  }

  closeConversation = () => {
    this.setCurrent( null )
  }

  findId = () => {
    let id = 0

    if ( this.state.contacts.length > 0 ) {
      id = Math.max.apply( Math, this.state.contacts.map( function( c ) { return c.id } )) + 1
    }

    return id
  }

  iHateMyEyesMode = () => {
    let millionsOfPeopleSufferFromEyeCancerAndYetHereYouAre = "myEyesStareIntoTheSun"
    let root = document.getElementById('root');
    
    if ( root.classList.contains(millionsOfPeopleSufferFromEyeCancerAndYetHereYouAre) ) {
      root.classList.remove(millionsOfPeopleSufferFromEyeCancerAndYetHereYouAre)
    } else {
      root.classList.add(millionsOfPeopleSufferFromEyeCancerAndYetHereYouAre)
    }
  }

  saveDataSource = () => {
    if (this.state.contacts.length > 0) {
      let a = document.createElement("a");
      a.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.contacts)));
      a.setAttribute("download", "memory.json");
      a.click();
    }
  }

  componentDidMount() {
    // this.addContact( {
    //   name: "Chris",
    //   number: "+63 917 798 3325",
    //   conversation: [ { sent: false, body: "thug" }, { sent: true, body: "luv" } ]
    // } )

    // this.addContact( {
    //   name: "Chris Australia",
    //   number: "+61 434 628 357",
    //   conversation: [
    //     { sent: false, body: "definition" },
    //     { sent: true, body: "of" },
    //     { sent: false, body: "a" },
    //     { sent: true, body: "thug" },
    //     { sent: false, body: "nigga" },
    //     { sent: true, body: "rake" },
    //     { sent: false, body: "in" },
    //     { sent: true, body: "the" },
    //     { sent: false, body: "lake" },
    //   ]
    // } )

    // Always run data source modal
    this.toggleDataSourceModal()
  }

  // Invert state of modal(s)
  toggleDataSourceModal = () => this.dataSourceModal.current.toggle();
  toggleNewContact = () => this.newContactModal.current.toggle();
  toggleEditContact = () => this.editContactModal.current.toggle();
  toggleCommonModal = () => this.commonModal.current.toggle();

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} lg={3} className={ this.state.current === null ? "max-height contacts" : "max-height contacts d-none d-lg-flex" }>
              <ContactsBar toggleNewContact={this.toggleNewContact} iHateMyEyesMode={this.iHateMyEyesMode} toggleDataSourceModal={this.toggleDataSourceModal} saveDataSource={this.saveDataSource} />
              <Contacts list={this.state.contacts} current={this.state.current} setCurrent={this.setCurrent} />
              <Help />
            </Col>
            <Col xs={12} lg={9} className={ this.state.current !== null ? "max-height chatbox" : "max-height d-none d-lg-flex chatbox" }>
              <ContactBar current={this.state.current} edit={this.toggleEditContact} delete={this.deleteContact} close={this.closeConversation} />
              <Conversation current={this.state.current} />
              <NewMessage active={this.state.current} add={this.addMessage} />
            </Col>
          </Row>
        </Container>
        <DataSourceModal ref={this.dataSourceModal} upload={this.uploadSource}/>
        <NewContactModal ref={this.newContactModal} add={this.addContact} />
        <EditContactModal ref={this.editContactModal} current={this.state.current} amend={this.editContact} />
        <CommonModal ref={this.commonModal} title={this.state.modal.title} content={this.state.modal.content} />
      </React.Fragment>
    )
  }
}
