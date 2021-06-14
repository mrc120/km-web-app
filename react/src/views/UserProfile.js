import React, { useState } from "react";
import KsiazkaDataService from "../services/KsiazkaService";
import NotificationAlert from "react-notification-alert";
import {
  Alert,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";


const UserProfile = () => {
  const initialTutorialState = {
    id: null,
    nazwa: "",
    stanowisko: "",
    adres_email: "",
    numer_tel: "",
    numer_stacj: "",
    symbol_dzialu: "",
    nazwa_dzialu: "",
    numer_pokoju: "",
    published: false
  };

  const [ksiazka, setEmployee] = useState(initialTutorialState);
  const notificationAlertRef = React.useRef(null);

  const notify = () => {
    var options = {};
    options = {
      type: 'info',
      place: 'tc',
      message: (
        <div>
          <div>
            <b>Dodano pomyślnie nowego pracownika!</b>
        </div>
        </div>
      ),
      icon: "nc-icon nc-bell-55",
      autoDismiss: 55,
    };
    notificationAlertRef.current.notificationAlert(options);
  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployee({ ...ksiazka, [name]: value });
  };

  const saveEmployee = () => {
    var data = {
      nazwa: ksiazka.nazwa,
      stanowisko: ksiazka.stanowisko,
      adres_email: ksiazka.adres_email,
      numer_tel: ksiazka.numer_tel,
      numer_stacj: ksiazka.numer_stacj,
      symbol_dzialu: ksiazka.symbol_dzialu,
      numer_pokoju: ksiazka.numer_pokoju,
      nazwa_dzialu: ksiazka.nazwa_dzialu
    };

    KsiazkaDataService.create(data)
      .then(response => {
        setEmployee({
          id: response.data.id,
          nazwa: response.data.nazwa,
          stanowisko: response.data.stanowisko,
          adres_email: response.data.adres_email,
          numer_tel: response.data.numer_tel,
          numer_stacj: response.data.numer_stacj,
          nazwa_dzialu: response.data.nazwa_dzialu,
          symbol_dzialu: response.data.symbol_dzialu,
          numer_pokoju: response.data.numer_pokoju

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="mainpanel">
          <NotificationAlert ref={notificationAlertRef} />
        <Container fluid>
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Dodaj nowego pracownika</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Nazwa</label>
                          <Form.Control
                            type="text"
                            id="nazwa"
                            placeholder="Nazwa lub imię i nazwisko"
                            value={ksiazka.nazwa}
                            onChange={handleInputChange}
                            name="nazwa"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">
                            Adres e-mail
                        </label>
                          <Form.Control
                            placeholder="Adres E-mail"
                            type="email"
                            id="adres_email"
                            value={ksiazka.adres_email}
                            onChange={handleInputChange}
                            name="adres_email"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Numer telefonu komórkowego</label>
                          <Form.Control
                            id="numer_stacj"
                            value={ksiazka.numer_stacj}
                            onChange={handleInputChange}
                            name="numer_stacj"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>Numer telefonu stacjonarnego</label>
                          <Form.Control
                            id="numer_tel"
                            value={ksiazka.numer_tel}
                            onChange={handleInputChange}
                            name="numer_tel"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Nazwa działu</label>
                          <Form.Control
                            type="text"
                            placeholder="np. Dział IT"
                            id="nazwa_dzialu"
                            value={ksiazka.nazwa_dzialu}
                            onChange={handleInputChange}
                            name="nazwa_dzialu"
                          ></Form.Control>
          
                       
                          <label>Stanowisko</label>
                          <Form.Control
                            type="text"
                            id="stanowisko"
                            value={ksiazka.stanowisko}
                            onChange={handleInputChange}
                            name="stanowisko"
                          ></Form.Control>
                                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Symbol działu</label>
                          <Form.Control
                            type="text"
                            id="symbol_dzialu"
                            value={ksiazka.symbol_dzialu}
                            onChange={handleInputChange}
                            name="symbol_dzialu"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pr-12" md="6">
                        <Form.Group>
                          <label>Numer pokoju</label>
                          <Form.Control
                            type="text"
                            id="numer_pokoju"
                            value={ksiazka.numer_pokoju}
                            onChange={handleInputChange}
                            name="numer_pokoju"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      onClick={() => {
                      notify();
                      saveEmployee();}}
                      className="btn-fill btn-padding"
                      variant="info"
                      >
                      Dodaj
                  </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserProfile;
