import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
//import { Route } from 'react-router';
//import { Layout } from './components/Layout';
//import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm={3}>
            Contacts Column
          </Col>
          <Col sm={9}>
            Conversation Column
          </Col>
        </Row>
      </Container>
      //<Layout>
      //  <Route exact path='/' component={Home} />
      //  <Route path='/counter' component={Counter} />
      //  <Route path='/fetchdata' component={FetchData} />
      //</Layout>
    );
  }
}
