
import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Button, Modal, Form, Row, Col, } from "react-bootstrap";
import routes from "routes.js";


function Header() {
  const [showModal, setShowModal] = React.useState(false);
  const location = useLocation();

  //odpala hamburgera na ekranach mobilnych
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  //pobiera tekst wyswietlany w rogu routesa
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Okno";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2">
            {getBrandText()}
          </Navbar.Brand>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>

            {/* { <Nav.Item>
              <Nav.Link
                className="MTableToolbar"
                href="#pablo"
                onClick={(e) => e.preventDefault()}>
                <i className="nc-icon nc-zoom-split"></i>
                <span className="d-lg-block">Szukajka</span>
              </Nav.Link>
            </Nav.Item> } */}
          </Nav>

          <Nav navbar>
            <Nav.Item>
              <Button
                className="btn-wd-l"
                href="#login"
                variant="info"
                onClick={() => setShowModal(true)}>
                <span className="no-icon">Logowanie</span>
              </Button>

            </Nav.Item>
      
           
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* Mini Modal */}
      <Modal
        className="modal-mini modal-primary"
        show={showModal}
        onHide={() => setShowModal(false)}>

        <Modal.Header className="justify-content-center">
          <img src={require("assets/img/logokmclear.png").default}
            alt="..." width="62px" height="38px" />
          <h3 className="modal-title">Zaloguj się</h3>
          {/* <div className="modal-profile">
            <i className="nc-icon nc-bulb-63"></i>
          </div>
        */}
        </Modal.Header>
        <Modal.Body>
          <div className="justify-content-center autocenter">
         
            <Form.Group class="marbot">
              <label>Login:</label>
              <Form.Control
                type="email"
                id="imie"
                placeholder="Adres e-mail"
                name="mail"
              ></Form.Control>
            </Form.Group>
            <Form.Group class="marbot">
              <label>Hasło:</label>
              <Form.Control
                placeholder="********"
                type="password"
              ></Form.Control>
            </Form.Group>
         
          </div>
        </Modal.Body>
   
        <Button block onClick={() => notify("tc")}
          className="btn-fill btn-wd-2"
          variant="info" >
          Zaloguj
          </Button>
        <Button
          className="btn-simple"
          type="button"
          variant="link"
          onClick={() => setShowModal(false)}>
          Zamknij
            </Button>
      </Modal>
    </Navbar>
  );
}

export default Header;
