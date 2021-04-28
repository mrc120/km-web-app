import React, { useState } from "react";
import TutorialDataService from "../services/KsiazkaService";
import { Alert } from 'reactstrap';
import {
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
    imie: "",
    adres_email: "",
    numer_tel: "",
    nazwa_dzialu: "",
    numer_pokoju: "",
    published: false
  };

  const [ksiazka, setEmployee] = useState(initialTutorialState);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployee({ ...ksiazka, [name]: value });
  };

  const saveEmployee = () => {
    var data = {
      imie: ksiazka.imie,
      adres_email: ksiazka.adres_email,
      numer_tel: ksiazka.numer_tel,
      numer_stacj: ksiazka.numer_stacj,
      numer_pokoju: ksiazka.numer_pokoju,
      nazwa_dzialu: ksiazka.nazwa_dzialu
    };

    TutorialDataService.create(data)
      .then(response => {
        setEmployee({
          id: response.data.id,
          imie: response.data.imie,
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
    <div class="mainpanel">
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
                          id="imie"
                          placeholder="Nazwa lub imię i nazwisko"
                          value={ksiazka.imie}
                          onChange={handleInputChange}
                          name="imie"
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
                          id="email"
                          required
                          value={ksiazka.email}
                          onChange={handleInputChange}
                          name="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Numer telefonu komórkowego</label>
                        <Form.Control
              
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Numer telefonu stacjonarnego</label>
                        <Form.Control
  
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
                          required
                          value={ksiazka.nazwa_dzialu}
                          onChange={handleInputChange}
                          name="nazwa_dzialu"
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
                          required
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
                          required
                          value={ksiazka.numer_pokoju}
                          onChange={handleInputChange}
                          name="numer_pokoju"
                        ></Form.Control>
                      </Form.Group>
                    </Col>              
                  </Row>
                  
                  <Button block onClick={() => notify("tc")}
                    className="btn-fill btn-padding"
                    variant="info"
                    onClick={saveEmployee}
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
