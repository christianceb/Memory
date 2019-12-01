import React, { Component } from 'react';
//import { Col, Container, Row, InputGroup, Dropdown, Button, ButtonGroup, Navbar, FormControl } from 'react-bootstrap';
import { Container, Row, Col, Tab, Navbar, ListGroup, Button, Modal, Form, FormControl } from 'react-bootstrap';
import { Contacts } from './components/Contacts';
import { DataSourceModal } from './components/Modals/DataSource';
import { NewContact } from './components/Modals/NewContact';
//import { Route } from 'react-router';
//import { Layout } from './components/Layout';
//import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

export default class App extends Component {
  // displayName = App.name

  constructor(props) {
    super(props)

    this.state = {
      contacts: []
    }

    this.dataSourceModal = React.createRef()
    this.newContactModal = React.createRef()

    // Bind this to functions because for some reason this is still "ES6" >:(
    this.toggleDataSourceModal = this.toggleDataSourceModal.bind(this)
    this.toggleNewContact = this.toggleNewContact.bind(this)
  }

  componentDidMount() {
    // Always run data source modal
    this.toggleDataSourceModal()
  }

  // Invert state of modal
  toggleDataSourceModal = () => this.dataSourceModal.current.toggle();
  toggleNewContact = () => this.newContactModal.current.toggle();

  render() {
    return (
      <React.Fragment>
        <Container fluid>
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm={3} className="max-height">
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand className="mr-auto">Contacts</Navbar.Brand>
                  <Form inline>
                    <Button variant="outline-info" onClick={this.toggleNewContact}>+</Button>
                    {/* <FormControl type="file" className="mr-sm-2" /> */}
                  </Form>
                </Navbar>
                <Button variant="primary" onClick={this.toggleDataSourceModal}>launch demo modal</Button>
                <Contacts />
              </Col>
              <Col sm={9} className="max-height">
                <Tab.Content>
                  <Tab.Pane eventKey="#link1">
                    werg
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link2">
                    grew
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
        <DataSourceModal ref={this.dataSourceModal} />
        <NewContact ref={this.newContactModal} />
      </React.Fragment>
    )
  }
}
