import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import 'react-dropdown/style.css';

import EmployeeService from "../../services/ksiazka.service";
import Message from '../../utils/Message';
import useFetch from "../../hooks/useFetch.js"

const User = {
  id: null,
  nazwa: "",
  adres_email: "",
  numer_tel: "",
  numer_stacj: "",
  symbol_dzialu: "",
  numer_pokoju: "",
  stanowiskoIdStan: null,
  dzialIdDzialu: null,
};

const AddUser = () => {
  const [employee, setEmployee] = useState(User);
  const [message, setMessage] = useState('');
  const [validated, setValidated] = useState(false);

  const loadDepartures = () => {
    const { data: getDep, loading: loadingDep, error: errorDep } = useFetch("http://localhost:8080/api/dzial")
    return (
      <Form.Group className="Row-fix">
        <Form.Label>Nazwa działu</Form.Label>
        <Form.Control as="select" type="select"
          value={employee.dzialIdDzialu}
          onChange={handleInputChange}
          className="Dropdown-c"
          name="dzialIdDzialu"
          id="dzialIdDzialu"
          variant="primary">
          {getDep.map(({ id_dzialu, nazwa_dzialu }) =>
            <option key={id_dzialu} value={id_dzialu}>{nazwa_dzialu}</option>
          )}
        </Form.Control>
      </Form.Group>
    )
  }

  const loadStanowisko = () => {
    const { data: getStan, loading: loadingStan, error: errorStan } = useFetch("http://localhost:8080/api/stanowisko")
    return (
      <Form.Group className="Row-fix">
        <Form.Label>Nazwa stanowiska</Form.Label>
        <Form.Control as="select" type="select"
          className="Dropdown-c"
          value={employee.stanowiskoIdStan}
          onChange={handleInputChange}
          name="stanowiskoIdStan"
          id="stanowiskoIdStan"
          variant="primary">
          {getStan.map(({ id_stan, nazwa_stan }) =>
            <option key={id_stan} value={id_stan}>{nazwa_stan}</option>)}
        </Form.Control>
      </Form.Group>
    )
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === false) {
      setMessage('Błąd! Nie uzupełniono formularza');
      setTimeout(() => {
        setMessage("");
      }, 7000);
    } else {
      setMessage("Dodano pomyślnie pracownika!")
      var data = {
        nazwa: employee.nazwa,
        stanowisko: employee.stanowisko,
        adres_email: employee.adres_email,
        numer_tel: employee.numer_tel,
        numer_stacj: employee.numer_stacj,
        symbol_dzialu: employee.symbol_dzialu,
        numer_pokoju: employee.numer_pokoju,
        nazwa_dzialu: employee.nazwa_dzialu,
        dzialIdDzialu: employee.dzialIdDzialu,
        stanowiskoIdStan: employee.stanowiskoIdStan
      };

      EmployeeService.create(data)
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
            numer_pokoju: response.data.numer_pokoju,
            dzialIdDzialu: response.data.dzialIdDzialu,
            stanowiskoIdStan: response.data.stanowiskoIdStan
          });
        }).catch(e => {
          console.log(e);
        });
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <>
      <div className="mainpanel ">
        <div className="ml-1 row p-2 w-100 border bg-white align-items-center  d-flex justify-content-center">
          <div className="mt-3">

            {message ? <Message msg={message} /> : null}

            <h3 className="ml-4">Dodaj nowy kontakt:</h3>
            <Form validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col className="pr-2" md="6">
                  <Form.Group className="Row-fix">
                    <Form.Label>Nazwa:</Form.Label>
                    <Form.Control
                      required
                      className="form"
                      type="text"
                      id="nazwa"
                      placeholder="Imię i nazwisko pracownika"
                      value={employee.nazwa}
                      onChange={handleInputChange}
                      name="nazwa" />
                    <Form.Control.Feedback type="invalid">
                      Wprowadź imię i nazwisko pracownika
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="6">
                  <Form.Group className="Row-fix">
                    <Form.Label>Adres e-mail</Form.Label>
                    <Form.Control
                      placeholder="Adres E-mail"
                      type="text"
                      id="adres_email"
                      value={employee.adres_email}
                      onChange={handleInputChange}
                      name="adres_email" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  <Form.Group className="Row-fix">
                    <Form.Label>Numer telefonu stacjonarnego:</Form.Label>
                    <Form.Control
                      placeholder="Przykład. xxx xxx xxx"
                      id="numer_stacj"
                      onChange={handleInputChange}
                      value={employee.numer_stacj}
                      name="numer_stacj"
                      type="string" />
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="6">
                  <Form.Group className="Row-fix">
                    <Form.Label>Numer telefonu komórkowego:</Form.Label>
                    <Form.Control
                      placeholder="Przykład. xxx-xx-xx"
                      id="numer_tel"
                      value={employee.numer_tel}
                      onChange={handleInputChange}
                      name="numer_tel"
                      type="text" />

                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  {loadDepartures()}
                </Col>
                <Col className="pr-1 mr-4 flex-sm-row" md="4">
                  <Form.Group className="Row-fix">
                    <Form.Label>Numer pokoju:</Form.Label>
                    <Form.Control
                      placeholder="Przykład. 210"
                      id="numer_pokoju"
                      value={employee.numer_pokoju}
                      onChange={handleInputChange}
                      name="numer_pokoju"
                      type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  {loadStanowisko()}
                </Col>
              </Row>
              <Button
                type='submit'
                className="btn-fill btn-padding btn-fix mb-3"
                variant="info">
                Dodaj
              </Button>
              <div className="clearfix"></div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUser;
