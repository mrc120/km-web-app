import React from "react";
import logo from 'assets/img/logo.png';
import 'assets/css/mainpanel.css';

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Legend() {
  return (
    <>
    <div class="mainpanel">
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header div class="card-header-helpdesk">
                <div style={{ display: "flex",
              justifyContent: "center", 
            }}>
                <a href = "http://111.111.111.144:8081/#/helpdesk"><img src={logo} width="340" height="117" /></a>
                </div>
                  <h2 color>
                  <center><a href = "http://111.111.111.144:8081/#/helpdesk">Kliknij by przejść do systemu HelpDesk</a></center>
                  </h2>
        
              </Card.Header>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
}

export default Legend;
